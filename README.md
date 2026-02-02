# REVD Gallery

A digital art gallery with CMS capabilities built with Next.js and Sanity.io.

![REVD Gallery](https://via.placeholder.com/1200x600/1f2937/ffffff?text=REVD+Gallery)

## Features

- **3D Virtual Gallery**: Navigate between rooms using arrow controls
- **CMS Integration**: Full content management via Sanity Studio
- **Exhibition Management**: Create and manage exhibitions with artworks
- **Archive System**: Archive past exhibitions as digital catalogs (booklet style)
- **Bulletin Board**: Publish announcements and event posters
- **Responsive Design**: Gray and white minimalist theme

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **3D Graphics**: React Three Fiber, Three.js, Drei
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

## Getting Started

### 1. Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity.io account

### 2. Clone and Install

```bash
cd revd-gallery
npm install
```

### 3. Set Up Sanity

1. Create a new Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
2. Note your Project ID
3. Create a dataset (usually named `production`)

### 4. Configure Environment

Copy the example env file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your-write-token
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the gallery.
Open [http://localhost:3000/studio](http://localhost:3000/studio) for the CMS.

## CMS Content Types

### Homepage
- Hero title and subtitle
- Hero image
- About text
- Featured exhibition
- Featured bulletins

### Exhibitions
- Title, description, dates
- Active status (toggle to show/hide in gallery)
- Cover image
- Artworks (reference to artwork documents)
- Rooms configuration (for 3D gallery)

### Artworks
- Title, artist, year, medium
- Description
- Image
- Frame position (room and frame number)

### Bulletins
- Title, description
- Poster image
- Publish date
- Published status (only published items are visible)
- Event details (optional)

### Archive
- Reference to exhibition
- Cover image
- Exhibition photos
- Catalog PDF (optional)
- Archived date

## Gallery Room Configuration

### Adding 3D Models

1. Export your Blender room as GLB/GLTF format
2. In Sanity Studio, go to Exhibitions
3. Add a new room in the rooms array
4. Upload your GLB file
5. Configure frame positions

### Frame Configuration

Each frame needs:
- `frameId`: Unique identifier
- `position`: { x, y, z } coordinates
- `rotation`: { x, y, z } rotation in radians
- `size`: { width, height } in meters
- `artwork`: Reference to an artwork

### Default Room

If no 3D model is provided, a default room with walls is rendered. Artworks are automatically placed on the walls.

## File Structure

```
revd-gallery/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout with sidebar
│   │   ├── globals.css           # Global styles
│   │   ├── gallery/
│   │   │   └── page.tsx          # 3D Gallery
│   │   ├── archive/
│   │   │   ├── page.tsx          # Archive listing
│   │   │   └── [id]/page.tsx     # Archive detail
│   │   ├── bulletin/
│   │   │   ├── page.tsx          # Bulletin listing
│   │   │   └── [slug]/page.tsx   # Bulletin detail
│   │   └── studio/
│   │       └── [[...tool]]/      # Sanity Studio
│   ├── components/
│   │   ├── Sidebar.tsx           # Left navigation
│   │   ├── GalleryViewer.tsx     # 3D gallery component
│   │   ├── GalleryLoading.tsx    # Loading state
│   │   └── ArtworkGrid.tsx       # Artwork grid with modal
│   ├── lib/
│   │   ├── sanity.ts             # Sanity client & types
│   │   └── queries.ts            # GROQ queries
│   └── sanity/
│       └── schemas/              # Sanity schemas
├── public/
│   └── models/                   # 3D model files
├── sanity.config.ts              # Sanity configuration
├── tailwind.config.ts            # Tailwind configuration
└── package.json
```

## How to Use

### Creating an Exhibition

1. Go to `/studio`
2. Click "Artworks" → Create artworks with images
3. Click "Exhibitions" → Create new exhibition
4. Add title, dates, description
5. Reference your artworks
6. Configure rooms (optional - add 3D models)
7. Toggle "Is Active" to show in gallery

### Publishing a Bulletin

1. Go to `/studio`
2. Click "Bulletins" → Create new
3. Add title, poster image, description
4. Set publish date
5. Toggle "Is Published" to make visible

### Archiving an Exhibition

1. In Exhibitions, toggle "Is Active" to false
2. Go to Archive → Create new
3. Reference the ended exhibition
4. Add cover image and photos
5. Optionally upload a PDF catalog

## Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:

```ts
colors: {
  gallery: {
    white: '#FFFFFF',
    light: '#F5F5F5',
    gray: '#E5E5E5',
    mid: '#9CA3AF',
    dark: '#4B5563',
    charcoal: '#1F2937',
    black: '#111827',
  },
}
```

### Fonts
Currently using:
- **Display**: Playfair Display (headings)
- **Sans**: Inter (body text)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the production version:
```bash
npm run build
npm start
```

## Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for REVD Gallery
