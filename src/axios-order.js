import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-e290b.firebaseio.com/",
});

export default instance;
