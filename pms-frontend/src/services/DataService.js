
import http from "../http";

class DataService {
  filterProducts(params) {
    return http.get("/products", {params});
  }

  getAllDepartments() {
    return http.get("/departments");
  }
}

export default new DataService();