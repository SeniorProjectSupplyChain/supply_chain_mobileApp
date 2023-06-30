import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_URL } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const refreshToken = async (refreshToken) => {
//   try {
//     const res = await instance.post("/auth/token/refresh", {
//       refresh: refreshToken
//     });
//     return res.data;
//   } catch (e) {
//     console.error(e.response.data);
//   }
// };

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: "",
  },
});

export const createAPI = (token: string) => {
  const newInstance = axios.create({
    baseURL: API_URL,
  });
  newInstance.interceptors.request.use(
    async (config) => {
      // let date = new Date();
      // const decodedToken = jwt_decode(user?.tokens.access);
      // if (decodedToken.exp < date.getTime() / 1000) {
      //   const data = await refreshToken(user?.tokens.refresh);
      //   console.log("refreshToken", data);
      //   const refreshUser = data.access;
      //   dispatch(loginUpdate(refreshUser));
      //   // console.log('refreshUser',refreshUser);
      //   config.headers["Authorization"] = "Bearer " + data.access;
      // }
      config.headers["Authorization"] = "Bearer " + token;

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};

// export const createAxios = (user, dispatch, loginUpdate) => {
//   const newInstance = axios.create({
//     baseURL: API_URL,
//   });
//   newInstance.interceptors.request.use(
//     async (config) => {
//       let date = new Date();
//       const decodedToken = jwt_decode(user?.tokens.access);
//       if (decodedToken.exp < date.getTime() / 1000) {
//         const data = await refreshToken(user?.tokens.refresh);
//         console.log("refreshToken", data);
//         const refreshUser = data.access;
//         dispatch(loginUpdate(refreshUser));
//         // console.log('refreshUser',refreshUser);
//         config.headers["Authorization"] = "Bearer " + data.access;
//       }
//       return config;
//     },
//     (err) => {
//       return Promise.reject(err);
//     }
//   );
//   return newInstance;
// };
