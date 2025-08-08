# Auth0 Domain Update Required

## Current Issue
The Auth0 domain in your `.env.local` file is set to a placeholder value:
```
AUTH0_ISSUER_BASE_URL='https://dev-xyz123.us.auth0.com'
```

## How to Fix

1. **Go to your Auth0 Dashboard**
   - Visit [Auth0.com](https://auth0.com)
   - Sign in to your account

2. **Find Your Domain**
   - In your Auth0 dashboard, look for your domain
   - It will be something like: `your-tenant.auth0.com` or `your-tenant.us.auth0.com`

3. **Update the .env.local file**
   - Open `.env.local` in your project
   - Replace the placeholder domain with your actual Auth0 domain
   - Example:
     ```env
     AUTH0_ISSUER_BASE_URL='https://your-actual-tenant.auth0.com'
     ```

4. **Restart the development server**
   ```bash
   npm run dev
   ```

## Authentication Flow

Once the domain is updated, the authentication flow will work as follows:

1. **User visits** `http://localhost:3000`
2. **Middleware redirects** to `/login` if not authenticated
3. **Login page** shows with "Sign In with Auth0" button
4. **User clicks** the button and is redirected to Auth0
5. **After successful login**, user is redirected back to the chat app
6. **Chat interface** is now accessible

## Testing

- Visit `http://localhost:3000`
- You should be redirected to `/login`
- Click "Sign In with Auth0"
- Complete the Auth0 login process
- You should be redirected back to the chat app

## Troubleshooting

If you get Auth0 errors:
1. Make sure your Auth0 application has the correct callback URLs:
   - `http://localhost:3000/api/auth/callback`
   - `http://localhost:3000`
2. Make sure the domain in `.env.local` matches your Auth0 tenant domain
3. Check that your Client ID and Client Secret are correct 