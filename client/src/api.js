import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  console.log("im in the err handler");
  console.error(err);
  if (err.response && err.response.data) {
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  getLoggedInUserSync() {
    return JSON.parse(localStorage.getItem("user"));
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
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout");
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
      .catch(errHandler);
  },

  getTrips() {
    return service
      .get("/trip-create/get-trip")
      .then(res => res.data)
      .catch(errHandler);
  },

  getUserTrips(){
    return service
      .get('/trip-create/get-user-trip')
      .then(res => res.data)
      .catch(errHandler)
  },

  postTrip(data){
    return service
      .post("/trip-create/create-trip", data)
      .then(res => res.data)
      .catch(errHandler);
  },

  getTips(id){
    return service
      .get("/trip-create/get-tip/" + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  postTip(id, data) {
    return service
      .post("/trip-create/create-tip/" + id, data)
      .then(res => res.data)
      .catch(errHandler);
  },

  editTip(id, tipId, data) {
  return service
  .put("/trip-create/create-tip/edit/" + id + "/" + tipId, data)
  .then(res => res.data)
  .catch(errHandler);
  },

  markTipAsDone(tipId, id) {
    return service
    .put("/trip-create/create-tip/done/" + id + "/" + tipId )
    .then(res => res.data)
    .catch(errHandler);
    },

  markTipUndo(tipId, id) {
    return service
    .put("/trip-create/create-tip/undo/" + id + "/" + tipId )
    .then(res => res.data)
    .catch(errHandler);
    },

  deleteTrip(tripId) {
    return service
      .delete("/trip-create/trip-delete/" + tripId)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteTip(tipId){
    return service
    .delete('/trip-create/tip-delete/'+tipId)
    .then(res => res.data)
    .catch(errHandler)
  },

  deleteUser(id){
    return service
    .delete("/users/delete/"+ id)
    .then(res => res.data)
    .catch(errHandler)
  },

  getFriendsTrips(id) {
    return service
      .get("/trip-search/" + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSelectedFriendsTrip(id, friendTripId) {
    return service
      .get("/trip-search/" + id + "/" + friendTripId)
      .then(res => res.data)
      .catch(errHandler);
  },

  addTip(id, friendTripId, newTipId) {
    return service
      .post("/trip-search/" + id + "/" + friendTripId + "/" + newTipId)
      .then(res => res.data)
      .catch(errHandler);
  },

  getTrip(id) {
    return service
      .get("/trip-search/single/" + id)
      .then(res => res.data)
      .catch(errHandler);
  },
  getAllUsers() {
    return service
      .get("/users/all")
      .then(res => res.data)
      .catch(errHandler);
  },
  
  getFollowing() {
    return service
      .get("/users/following")
      .then(res => res.data)
      .catch(errHandler);
  },

  getFollowers() {
    return service
      .get("/users/followers")
      .then(res => res.data)
      .catch(errHandler);
  },

  postFollowStatus(id) {
    return service
      .post(`/users/${id}/follow`)
      .then(res => res.data)
      .catch(errHandler);
  },
  getUser() {
    return service
      .get("/users")
      .then(res => res.data)
      .catch(errHandler);
  }
};
