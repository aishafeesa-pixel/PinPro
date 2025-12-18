
# Hostinger Deployment Guide for PinPro SaaS

### 1. Backend Setup (Node.js)
1. In your hPanel, go to **Advanced > Node.js**.
2. Create a new application. Set the entry file to `server.js` (or your compiled Express entry point).
3. Upload the `backend/` folder contents.
4. Create a `.env` file with:
   ```env
   DATABASE_URL="mysql://user:pass@localhost:3306/pinpro_db"
   JWT_SECRET="your_secure_random_string"
   API_KEY="your_google_genai_api_key"
   PORT=3000
   ```
5. Run `npm install`.

### 2. Database Setup (MySQL)
1. Go to **Databases > MySQL Databases**.
2. Create a new database and user.
3. In your local development machine, run:
   `npx prisma migrate deploy`
   (Ensure your local `.env` points to the Hostinger DB for this step).

### 3. Frontend Deployment
1. Run `npm run build` in the React/Next.js folder.
2. Upload the contents of the `dist/` or `out/` folder to your domain's `public_html`.
3. If using a custom server, ensure the Node.js app serves these static files.

### 4. PM2 Process Manager
1. SSH into your Hostinger account.
2. Install PM2 globally: `npm install pm2 -g`
3. Start the server: `pm2 start server.js --name pinpro-backend`
4. Set to auto-restart: `pm2 startup`

### 5. Multi-Language Support
To add a new language, simply add a new key to the `translations.ts` file on the frontend and update the site settings in the admin panel to enable it in the selector.
