# PrismProperty - Modern Real Estate Management Platform

![PrismProperty Banner](https://repository-images.githubusercontent.com/948725958/9d1bd2a7-892b-4b94-a046-e467a12acff4)

PrismProperty is a sophisticated web application designed for real estate property management and search. The platform offers an intuitive interface for property listings, advanced search functionality, and comprehensive property management features for both users and administrators.

## Features

- **User Authentication**:

  - Secure login and registration with email/password
  - Social authentication with Google
  - Protected routes with middleware validation

- **Property Management**:

  - Add new properties with detailed information
  - Multi-image upload functionality
  - Categorize properties by type, status, and features

- **Property Search**:

  - Filtering options (min price, max price, bedroom count)
  - Interactive property cards with key information
  - Save favorite properties
  - Comprehensive property details view

- **User Dashboard**:

  - Manage personal account (update password, delete account)
  - View favourited properties

- **Admin Dashboard**:

  - Comprehensive property management:
    - Add new property
    - Edit existing property

## Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with App Router and Turbopack
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) built on [Radix UI](https://www.radix-ui.com/)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Storage**: [Firebase Storage](https://firebase.google.com/docs/storage)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Form Validation**: [Zod](https://github.com/colinhacks/zod)
- **Drag and Drop**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/)
- **Markdown Rendering**: [React Markdown](https://github.com/remarkjs/react-markdown)
- **Number Formatting**: [Numeral.js](https://numeraljs.com/)

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm (version 8 or higher)
- Firebase project with Authentication, Firestore, and Storage enabled

### Installation

1. Clone the repository:

```bash
git clone https://github.com/cel3ntano/prism-property.git
```

2. Navigate to the project directory:

```bash
cd prism-property
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env.local` file in the root directory based on `.env.example`:

```env
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

ADMIN_EMAIL=your_admin_email@example.com

NEXT_PUBLIC_FIREBASESTORAGE_URL=your_storage_url
```

5. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
prism-property/
├─ public/                # Static assets
├─ src/
│  ├─ app/                # Next.js pages and layouts
│  │  ├─ (auth)/          # Authentication routes
│  │  ├─ account/         # User account management
│  │  ├─ admin-dashboard/ # Admin dashboard
│  │  ├─ api/             # API routes
│  │  ├─ property/        # Property details pages
│  │  ├─ property-search/ # Property search functionality
│  ├─ components/         # React components
│  │  ├─ ui/              # Base UI components from shadcn
│  ├─ context/            # React context providers
│  ├─ data/               # Data fetching and manipulation
│  ├─ firebase/           # Firebase configuration
│  │  ├─ client.ts        # Client-side Firebase setup
│  │  ├─ server.ts        # Server-side Firebase setup
│  ├─ lib/                # Utility functions and configurations
│  ├─ types/              # TypeScript type definitions
│  ├─ validation/         # Form validation schemas
│  └─ middleware.ts       # Next.js middleware for route protection
```

## Deployment

The application is configured for deployment on Vercel or any other Next.js-compatible hosting platform. To deploy to Vercel:

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

## Author

Developed by Andrii Zhygalko
