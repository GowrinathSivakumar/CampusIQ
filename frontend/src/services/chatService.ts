import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const askAI = async (message: string): Promise<string> => {
  const response = await axios.post(API_URL, { message });
  return response.data.reply;
};
