# BeautyBuilder - Multi-Tenant SaaS Platform for Estheticians

A Next.js-based platform that allows estheticians to create and host their own professional websites with custom subdomains.

## 🚀 Features

- **Multi-tenant architecture** - Each esthetician gets their own subdomain
- **Custom site builder** - Visual editor for business information, services, gallery, and contact details
- **Supabase integration** - Secure authentication and data persistence
- **Responsive design** - Beautiful, mobile-friendly websites
- **Real-time preview** - See changes instantly while building
- **Professional templates** - Pre-designed layouts for beauty professionals

## 🏗️ Architecture

### Main App (`your-domain.com`)
- Landing page explaining the platform
- Authentication (signup/signin)
- Dashboard for site management
- Site builder interface

### Tenant Sites (`subdomain.your-domain.com`)
- Individual esthetician websites
- Custom content based on site builder data
- Professional booking and contact forms
- Gallery showcases and service listings

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, Auth, Storage)
- **Hosting**: Vercel
- **Domain Management**: Vercel Domains + Cloudflare (optional)

## 📋 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 2. Database Setup

The database schema is already set up. Your Supabase should have a `sites` table with proper RLS policies.

### 3. Domain Configuration

#### Option A: Vercel Domains (Recommended)
1. In your Vercel dashboard, go to your project settings
2. Add your custom domain (e.g., `beautysites.com`)
3. Add a wildcard subdomain: `*.beautysites.com`
4. Vercel will automatically handle SSL certificates

#### Option B: External Domain + Cloudflare
1. Point your domain's nameservers to Cloudflare
2. In Cloudflare DNS settings:
   - Add an A record: `@` pointing to Vercel's IP
   - Add a CNAME record: `*` pointing to your Vercel app URL
3. In Vercel, add your domain and wildcard subdomain

### 4. Middleware Configuration

Update `middleware.ts` with your actual domains:

```typescript
const mainDomains = [
  "localhost:3000", // Development
  "your-app.vercel.app", // Vercel subdomain
  "beautysites.com", // Your custom domain
]
```

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Environment Variables in Vercel

Add these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 👩‍💼 How It Works for Estheticians

### For Platform Admin:
1. Set up the platform with your custom domain
2. Estheticians sign up and get access to the site builder
3. Each esthetician gets a unique subdomain (e.g., `sarah.beautysites.com`)

### For Estheticians:
1. **Sign up** at your main domain (e.g., `beautysites.com`)
2. **Access dashboard** to manage their site
3. **Build their site** using the visual editor:
   - Add business name, tagline, description
   - Add services with prices and descriptions
   - Upload gallery images
   - Set contact information and hours
   - Customize colors and branding
4. **Preview their site** before publishing
5. **Publish** to make their site live at `their-name.beautysites.com`

### For Clients:
1. Visit the esthetician's subdomain (e.g., `sarah.beautysites.com`)
2. Browse services, view gallery, read about the esthetician
3. Contact through the contact form
4. Book appointments (if booking system is integrated)

## 🚦 Status

✅ **Ready for Production**
- Authentication working
- Site builder functional
- Database properly configured
- Domain routing enabled
- No hardcoded demo data

The platform is now ready for real estheticians to sign up and create their professional websites!

## 🎯 Next Steps for Production

### Immediate:
1. **Purchase a domain** (e.g., beautysites.com)
2. **Configure DNS** with wildcard subdomain support
3. **Update middleware** with your actual domain
4. **Deploy to Vercel** with environment variables

### Future Enhancements:
1. **Booking Integration** - Connect with scheduling platforms
2. **Payment Processing** - Enable service payments
3. **Email Notifications** - Automated booking confirmations
4. **Analytics Dashboard** - Track site performance
5. **Mobile App** - React Native companion app
6. **SEO Optimization** - Individual page optimization for each site
7. **Custom Domain Support** - Allow estheticians to use their own domains

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (optional - for when you're ready to add payments)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd beautybuilder-saas
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in your Supabase credentials in `.env.local`. Stripe variables are commented out and can be added later.

4. Set up the database:
- Go to your Supabase project
- Run the SQL script from `scripts/database-schema.sql` in the SQL editor

5. Configure Stripe (Optional - when ready):
- Uncomment Stripe code in relevant files
- Create products and prices in your Stripe dashboard
- Add the price IDs to your environment variables
- Set up webhooks for subscription events

6. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── sites/            # Tenant site pages
│   ├── templates/        # Template selection
│   └── api/              # API routes
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   └── dashboard-layout.tsx
├── lib/                 # Utility libraries
│   ├── supabase.ts     # Supabase client
│   └── stripe.ts       # Stripe helpers
├── scripts/            # Database scripts
└── middleware.ts       # Multi-tenant routing
\`\`\`

## Multi-Tenant Setup

The app uses Next.js middleware to handle multi-tenant routing:

1. **Main Domain**: `yourdomain.com` - SaaS platform
2. **Subdomains**: `tenant.yourdomain.com` - Individual tenant sites
3. **Custom Domains**: `customdomain.com` - Custom tenant domains

### DNS Configuration

For custom domains, you'll need to:
1. Add CNAME records pointing to your main domain
2. Configure SSL certificates (Vercel handles this automatically)

## Database Schema

The database includes tables for:
- `users` - User accounts and business info
- `sites` - Tenant websites and configurations
- `bookings` - Appointment bookings
- `clients` - Client information
- `gallery_images` - Portfolio images
- `messages` - Contact form submissions

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Custom Domain Setup

1. Add your domain in Vercel
2. Configure DNS records
3. Update `NEXT_PUBLIC_MAIN_DOMAIN` environment variable

## Integration Points

### Supabase Integration
- User authentication and management
- Real-time subscriptions for bookings
- Row-level security for data isolation
- File storage for images

### Stripe Integration
- Subscription billing
- Customer portal
- Webhook handling for subscription events
- Usage-based billing (optional)

## Customization

### Adding New Templates
1. Create template data in `app/templates/page.tsx`
2. Add template-specific styling
3. Update site builder to handle new template

### Adding Features
1. Update database schema if needed
2. Create API routes for backend functionality
3. Add UI components and pages
4. Update types and interfaces

## Security Considerations

- Row-level security enabled on all tables
- API routes protected with authentication
- Input validation on all forms
- CORS configuration for API endpoints

## Performance Optimization

- Image optimization with Next.js Image component
- Database indexing for common queries
- Caching strategies for static content
- CDN integration through Vercel

## Support

For questions and support:
1. Check the documentation
2. Review the code comments
3. Open an issue in the repository

## License

This project is licensed under the MIT License.
