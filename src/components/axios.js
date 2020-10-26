import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-e-commerce-6011b.cloudfunctions.net/api", // API Cloud function URL
});

// local server api "http://localhost:5001/e-commerce-6011b/us-central1/api"
// firebase emulators:start
// need to complete following tasks
// only deploy backend cmd firebase deploy --only functions
// then chacge to blaze upgrade to blaze
// after blaze click on link in terminal
// it moves you to firebase click on firebase fuction click on link put in axios baseUrl
// then npm run build for frontend
// firebase deploy --only hosting  - is frontend
// OR npm run build && firebase deploy --only hosting
// reactflipmove

export default instance;
