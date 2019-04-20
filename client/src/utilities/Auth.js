export default {
  authenticate: function(token) {
    localStorage.setItem("jwt", token);
  },

  getToken: function() {
    return localStorage.getItem("jwt");
  },

  isAuthenticated: function() {
    return localStorage.getItem("jwt") !== null;
  },

  logOut: function() {
    localStorage.removeItem("jwt");
  },
};