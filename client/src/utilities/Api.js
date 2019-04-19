import axios from "axios";
import Auth from "./Auth";

export default {
  createEvent: function(event) {
    const token = Auth.getToken();
    return axios.post(
      "/api/event",
      event,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
  },

  createAccount: function(username, password) {
    const data = {
      username: username.trim(),
      password: password.trim(),
    };
    return axios.post("/api/user", data);
  },

  getEventById: function(id) {
    return axios.get(`/api/event/${id}`);
  },

  getEvents: function(options) {
    let queryUrl = "/api/event";

    if (options) {
      const searchParams = new URLSearchParams();

      if (options.orderBy) {
        searchParams.append("order_by", options.orderBy);
      }
      if (options.afterTime) {
        searchParams.append("after_time", options.afterTime);
      }

      queryUrl += "?" + searchParams;
    }
    
    return axios.get(queryUrl);
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
    return axios.get("/api/portfolio/info/" + userId)
  },

  updatePorfolioInfo: function(userId, portfolioInfo){
    let url = "/api/portfolio/info" + userId
    return axios.patch(url, portfolioInfo);
  },

  updatePortfolioItem: function(userId, portfolioItem){
    let url = "/api/portfolio/item" + userId
    return axios.patch(url, portfolioItem);
  },

  getUserInfoById: function(userId){
    let url = "/api/profile/" + userId;
    return axios.get(url)
  },

  updateUserProfile: function(userId, userInfo){
    return axios.patch("/api/profile/" + userId, userInfo)
  }

};