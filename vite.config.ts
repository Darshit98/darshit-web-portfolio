import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import express from 'express';
import type { ViteDevServer } from 'vite';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    {
      name: 'configure-server',
      configureServer(server: ViteDevServer) {
        const app = express();
        app.post('/api/chat', async (req, res) => {
          try {
            const { question } = req.body;
            res.json({ response: 'This functionality has been removed.' });
          } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to generate response' });
          }
        });
        server.middlewares.use(app);
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

// Comment out any langchain-related code here if present
// import { SomeLangchainModule } from 'langchain-community/document_loaders/fs/pdf'; // Example of what to comment out
// import { SomeLangchainConfig } from '@langchain/core/vectorstores/memory'; // Example of what to comment out
// ... other langchain-related configurations ...