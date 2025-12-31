# Random Quote Generator

A beautiful, minimal quote generator built with Next.js 14 and Tailwind CSS. Get inspired with motivational quotes fetched from the internet.

## Features

- 🎨 **Minimal & Modern Design** - Clean UI with Tailwind CSS
- 🏔️ **Beautiful Mountains Background** - Stunning landscape from Unsplash
- 🌓 **Dark Mode Support** - Automatically adapts to system preferences
- 🔄 **Instant Refresh** - Get new quotes with a single click
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast & Efficient** - Built with Next.js 14 App Router
- 🎯 **Motivational Quotes** - Curated inspirational content with fallback system

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **API**: [Quotable API](https://github.com/lukePeavey/quotable) - Free public API for quotes

## Project Structure

```
quote-generator-app/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main quote generator page
│   └── globals.css      # Global styles with Tailwind
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Features Explained

### Quote Fetching
The app uses the Quotable API to fetch random motivational and inspirational quotes. The API is free, requires no authentication, and provides high-quality quotes with proper attribution.

### Responsive Design
Built with a mobile-first approach using Tailwind CSS, ensuring a great experience across all device sizes.

### Loading States
Includes proper loading indicators and error handling for a smooth user experience.

### Accessibility
- Semantic HTML structure
- Proper button states and focus indicators
- Screen reader friendly

## Customization

### Changing the Background Image
To use a different background image, update the `backgroundImage` URL in `app/page.tsx`:

```typescript
style={{
  backgroundImage: "url('YOUR_UNSPLASH_IMAGE_URL')",
}}
```

You can browse [Unsplash](https://unsplash.com) for beautiful free images. To get an optimized URL, use the format:
```
https://images.unsplash.com/photo-[PHOTO_ID]?q=80&w=2070&auto=format&fit=crop
```

### Changing Quote Categories
Edit the API endpoint in `app/page.tsx`:

```typescript
// Current: inspirational and motivational
const response = await fetch('https://api.quotable.io/random?tags=inspirational|motivational')

// Options: wisdom, life, happiness, success, etc.
const response = await fetch('https://api.quotable.io/random?tags=wisdom')
```

### Adding More Fallback Quotes
Expand the `FALLBACK_QUOTES` array in `app/page.tsx` to add more quotes to the local collection.

### Styling
Modify the Tailwind classes in `app/page.tsx` or update the theme in `tailwind.config.ts` to customize colors, fonts, and more.

## Build for Production

```bash
npm run build
npm start
```

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Quotes provided by [Quotable API](https://github.com/lukePeavey/quotable)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

cd /Users/ellec/Documents/quote-generator-app

# Install dependencies
npm install

# Start the development server on port 8080
npm run dev