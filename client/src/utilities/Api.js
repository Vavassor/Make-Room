import axios from "axios";

export default {
  logIn: function(username, password) {
    const data = {
      username: username,
      password: password,
    };
    return axios.post("/api/auth/token", data);
  }
};