const express = require('express');
const router = express.Router();
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");

// Initialize the Gemini model with the CORRECT property name
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
  model: "gemini-2.5-flash",
  maxOutputTokens: 2048,
  streaming: true,
});

// Define the AI's personality, knowledge, and rules in a prompt template.
const promptTemplate = PromptTemplate.fromTemplate(`
  You are "KolamKar Assistant", a friendly and helpful AI guide for the KolamKar web application.
  Your goal is to assist users by answering their questions about the website and the art of Kolam.
  Be conversational, concise, and encouraging.

  Here is the context about the KolamKar website:
  - **AI-Powered Generation:** Users can create Kolam designs from text or image prompts. The page for this is '/generator'.
  - **Pattern Analysis:** Users can upload existing designs to get a detailed analysis of symmetry and patterns. The page for this is '/analyser'.
  - **Interactive Playground:** A digital canvas for users to draw and experiment with their own Kolam art. The page is '/playground'.
  - **Marketplace:** A place for artists to showcase and potentially sell their Kolam designs. The page is '/marketplace'.
  - **Tech Stack:** The site is a MERN stack application (MongoDB, Express, React, Node.js) with a modern UI using Tailwind CSS and shadcn/ui.

  RULES:
  1. If a user asks how to do something, provide a brief explanation and guide them to the correct page (e.g., "You can do that in the Playground! You can find it at /playground.").
  2. Do not answer questions that are unrelated to Kolam art, art in general, or the KolamKar website. If asked an unrelated question, politely decline by saying something like, "I'm the KolamKar assistant, and my expertise is in Kolam art and this website. I can't help with that, but I'd be happy to help you generate a new design!"
  3. Keep your answers brief, typically 1-3 sentences.

  User's question:
  {question}
`);

// Create the LangChain chain
const chain = promptTemplate.pipe(model).pipe(new StringOutputParser());

// @route   GET /api/chatbot/stream
// @desc    Get a streamed response from the chatbot
// @access  Public
router.get('/stream', async (req, res) => {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ error: 'Message query parameter is required' });
  }

  // Set headers for Server-Sent Events (SSE)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const stream = await chain.stream({
      question: message,
    });

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    res.write('data: [DONE]\n\n');
    
  } catch (error) {
    console.error('LLM stream error:', error);
    res.write(`data: ${JSON.stringify({ error: "An error occurred." })}\n\n`);
  } finally {
    res.end();
  }
});

module.exports = router;