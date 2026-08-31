import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const askAI = async (message: string): Promise<string> => {
  try {
    const response = await axios.post(API_URL, { message });
    return response.data.reply;
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockReply(message);
  }
};

function mockReply(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("resume")) {
    return "Great question! Keep your resume to one page, use strong action verbs, and quantify achievements (e.g. 'Improved performance by 20%'). Tailor it to each company based on the job description. Want me to review a specific section?";
  }
  if (m.includes("aptitude") || m.includes("quant")) {
    return "For aptitude, consistency beats intensity. Solve 20-30 questions daily on a timer, focusing on your weak areas like time & work, percentages and data interpretation. Use the Preparation Guide resources for topic-wise practice.";
  }
  if (m.includes("interview")) {
    return "Great! In interviews, always use the STAR method (Situation, Task, Action, Result). Practice mock interviews out loud, research the company beforehand, and prepare 2-3 smart questions to ask at the end. Would you like me to quiz you?";
  }
  if (m.includes("dsa") || m.includes("coding") || m.includes("data structure")) {
    return "Build a strong DSA foundation by mastering arrays, strings, linked lists, trees and hash maps first. Practice daily on LeetCode, starting with Easy problems and progressing to Medium. Consistency for 3-4 months works best.";
  }
  if (m.includes("company") || m.includes("placement")) {
    return "Focus on companies matching your profile. Start with mass recruiters (Infosys, TCS, Wipro, CTS) for security, then aim for product companies like Zoho with higher packages. Keep applying and practicing companies' previous papers.";
  }
  return "That's a great question about placement prep! I'd recommend breaking it into a clear study plan across aptitude, technical fundamentals and mock interviews. Could you tell me more about which area you'd like help with - aptitude, coding, resume, or interview skills?";
}

