import apiClient from "./request";

export const aiAgentAPI = async ({ question, history }: { question: string, history: object[] }) => {
  const body = {
    question,
    history: history // Send last 5 messages
  };
  try {
    const res = await apiClient.post(`/ask`, body);
    console.log(res);
    return res.answer;
  } catch (error) {
    console.error("Error aiAgentAPI", { error });
    return null;
  }
};
