import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + '/signup', {
      username: user.username,
      password: user.password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();