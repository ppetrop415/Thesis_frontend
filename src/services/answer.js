import http from "@/api/axios";
import authHeader from "@/api/headers";

const END_POINT = "inspections/answers/";

export default {
  getAll() {
    return http.get(END_POINT, { headers: authHeader() });
  },
  get(id) {
    return http.get(`${END_POINT}${id}/`, {
      headers: authHeader(),
    });
  },
  create(data) {
    return http.post(END_POINT, data, { headers: authHeader() });
  },
};
