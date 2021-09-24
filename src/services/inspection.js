import http from "@/api/axios";
import authHeader from "../api/headers";

const END_POINT = "inspections/";

export default {
  getAll() {
    return http.get(`${END_POINT}completed/`, {
      headers: authHeader(),
    });
  },
  getAllPaginated(page, query) {
    return http.get(`${END_POINT}completed/?page=${page}&search=${query}`, {
      headers: authHeader(),
    });
  },
  get(uuid) {
    return http.get(`${END_POINT}completed/${uuid}/`, {
      headers: authHeader(),
    });
  },
  inspectionCreate(data) {
    return http.post(END_POINT, data, {
      headers: authHeader(),
    });
  },
  answerCreate(data) {
    return http.post(`${END_POINT}answers/`, data, {
      headers: authHeader(),
    });
  },
  inspectionComplete(data) {
    return http.post(`${END_POINT}complete/`, data, {
      headers: authHeader(),
    });
  },
  update(id, data) {
    return http.put(`${END_POINT}${id}`, data, {
      headers: authHeader(),
    });
  },
  findByVat(vat) {
    return http.get(`${END_POINT}completed/?search=${vat}`, {
      headers: authHeader(),
    });
  },
};
