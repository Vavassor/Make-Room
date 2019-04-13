class Auth {
  static authenticate(token) {
    localStorage.setItem("jwt", token);
  }

  static isAuthenticated() {
    return localStorage.getItem("jwt") !== null;
  }
}

export default Auth;