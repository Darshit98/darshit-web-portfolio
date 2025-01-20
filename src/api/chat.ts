// import { OpenAI } from '@langchain/openai';
// import { PDFLoader } from 'langchain-community/document_loaders/pdf';
// import { OpenAIEmbeddings } from '@langchain/openai';
// import { MemoryVectorStore } from '@langchain/community/vectorstores/memory';
// import { createRetrievalChain } from "langchain/chains/retrieval";
// import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
// import { ChatPromptTemplate } from "@langchain/core/prompts";

// let chain;

// async function initializeChain() {
//   try {
//     console.log('Initializing chain...');
//     const model = new OpenAI({
//       openAIApiKey: process.env.VITE_OPENAI_API_KEY,
//       temperature: 0.7,
//     });

//     console.log('Loading PDF...');
//     const loader = new PDFLoader('./public/resume_portfolio.pdf');
//     const docs = await loader.load();
//     console.log('PDF loaded:', docs.length, 'documents');

//     const vectorStore = await MemoryVectorStore.fromDocuments(
//       docs,
//       new OpenAIEmbeddings({
//         openAIApiKey: process.env.VITE_OPENAI_API_KEY,
//       })
//     );

//     const prompt = ChatPromptTemplate.fromTemplate(`
//       Answer the following question based on the provided context:
//       Context: {context}
//       Question: {question}
//       Answer: `
//     );

//     const documentChain = await createStuffDocumentsChain({
//       llm: model,
//       prompt,
//     });

//     chain = await createRetrievalChain({
//       combineDocsChain: documentChain,
//       retriever: vectorStore.asRetriever(),
//     });

//     console.log('Chain initialized successfully');
//   } catch (error) {
//     console.error('Error in initializeChain:', error);
//     throw error;
//   }
// }

// // Initialize the chain when the module loads
// initializeChain();

// Remove the generateResponse function entirely 