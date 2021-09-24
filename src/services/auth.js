import http from "../api/axios";
// import logoutHeader from "@/api/headersLogout";
// import authHeader from "@/api/headers";

const END_POINT = "auth/";

export default {
  login(data) {
    return http.post(`${END_POINT}login/`, data);
  },
  register(data) {
    return http.post(`${END_POINT}register/`, data);
  },
};
