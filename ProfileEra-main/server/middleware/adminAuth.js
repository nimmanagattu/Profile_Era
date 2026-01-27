const adminAuth = (req, res, next) => {
    const apiKey = req.headers['x-admin-api-key'];
    const validApiKey = process.env.ADMIN_API_KEY;

    console.log('DEBUG: Received API Key:', apiKey);
    console.log('DEBUG: Valid API Key in Env:', validApiKey);

    if (!validApiKey) {
        return res.status(500).json({ error: "Server misconfiguration: ADMIN_API_KEY not set" });
    }

    if (apiKey && apiKey === validApiKey) {
        next();
    } else {
        console.log('DEBUG: Auth Failed: Mismatch');
        res.status(401).json({ error: "Unauthorized: Invalid API Key" });
    }
};

module.exports = adminAuth;
