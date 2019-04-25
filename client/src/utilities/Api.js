import axios from "axios";
import Auth from "./Auth";

export default {
  attendEvent: function(event) {
    const token = Auth.getToken();
    return axios.post(
      `/api/event/${event._id}/attendee`,
      {},
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
  },

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

  stopAttendingEvent: function(event) {
    const token = Auth.getToken();
    return axios.delete(
      `/api/event/${event._id}/attendee`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
  },

  updateEvent: function(event) {
    const token = Auth.getToken();
    return axios.post(
      `/api/event/${event._id}`,
      event,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
  },

  // profile routes
  // profile routes
  // profile routes
  
  getUserInfoById: function(userId){
    let url = "/api/profile/info/" + userId;
    return axios.get(url)
  },
  
  updateUserProfile: function(userId, userInfo){
    return axios.patch("/api/profile/info/" + userId, userInfo)
  },

  getUserEvents: function(userId){
    console.log("getting user info")
    return axios.get("/api/profile/events/" + userId)
  },
  
  // portfolio routes
  // portfolio routes
  // portfolio routes

  getProfilePortfolioById: function(userId){
    return axios.get("/api/portfolio/info/" + userId)
  },

  updatePorfolioInfo: function(userId, portfolioInfo){
    let url = "/api/portfolio/info/" + userId
    return axios.patch(url, portfolioInfo);
  },

  addPortfolioItem: function (userId){
    let url = '/api/portfolio/item/' + userId
    return axios.post(url);
  },

  deletePortfolioItem: function (userId, itemId){
    let url = `/api/portfolio/item/${userId}/${itemId}`
    return axios.delete(url);
  },

  updatePortfolioItem: function(userId, portfolioItem, updateProgress) {
    let url = "/api/portfolio/item/" + userId;
    const data = new FormData();
    if (portfolioItem._id) {
      data.set("_id", portfolioItem._id);
    }
    if (portfolioItem.title) {
      data.set("title", portfolioItem.title);
    }
    if (portfolioItem.about) {
      data.set("about", portfolioItem.about);
    }
    if (portfolioItem.order) {
      data.set("order", portfolioItem.order);
    }
    if (portfolioItem.url) {
      data.set("url", portfolioItem.url);
    }
    if (portfolioItem.file) {
      data.set("file", portfolioItem.file);
    }
    return axios.patch(url, data, {onUploadProgress: updateProgress});
  },
};