import axios from "axios";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export const fetchNewsItem = async (newsId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/item/${newsId}.json`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке новости:", error);
    throw error;
  }
};
