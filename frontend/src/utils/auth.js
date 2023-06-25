import Cookies from 'js-cookie';

const auth = {
  isAuthenticated: false,

  login(username, password) {
    // Simulate login logic
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      Cookies.set('jwt', 'your_jwt_token_here');
    } else {
      this.isAuthenticated = false;
    }
  },

  logout() {
    this.isAuthenticated = false;
    Cookies.remove('jwt');
  },

  checkAuth() {
    console.log("checkAuth");
    const jwt = Cookies.get('jwt');
    console.log(jwt);
    // Check if JWT cookie exists and has not expired
    if (jwt) {
      // Additional check to validate JWT expiration if needed
      // const decodedJwt = decodeJWT(jwt);
      // const currentTime = Date.now() / 1000;
      // if (decodedJwt.exp > currentTime) {
      this.isAuthenticated = true;
      // }
    } else {
      this.isAuthenticated = false;
    }
  },

  getAuthStatus() {
    this.checkAuth();
    return this.isAuthenticated;
  },
};

export default auth;
