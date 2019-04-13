class Auth {
  static authenticate(token) {
    localStorage.setItem("jwt", token);
  }

  static isAuthenticated() {
    return localStorage.getItem("jwt") !== null;
  }

  static logOut() {
    localStorage.removeItem("jwt");
  }
}

export default Auth;