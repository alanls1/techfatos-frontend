// import axios from "axios";
// import Cookies from "js-cookie";
// import { fetchDataLogin } from "@/services/admin";

// jest.mock("axios");
// jest.mock("js-cookie");

// const mockedAxios = axios as jest.Mocked<typeof axios>;

// test("fetchDataLogin should save token to cookies on success", async () => {
//   mockedAxios.post.mockResolvedValue({ data: { token: "fakeToken" } });
//   await fetchDataLogin("Admin", "Br@s1ls!@#");
//   expect(Cookies.set).toHaveBeenCalledWith("CinetokAuthToken", "fakeToken", {
//     secure: false,
//     sameSite: "Lax",
//   });
// });

// test("fetchDataLogin should handle errors", async () => {
//   mockedAxios.post.mockRejectedValue({
//     response: { data: { error: "Login failed" } },
//   });
//   await expect(fetchDataLogin("user", "wrongPass")).rejects.toThrow(
//     "Login failed"
//   );
// });
