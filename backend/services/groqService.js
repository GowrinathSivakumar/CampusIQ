const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateResponse = async (message) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are CampusIQ AI Interview Mentor.

Your purpose is to help students prepare for interviews.

Rules:
- Answer clearly and professionally.
- Explain concepts in simple English.
- Give interview tips whenever useful.
- For coding questions, provide optimized solutions with explanations.
- For HR questions, answer like an experienced interviewer.
- Keep responses concise but informative.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.7,
      max_tokens: 1024,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);

    throw new Error("Failed to generate AI response.");
  }
};

module.exports = {
  generateResponse,
};