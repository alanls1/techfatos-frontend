import axios from "axios";
import Cookies from "js-cookie";
import { fetchDataLogin, api, Logout } from "@/services/admin";

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("js-cookie");
jest.mock("@/services/admin", () => ({
  ...jest.requireActual("@/services/admin"),
  Logout: jest.fn().mockImplementation(() => {
    Cookies.remove("CinetokAuthToken");
  }),
  api: {
    post: jest.fn().mockRejectedValueOnce(new Error("Request failed")),
  },
}));

test("fetchDataLogin should save token to cookies on success", async () => {
  const res = await fetchDataLogin("Admin", "Br@s1ls!@#");

  expect(Cookies.set).toHaveBeenCalledWith("CinetokAuthToken", res, {
    secure: false,
    sameSite: "Lax",
  });
});

test("fetchDataLogin should fail", async () => {
  try {
    await fetchDataLogin("Ad", " ");
  } catch (error) {
    expect(error).toBe("Request failed with status code 401");
  }

  expect(Cookies.set).not.toHaveBeenCalled();
});

test("Logout should remove token ", () => {
  Logout();
  expect(Cookies.remove).toHaveBeenCalledWith("CinetokAuthToken");
});
