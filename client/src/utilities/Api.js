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


  // profile routes
  getProfilePortfolioById: function(userId){
    return axios.get("/api/portfolio/" + userId)
  },

  getUserInfoById: function(userId){
    // let url = "api/profile/" + userId
    let url = "api/profile/5cb36af71767bf1ef77a128a"
    console.log(url);
    return axios.get(url)
  },

  updateUserProfile: function(userId, userInfo){
    return axios.patch("/api/profile/" + userId, userInfo)
  }

};