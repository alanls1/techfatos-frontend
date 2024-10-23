import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/",
});

export const fetchDataLogin = async (name: string, password: string) => {
  try {
    const response = await api.post(`auth/login`, {
      login: name,
      password: password,
    });

    const token = response.data;

    Cookies.set("CinetokAuthToken", token, { secure: false, sameSite: "Lax" });
    return token;
  } catch (err: any) {
    throw (
      err?.reponse?.data.error || err?.message || "An unknown error occurred"
    );
  }
};

export const Logout = () => {
  Cookies.remove("CinetokAuthToken");
  window.location.reload();
};

export const fetchDelete = async (id: number) => {
  try {
    const response = await api.delete(`admin/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("CinetokAuthToken")}`,
      },
    });
    return response.status;
  } catch (error: any) {
    throw error;
  }
};

export const saveToDatabase = async (
  id: string,
  text: string,
  fullTextList: string,
  fullTitleList: string
) => {
  try {
    const response = await api.put(
      `admin/edit/${id}`,
      { text, fullTextList, fullTitleList },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("CinetokAuthToken")}`,
        },
      }
    );

    return response.status;
  } catch (error: any) {
    throw error;
  }
};

export const addNews = async () => {
  try {
    const response = await api.get("admin/add", {
      headers: {
        Authorization: `Bearer ${Cookies.get("CinetokAuthToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAddManualy = async (formData: {
  title: string;
  urlContent: string;
  urlImage: string;
  content: string;
  list: string;
  titleSecond: string;
}) => {
  try {
    const response = await api.post("admin/newPost", formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("CinetokAuthToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
