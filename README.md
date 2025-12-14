# PYRAX Web

Marketing website and presale dashboard for the PYRAX blockchain.

## Tech Stack

- **Framework:** Next.js 15
- **Styling:** TailwindCSS v4.1.17 (zero-config)
- **Wallet:** wagmi + RainbowKit
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Docker

```bash
# Development
docker-compose up web-dev

# Production
docker-compose up web
```

## Pages

- `/` - Home
- `/technology` - TriStream ZK-DAG technology overview
- `/tokenomics` - Token distribution and economics
- `/roadmap` - Network rollout roadmap
- `/governance` - Ethereum-like governance model
- `/security` - Security policies and bug bounty
- `/presale` - Presale dashboard with wallet connection
- `/faq` - Frequently asked questions
- `/docs` - Documentation links
- `/status` - Network status

## Project Structure

```
src/
├── app/               # Next.js App Router pages
│   ├── page.tsx       # Home page
│   ├── presale/       # Presale dashboard
│   ├── technology/    # Technology page
│   └── ...
├── components/        # React components
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── providers.tsx
└── lib/               # Utilities and helpers
```

## Styling

This project uses TailwindCSS v4.1.17 with the zero-config approach:
- No `tailwind.config.js` file
- Custom theme defined in `globals.css` using `@theme`
- PostCSS configured with `@tailwindcss/postcss`

## Security

- CSP headers configured in `next.config.ts`
- XSS protection enabled
- Secure cookies for any server-side sessions
- Rate limiting should be configured at the infrastructure level

## License

Copyright © 2024 PYRAX Contributors. All rights reserved.
