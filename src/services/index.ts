import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchNews = async () => {
  try {
    const response = await api.get("/");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGames = async () => {
  try {
    const response = await api.get("/games");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSmartphones = async () => {
  try {
    const response = await api.get("/smartphones");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchComputers = async () => {
  try {
    const response = await api.get("/computers");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findById = async (id: string) => {
  try {
    const response = await api.post(`/find/${id}`);
    return response.data;
  } catch (error) {}
};

export const search = async (query: string) => {
  try {
    const response = await api.post(`/search/${query}`);
    return response.data;
  } catch (error) {}
};
