# Auth0 Setup Guide

This guide will help you configure Auth0 for the Chat AI Playground application.

## Step 1: Create an Auth0 Account

1. Go to [Auth0.com](https://auth0.com) and sign up for a free account
2. Create a new tenant (your domain will be something like `your-tenant.auth0.com`)

## Step 2: Create an Application

1. In your Auth0 dashboard, go to **Applications** → **Applications**
2. Click **Create Application**
3. Choose **Regular Web Application**
4. Give it a name like "Chat AI Playground"

## Step 3: Configure Application Settings

1. In your application settings, configure the following:

### Allowed Callback URLs:
```
http://localhost:3000/api/auth/callback
```

### Allowed Logout URLs:
```
http://localhost:3000
```

### Allowed Web Origins:
```
http://localhost:3000
```

## Step 4: Get Your Credentials

1. Copy your **Domain** (e.g., `your-tenant.auth0.com`)
2. Copy your **Client ID**
3. Copy your **Client Secret**

## Step 5: Update Environment Variables

1. Open the `.env.local` file in your project
2. Replace the placeholder values with your actual Auth0 credentials:

```env
AUTH0_SECRET='your_generated_secret_key'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-tenant.auth0.com'
AUTH0_CLIENT_ID='your_client_id'
AUTH0_CLIENT_SECRET='your_client_secret'
```

### Generate AUTH0_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -hex 32
```

Or use this online generator: https://generate-secret.vercel.app/32

## Step 6: Test the Configuration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. Click the "Login with Auth0" button
4. You should be redirected to Auth0's login page
5. After successful login, you should be redirected back to your app

## Troubleshooting

### Common Issues:

1. **"Invalid redirect_uri"**: Make sure your callback URL is exactly `http://localhost:3000/api/auth/callback`

2. **"Invalid client"**: Double-check your Client ID and Client Secret

3. **"Invalid state"**: This usually means there's an issue with the AUTH0_SECRET. Make sure it's properly generated and set.

4. **Environment variables not loading**: Make sure your `.env.local` file is in the root directory of your project.

### For Production:

When deploying to production, update the URLs in your Auth0 application settings:

- **Allowed Callback URLs**: `https://yourdomain.com/api/auth/callback`
- **Allowed Logout URLs**: `https://yourdomain.com`
- **Allowed Web Origins**: `https://yourdomain.com`

And update your `.env.local` file:

```env
AUTH0_BASE_URL='https://yourdomain.com'
```

## Additional Resources

- [Auth0 Next.js SDK Documentation](https://auth0.com/docs/libraries/nextjs-auth0)
- [Auth0 Application Settings](https://auth0.com/docs/applications)
- [Auth0 Security Best Practices](https://auth0.com/docs/best-practices) 