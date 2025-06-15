# BeautyBuilder - Multi-Tenant SaaS Platform

A comprehensive multi-tenant SaaS platform for beauty professionals to create and manage their online presence, similar to GlossGenius.

## Features

### 🏢 Multi-Tenant Architecture
- Subdomain-based tenant routing
- Custom domain support
- Isolated tenant data

### 🎨 Website Builder
- Professional templates for beauty businesses
- Drag-and-drop customization
- Mobile-responsive designs
- Real-time preview

### 📅 Booking System
- Online appointment scheduling
- Calendar integration
- Automated confirmations
- Client management

### 🖼️ Portfolio Management
- Photo gallery management
- Before/after showcases
- Image optimization

### 💳 Payment Integration
- Stripe subscription billing
- Multiple pricing tiers
- Customer portal

### 🔐 Authentication & Security
- Supabase authentication
- Row-level security
- OAuth providers

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe (commented out - ready for integration)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

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
