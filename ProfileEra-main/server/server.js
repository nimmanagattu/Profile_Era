const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Lead = require('./models/Lead');
const helmet = require('helmet');
const nodemailer = require('nodemailer');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// Security Middleware
app.use(helmet());
app.set('trust proxy', 1); // Trust first proxy (needed for Vercel/Railway)

// CORS Configuration
const allowedOrigins = [
    'http://localhost:5173', // Vite default
    'http://localhost:3000',
    'https://profileera.com',
    'https://www.profileera.com'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// 1. Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/profileera';
mongoose.connect(MONGO_URI)
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => {
        console.error("MongoDB Connection Error:", err.message);
        if (process.env.NODE_ENV === 'production') {
            process.exit(1); // Kill process in production if DB fails
        }
    });

// 2. Middleware & Admin Routes
const checkAdminAuth = (req, res, next) => {
    const apiKey = req.headers['x-admin-api-key'];
    const validApiKey = process.env.ADMIN_API_KEY;

    if (!validApiKey) {
        return res.status(500).json({ error: "Server misconfiguration: ADMIN_API_KEY not set" });
    }

    if (apiKey && apiKey === validApiKey) {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized: Invalid API Key" });
    }
};

// Admin Routes (Read-Only)
app.get('/api/admin/leads', checkAdminAuth, async (req, res) => {
    try {
        const leads = await Lead.find().sort({ date: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: "Error fetching leads" });
    }
});

app.get('/api/admin/leads/:id', checkAdminAuth, async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ error: "Lead not found" });
        }
        res.json(lead);
    } catch (error) {
        res.status(500).json({ error: "Error fetching lead details" });
    }
});

// 3. API Routes
app.post('/api/contact', upload.single('resume'), async (req, res) => {
    try {
        const { name, contact, linkedin, naukri } = req.body;
        const newLead = new Lead({
            name,
            contact,
            linkedin,
            naukri,
            resume: req.file ? req.file.path : null
        });
        await newLead.save();

        // Send Email Notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Lead: ${name}`,
            text: `You have a new lead!\n\nName: ${name}\nContact: ${contact}\nLinkedIn: ${linkedin}\nNaukri: ${naukri}\nResume: ${req.file ? 'Attached' : 'Not provided'}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        res.status(201).json({ message: "Lead saved successfully" });
    } catch (error) {
        console.error("Error saving lead:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/', (req, res) => {
    res.send('ProfileEra Backend is Running');
});

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
