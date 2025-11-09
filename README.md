# FindBolig.js

Better dashboard for Findbolig.nu with local storage and offline access.

## Architecture

- **Server**: Node.js with native `http` module (TypeScript)
- **Client**: HTMX + TypeScript + Tailwind CSS
- **Storage**: IndexedDB via Dexie.js
- **Build**: esbuild (client) + Tailwind CLI (styles)

## Structure

```
fetchBolig.js/
├── server/              # Node.js server
│   ├── index.ts         # Main server with routes
│   └── findbolig-client.ts  # API client with cookie management
├── client/              # Browser client
│   ├── index.html       # Main page
│   ├── app.ts           # Client logic + IndexedDB
│   └── styles.css       # Tailwind input
├── types/               # Shared types
│   ├── offers.ts        # Offer types & schemas
│   ├── threads.ts       # Thread types & schemas
│   └── api.ts           # API request/response types
├── lib/                 # Shared domain logic
│   ├── offers-domain.ts # Offer transformations
│   └── threads-domain.ts # Thread transformations
└── public/dist/         # Built assets (generated)
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

This starts:

- Server on http://localhost:3000
- Client TypeScript build
- Tailwind CSS build

## Usage

1. Open http://localhost:3000
2. Login with your findbolig.nu credentials
3. Click "Fetch Offers" or "Fetch Threads" to retrieve data
4. Data is automatically stored in IndexedDB
5. Use "Load from Storage" to view cached data offline

## Scripts

- `npm run dev` - Start development with watch mode
- `npm run build` - Build for production
- `npm start` - Start production server
