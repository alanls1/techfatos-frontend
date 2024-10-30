import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchNews = async (page: number) => {
  try {
    const response = await api.get("/", {
      params: {
        page: page,
      },
    });
    return response?.data?.findAllItens;
  } catch (error) {
    throw error;
  }
};

export const fetchGames = async (page: number) => {
  try {
    const response = await api.get("/games", {
      params: {
        page: page,
      },
    });

    return response?.data?.findGames;
  } catch (error) {
    throw error;
  }
};

export const fetchSmartphones = async (page: number) => {
  try {
    const response = await api.get("/smartphones", {
      params: {
        page: page,
      },
    });

    return response?.data?.findSmartphones;
  } catch (error) {
    throw error;
  }
};

export const fetchComputers = async (page: number) => {
  try {
    const response = await api.get(`/computers`, {
      params: {
        page: page,
      },
    });

    return response?.data?.findComputers;
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
