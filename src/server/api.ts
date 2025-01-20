// import express from 'express';
// import { OpenAI } from '@langchain/openai';
// import { OpenAIEmbeddings } from '@langchain/openai';
// import { PDFLoader } from 'langchain-community/document_loaders/fs/pdf';
// import { MemoryVectorStore } from '@langchain/core/vectorstores/memory';
// import { RetrievalQAChain } from '@langchain/core/chains';

// const router = express.Router();

// let chain: RetrievalQAChain;

// // Initialize the chain
// async function initializeChain() {
//   try {
//     const model = new OpenAI({
//       openAIApiKey: process.env.VITE_OPENAI_API_KEY,
//       temperature: 0.7,
//     });

//     const loader = new PDFLoader('path/to/your/resume.pdf');
//     const docs = await loader.load();

//     const vectorStore = await MemoryVectorStore.fromDocuments(
//       docs,
//       new OpenAIEmbeddings({
//         openAIApiKey: process.env.VITE_OPENAI_API_KEY,
//       })
//     );

//     chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
//   } catch (error) {
//     console.error('Error initializing chain:', error);
//   }
// }

// // Initialize on startup
// initializeChain();

// router.post('/chat', async (req, res) => {
//   try {
//     const { question } = req.body;
//     const response = await chain.call({
//       query: question,
//     });
//     res.json({ response: response.text });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to generate response' });
//   }
// });

// export default router; 