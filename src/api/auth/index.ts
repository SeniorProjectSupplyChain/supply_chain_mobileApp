import { instance as api } from "../axiosConfig";
import { loadDone, loadStart } from "../../redux/features/load";
import { loginFailed, logoutSuccess, setUser } from "../../redux/features/auth";
import { convertPhoneNumberTo84 } from "../../helper/convertPhonenumber";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { NavigationProp } from "@react-navigation/native";

type FormValues = {
  phoneNumber: string;
  password: string;
};

export const loginUser = async (
  user: FormValues,
  dispatch: Dispatch<AnyAction>,
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  dispatch(loadStart());
  try {
    let { phoneNumber, password } = user;
    phoneNumber = convertPhoneNumberTo84(phoneNumber);

    const res = await api.post("/auth/login", { phoneNumber, password });

    if (res?.status === 200) {
      // console.log(res);
      if (!res?.data?.data) {
        dispatch(loginFailed(res.data.message));
      } else {
        dispatch(setUser(res.data.data));
        res.data?.data?.user?.role === "distributor"
          ? navigation.navigate("MainDistributor", {
              screen: "Home",
              initial: false,
            })
          : navigation.navigate("MainRetailer", {
              screen: "Home",
              initial: false,
            });
      }
    }
    dispatch(loadDone());
  } catch (error: any) {
    if (error.response) {
      console.log("Server response error:", error.response.data);
    } else if (error.request) {
      console.log("No response from server:", error.request);
    } else {
      console.log("Error:", error.message);
    }

    dispatch(loadDone());
  }
};

export const logoutUser = async (
  dispatch: Dispatch<AnyAction>,
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  dispatch(loadStart());
  try {
    dispatch(logoutSuccess());

    navigation.navigate("Login");

    dispatch(loadDone());
  } catch (error) {
    dispatch(loadDone());
  }
};
