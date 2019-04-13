class Auth {
  static authenticate(token) {
    localStorage.setItem("jwt", token);
  }

  static getToken() {
    return localStorage.getItem("jwt");
  }

  static isAuthenticated() {
    return localStorage.getItem("jwt") !== null;
  }

  static logOut() {
    localStorage.removeItem("jwt");
  }
}

export default Auth;