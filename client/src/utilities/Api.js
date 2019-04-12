import axios from "axios";

export default {
  login: function(username, password) {
    let userpass = btoa(username + ":" + password);
    userpass = userpass.replace("=", "");
    return axios.post(
      "/api/login",
      null,
      {
        headers: {
          "Authorization": `Basic ${userpass}`,
        },
      }
    );
  },
};