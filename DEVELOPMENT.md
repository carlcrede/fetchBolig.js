# Development Guide

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development
npm run dev

# 3. Open browser
# http://localhost:3000
```

## Project Structure Explained

### `/server` - Backend (Node.js + TypeScript)

- **`index.ts`**: Main HTTP server
  - Routes: `/`, `/api/auth/login`, `/api/offers`, `/api/threads`
  - Static file serving from `/public`
- **`findbolig-client.ts`**: API wrapper
  - Handles authentication via cookies
  - Makes requests to findbolig.nu on behalf of the client
- **`http-utils.ts`**: Helper functions for HTTP
  - `sendJSON()`, `parseJSONBody()`, routing helpers

### `/client` - Frontend (HTMX + TypeScript)

- **`index.html`**: Main UI
  - Uses HTMX for dynamic updates
  - Tailwind CSS classes for styling
- **`app.ts`**: Client-side logic
  - IndexedDB operations via Dexie
  - UI updates and state management
- **`styles.css`**: Tailwind input
  - Custom components with `@layer`

### `/types` - Shared Type Definitions

- **`offers.ts`**: Offer types + Zod schemas
- **`threads.ts`**: Thread types + Zod schemas

### `/lib` - Shared Business Logic

- **`offers-domain.ts`**: Transform API data → Domain models
- **`threads-domain.ts`**: Transform API data → Domain models

## Development Workflow

### Making Changes

1. **Server changes**: Edit `server/*.ts`

   - Server auto-restarts via `tsx watch`

2. **Client TypeScript**: Edit `client/app.ts`

   - Auto-rebuilds via `esbuild --watch`

3. **Styles**: Edit `client/styles.css`

   - Auto-rebuilds via `tailwindcss --watch`

4. **HTML**: Edit `client/index.html`
   - Refresh browser to see changes or run Live Server extension

### Adding New API Endpoints

1. Add route handler in `server/index.ts`:

```typescript
route("/api/new-endpoint", async (req, res) => {
  // Handler logic
  sendJSON(res, { data: "..." });
});
```

2. Add client function in `client/app.ts`:

```typescript
async function fetchNewData() {
  const res = await fetch("/api/new-endpoint");
  const data = await res.json();
  // Handle data
}
```

3. Add HTMX button in `client/index.html`:

```html
<button onclick="fetchNewData()">Fetch New Data</button>
```

### Adding New Types

1. Define in appropriate `types/*.ts` file
2. Export from that file
3. Import where needed (both client and server can use)

### Styling with Tailwind

Use utility classes directly in HTML:

```html
<div class="bg-blue-500 text-white p-4 rounded-lg">Content</div>
```

Or create reusable components in `client/styles.css`:

```css
@layer components {
  .my-button {
    @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
  }
}
```

## Debugging

### Server Logs

Check terminal output where `npm run dev` is running

### Client Logs

Open browser DevTools console (F12)

### Network Requests

Browser DevTools → Network tab

### IndexedDB Data

Browser DevTools → Application → IndexedDB → FindboligDB

## Production Build

```bash
# Build client + styles
npm run build

# Start production server
npm start
```

Built files go to `public/dist/`:

- `app.js` (minified)
- `styles.css` (purged, minified)
