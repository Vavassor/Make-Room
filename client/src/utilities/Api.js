import axios from "axios";
import Auth from "./Auth";

export default {
  createAccount: function(username, password) {
    const data = {
      username: username.trim(),
      password: password.trim(),
    }
    return axios.post("/api/user", data);
  },

  getSelf: function() {
    const token = Auth.getToken();
    return axios.get(
      "/api/user/self",
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
  },

  logIn: function(username, password) {
    const data = {
      username: username,
      password: password,
    };
    return axios.post("/api/auth/token", data);
  },
};