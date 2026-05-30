import apiClient from "./request";

export const aiAgentAPI = async ({ question, history }: { question: string, history: object[] }) => {
  const body = {
    question,
    history: history
  };
  try {
    const res = await apiClient.post(`/ask`, body);
    if(typeof res.answer === 'string') {
      return res
    }
    return res.answer;
  } catch (error) {
    console.error("Error aiAgentAPI", { error });
    return null;
  }
};

export const uploadKnowledgeDoc = async (file: File): Promise<{ status: string; message: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await apiClient.post('/upload-knowledge', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res as { status: string; message: string };
  } catch (error) {
    const data = (error as any)?.response?.data;
    const msg = data?.message || data?.detail || 'Upload failed. Please try again.';
    return { status: 'error', message: msg };
  }
};
