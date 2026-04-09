# Waitlist Landing Page

Capture email interest for your MVP before building the product.

## Quick Start

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Airtable Setup

1. Create an [Airtable](https://airtable.com) account and a new base
2. Create a table named `Leads` with these fields:
   - **Name** (Single line text)
   - **Email** (Email)
   - **Created** (Date)
3. Generate a Personal Access Token at [airtable.com/create/tokens](https://airtable.com/create/tokens)
   - Grant access to your base
4. Copy your Base ID from the Airtable API docs for your base

## Environment Variables

Create a `.env` file (never commit this) or set via Vercel dashboard:

```
AIRTABLE_API_KEY=your_airtable_personal_access_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=Leads
```

## Deploy to Vercel

```bash
vercel --prod
```

## Verify

1. Open your deployed Vercel URL
2. Enter a test name and email
3. Submit and verify the record appears in your Airtable `Leads` table
4. Check browser console for any errors
