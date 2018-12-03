import axios from "axios";

const service = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  console.log("im in the err handler")
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        res.data;
      })
      .catch(errHandler);
  },

  login(username, password) {
    console.log("im in the api", username)
    console.log("im in the api", password)
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        console.log("im in the api")
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout");
  },

  getSecret() {
    return service
      .get("/secret")
      .then(res => res.data)
      .catch(errHandler);
  },

  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file);
    return service
      .post("/endpoint/to/add/a/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(errHandler)
  },
  
  getTrips(){
    return service
      .get('/trip-create/get-trip')
      .then(res => res.data)
      .catch(errHandler)
  },

  getUserTrips(){
    return service
      .get('/trip-create/get-user-trip')
      .then(res => res.data)
      .catch(errHandler)
  },

  postTrip(data){
    return service
    .post('/trip-create/create-trip', data)
    .then(res => res.data)
    .catch(errHandler)
  },

  getTips(id){
    return service
    .get('/trip-create/get-tip/'+id)
    .then(res => res.data)
    .catch(errHandler)
  },

  postTip(id, data){
    return service
    .post('/trip-create/create-tip/'+id, data)
    .then(res => res.data)
    .catch(errHandler)
  },

  deleteTrip(id){
    return service
    .delete('/trip-create/trip-delete/'+id)
    .then(res => res.data)
    .catch(errHandler)
  },

  deleteTip(tipId, id){
    return service
    .delete('/trip-create/tip-delete/'+id+ "/" +tipId)
    .then(res => res.data)
    .catch(errHandler)
  },

  getFriendsTrips(id) {
    return service
    .get("/trip-search/" + id)
    .then(res => res.data)
    .catch(errHandler)
  },

  getSelectedFriendsTrip(id, friendTripId) {
    return service
    .get("/trip-search/" + id + "/" + friendTripId)
    .then(res => res.data)
    .catch(errHandler)
  },

  addTip(id, friendTripId, newTipId) {
    return service
    .post("/trip-search/" + id + "/" + friendTripId + "/" + newTipId)
    .then (res => res.data)
    .catch(errHandler)
  },

  getTrip(id) {
    return service
    .get("/trip-search/single/" + id)
    .then (res => res.data)
    .catch(errHandler)
  }

}
