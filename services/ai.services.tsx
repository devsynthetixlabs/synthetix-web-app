import { serverIp } from "@/constants/api";
import apiClient from "./request";

export const aiAgentAPI = async ({ question, history }: { question: string, history: object[] }) => {
  const body = {
    question,
    history: history // Send last 5 messages
  };
  try {
    const res = await apiClient.post(`http://${serverIp}:8000/ask`, body);
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error aiAgentAPI", { error });
    return null;
  }
};
