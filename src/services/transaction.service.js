import http from "../http-common";

class TransactionDataService {

  create(data) {
    return http.post("/", data);
  }

  getAll() {
    return http.get("/");
  }

  get(id) {
    return http.get(`/${id}`);
  }
 
  update(id, data) {
    return http.put(`/${id}`, data);
  }

  delete(id) {
    return http.delete(`/${id}`);
  }

  deleteAll() {
    return http.delete(`/`);
  }

  findByTitle(title) {
    return http.get(`/?title=${title}`);
  }

  getCategories() {
    return http.get(`/categories`);
  }

}

export default new TransactionDataService();