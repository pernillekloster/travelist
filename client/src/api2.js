import axios from "axios";

const service = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/api" : "http:/localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  getUser(){
    return service
    .get('/users')
    .then(res => res.data)
    .catch(errHandler)
  },

/*   getAllUsers(){
    return service
    .get('/users/all')
    .then(res => 
      res.data)
      .catch(errHandler)
  }, */

  getFollowing(){
    return service
    .get('/users/following')
    .then(res => res.data)
    .catch(errHandler)
  },

  getFollowers(){
    return service
    .get('/users/followers')
    .then(res => res.data)
    .catch(errHandler)
  },

  postFollowStatus(){
    return service
    .post('/users/:id/follow')
    .then()
  }
 
}
