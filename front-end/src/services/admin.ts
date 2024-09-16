import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchDataLogin = async (name: string, password: string) => {
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        login: name,
        password: password,
      }
    );

    const token = response.data;

    Cookies.set("CinetokAuthToken", token, { secure: false, sameSite: "Lax" });
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

export const saveToDatabase = async (id: string, text: string) => {
  try {
    const response = await api.put(
      `admin/edit/${id}`,
      { text },
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
