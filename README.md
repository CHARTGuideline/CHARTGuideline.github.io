# CHART React Website

Modern, responsive React website for the Chatbot Assessment Reporting Tool (CHART) - a comprehensive reporting guideline for chatbot health advice studies.

## Color Scheme

- **Primary Cream**: `#F5EFE6` - Soft, warm background
- **Warm Beige**: `#E8DFCA` - Accent color for gradients
- **Soft Blue**: `#6D94C5` - Primary interactive elements
- **Light Blue**: `#CBDCEB` - Secondary accents and borders

## Features

✨ **Modern React Architecture**
- React 18 with TypeScript
- React Router for navigation
- Component-based structure

🎨 **Beautiful Design**
- Soft, eye-friendly color palette
- Smooth animations with Framer Motion
- Responsive design (mobile-first)
- Dark mode toggle

♿ **Accessibility**
- ARIA labels
- Keyboard navigation
- Focus management
- Reduced motion support

📱 **Pages**
- Home - Hero section with resource cards
- Resources - Download checklists and diagrams
- About - Information about CHART
- Citation - How to cite
- Feedback - Contact form

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Guideline/
├── public/                      # Static assets
│   ├── CHARTlogo.jpg           # CHART logo
│   ├── Full Checklist.docx     # Downloadable checklist (Word)
│   ├── Full Checklist.pdf      # Downloadable checklist (PDF)
│   ├── Abstract Checklist.docx # Abstract checklist (Word)
│   ├── Abstract Checklist.pdf  # Abstract checklist (PDF)
│   ├── Methodological Diagram.docx
│   └── Methodological Diagram.pdf
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Navigation header with logo & theme toggle
│   │   └── Footer.tsx          # Footer with links and contact info
│   ├── pages/
│   │   ├── Home.tsx            # Landing page with hero & resource cards
│   │   ├── Resources.tsx       # Resources page (placeholder)
│   │   ├── About.tsx           # About CHART guideline
│   │   ├── Citation.tsx        # Citation formats & journal links
│   │   ├── Diagram.tsx         # Interactive diagram builder
│   │   └── Feedback.tsx        # Feedback form (Formspree)
│   ├── contexts/
│   │   └── ThemeContext.tsx    # Dark/light mode context
│   ├── theme.ts                # Color palette and theme config
│   ├── images.d.ts             # TypeScript image module declarations
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── .github/
│   └── copilot-instructions.md # Development guidelines
├── index.html                   # HTML entry point (Vite)
├── package.json                 # Dependencies & scripts
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── README.md                    # This file
└── DEPLOYMENT.md                # GitHub Pages deployment guide
```

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Emotion** - CSS-in-JS styling

## Development

The website includes:
- Smooth page transitions
- Hover effects on cards and buttons
- Responsive mobile menu
- Dark/light mode with localStorage persistence
- Optimized for performance

## License

© 2025 CHART Collaboration. All rights reserved.

## Contact

For questions about CHART guidelines: bright.huo@dal.ca
