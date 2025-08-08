# Complete Auth0 Setup Guide

## Step 1: Create Auth0 Account

1. **Go to Auth0.com**
   - Visit [https://auth0.com](https://auth0.com)
   - Click "Get Started Free" or "Sign Up"

2. **Create Your Account**
   - Fill in your email and password
   - Verify your email address

## Step 2: Create a New Application

1. **Access Dashboard**
   - After login, you'll be in your Auth0 dashboard
   - Look for "Applications" in the left sidebar

2. **Create Application**
   - Click "Applications" → "Applications"
   - Click the "+ Create Application" button
   - Give it a name like "Chat AI Playground"
   - Select "Regular Web Application"
   - Click "Create"

## Step 3: Get Your Domain

1. **Find Your Domain**
   - In your Auth0 dashboard, look at the top
   - You'll see your domain like: `your-tenant.auth0.com` or `your-tenant.us.auth0.com`
   - **Copy this domain** - you'll need it for the `AUTH0_ISSUER_BASE_URL`

## Step 4: Get Application Credentials

1. **Go to Application Settings**
   - In your newly created application
   - Click on the "Settings" tab

2. **Copy Your Credentials**
   - **Client ID**: Copy the "Client ID" value
   - **Client Secret**: Click "Show" next to "Client Secret" and copy it

## Step 5: Configure Application Settings

1. **Allowed Callback URLs**
   - Add: `http://localhost:3000/api/auth/callback`

2. **Allowed Logout URLs**
   - Add: `http://localhost:3000`

3. **Allowed Web Origins**
   - Add: `http://localhost:3000`

4. **Save Changes**
   - Scroll down and click "Save Changes"

## Step 6: Update Your Environment File

1. **Open `.env.local`** in your project
2. **Replace the placeholder values** with your actual credentials:

```env
AUTH0_SECRET='shfgishjhighgkhgfhdjhjfdnhgrunvnnifngjnf'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR-ACTUAL-DOMAIN.auth0.com'
AUTH0_CLIENT_ID='YOUR-ACTUAL-CLIENT-ID'
AUTH0_CLIENT_SECRET='YOUR-ACTUAL-CLIENT-SECRET'
```

**Replace:**
- `YOUR-ACTUAL-DOMAIN` with your Auth0 domain (e.g., `myapp.auth0.com`)
- `YOUR-ACTUAL-CLIENT-ID` with your Client ID
- `YOUR-ACTUAL-CLIENT-SECRET` with your Client Secret

## Step 7: Generate AUTH0_SECRET

1. **Open Command Prompt/Terminal**
2. **Run this command:**
   ```bash
   openssl rand -hex 32
   ```
3. **Copy the output** and replace the AUTH0_SECRET value

## Step 8: Test Your Setup

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Visit your app:**
   - Go to `http://localhost:3000`
   - You should be redirected to `/login`
   - Click "Sign In with Auth0"
   - Complete the login process

## Example of Complete .env.local

```env
# Auth0 Configuration
AUTH0_SECRET='a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://myapp.auth0.com'
AUTH0_CLIENT_ID='MBZOU7GmplZ2S2cnECigxW6O7SoqMMdT'
AUTH0_CLIENT_SECRET='iCfELEQF1Ri3UgnNvO5Hvkd-kzEzTBjReEe4l_iZxPZeafK6RrENpi0cVAIRe00Wt'

# Other configurations
DATABASE_URL='postgresql://postgres:sagnik123@db.desalwgexlgitrgkgwkd.supabase.co:5432/postgres'
GEMINI_API_KEY='AIzaSyDwXi6NRiSxxnUcX1BaZMwJCFJggbUd4OU'
NEXT_PUBLIC_SUPABASE_URL='https://desalwgexlgitrgkgwkd.supabase.co'
NEXT_PUBLIC_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlc2Fsd2dleGxnaXRyZ2tnd2tkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NDI3MTgsImV4cCI6MjA3MDAxODcxOH0.63WpASj1AhaZU4XBrBL1hlqlYL2e_ewTMxMRzpgwBnQ'
```

## Troubleshooting

### Common Issues:

1. **"Invalid redirect_uri"**
   - Make sure your callback URL is exactly: `http://localhost:3000/api/auth/callback`

2. **"Invalid client"**
   - Double-check your Client ID and Client Secret

3. **"Invalid state"**
   - Regenerate your AUTH0_SECRET using `openssl rand -hex 32`

4. **Domain not found**
   - Make sure your Auth0 domain is correct and includes `https://`

## Need Help?

- **Auth0 Documentation**: [https://auth0.com/docs](https://auth0.com/docs)
- **Next.js Auth0 SDK**: [https://auth0.com/docs/libraries/nextjs-auth0](https://auth0.com/docs/libraries/nextjs-auth0) 