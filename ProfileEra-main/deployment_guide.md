# Production Environment Variables

Use these variables when setting up your hosting provider (Vercel, Railway, etc.).

## Backend (.env / Secret Keys)

| Key | Value / Instructions |
| :--- | :--- |
| `PORT` | `5000` (or leave empty for default) |
| `MONGO_URI` | **[CRITICAL]** Your MongoDB Atlas Connection String |
| `EMAIL_USER` | Your Gmail/SMTP email address |
| `EMAIL_PASS` | Your App Password (not your regular password) |
| `ADMIN_EMAIL` | `operations@profileera.com` |

## Frontend (.env / Secret Keys)

| Key | Value / Instructions |
| :--- | :--- |
| `VITE_API_URL` | The public URL of your deployed backend |

---

# Step-by-Step Deployment Guide

### Step 1: MongoDB Atlas
1. Create a project and a cluster on [MongoDB Atlas](https://www.mongodb.com/).
2. In "Network Access", allow your server's IP (or `0.0.0.0/0` for testing).
3. Create a Database User and copy the **Connection String**.
4. Replace the `MONGO_URI` in your production settings with this string.

### Step 2: Deploy Backend (e.g., Vercel)
1. Push your `server` folder to GitHub.
2. Connect the repo to Vercel.
3. Add the Environment Variables from the table above.
4. Once deployed, copy the **Deployment URL**.

### Step 3: Deploy Frontend (e.g., Vercel)
1. Push your `client` folder to GitHub.
2. Connect it to Vercel.
3. Add the Environment Variable `VITE_API_URL` using the URL you got in Step 2.
4. Under "Domains", add `profileera.com` as shown in your images.
