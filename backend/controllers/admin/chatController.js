const { generateResponse } = require("../../services/groqService");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const reply = await generateResponse(message);

    res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error("Chat Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response.",
    });
  }
};

module.exports = {
  chatWithAI,
};