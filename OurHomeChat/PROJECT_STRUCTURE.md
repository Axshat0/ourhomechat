# Final Project Structure

```
our-home-chat/
├── backend/                    # Node.js API Server
│   ├── src/
│   │   ├── index.ts           # Main server entry point
│   │   ├── routes.ts          # API route handlers
│   │   ├── storage.ts         # Data storage layer
│   │   └── vite.ts            # Vite integration (legacy)
│   ├── package.json           # Backend dependencies
│   ├── tsconfig.json          # TypeScript config
│   └── .gitignore             # Backend gitignore
│
├── frontend/                   # React Vite Application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── chat-interface.tsx
│   │   │   ├── login-modal.tsx
│   │   │   ├── physics-formulas.tsx
│   │   │   └── theme-provider.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   ├── lib/               # Utility libraries
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── pages/             # Route components
│   │   │   ├── chat.tsx
│   │   │   └── not-found.tsx
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html            # HTML template
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.ts        # Vite configuration
│   ├── tailwind.config.ts    # Tailwind CSS config
│   ├── postcss.config.js     # PostCSS config
│   ├── components.json       # shadcn/ui config
│   ├── tsconfig.json         # TypeScript config
│   ├── tsconfig.node.json    # Node TypeScript config
│   └── .gitignore            # Frontend gitignore
│
├── shared/                     # Shared TypeScript Types
│   └── schema.ts              # Database schema & types
│
├── attached_assets/            # Static Assets
│   └── image_*.png            # User uploaded images
│
├── replit_config/             # Replit Configuration (unused in deployment)
│   └── (Replit-specific files)
│
├── README.md                  # Project documentation
├── DEPLOYMENT_GUIDE.md        # Deployment instructions
├── replit.md                  # Development documentation
├── drizzle.config.ts          # Database configuration
└── .gitignore                 # Root gitignore

Legacy files (can be removed after deployment):
├── client/                    # Old client directory
├── server/                    # Old server directory
├── package.json               # Root package.json (legacy)
├── vite.config.ts            # Root vite config (legacy)
├── tailwind.config.ts        # Root tailwind config (legacy)
├── tsconfig.json             # Root tsconfig (legacy)
└── components.json           # Root components config (legacy)
```

## Deployment Ready Structure

### Backend Service (Node.js)
- **Root Directory**: `backend/`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment**: Node.js

### Frontend Service (Static Site)
- **Root Directory**: `frontend/`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment**: Static

### Shared Types
- **Location**: `shared/`
- **Purpose**: Common TypeScript interfaces
- **Usage**: Imported by both frontend and backend