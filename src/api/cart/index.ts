import { createAPI } from "../axiosConfig";
import { loadDone, loadStart } from "../../redux/features/load";
import { ProductIdItem } from "../../types/models";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export const getCart = async (token: string, dispatch: Dispatch<AnyAction>) => {
  try {
    const api = createAPI(token);
    const res = await api.get(`/retailer/cart/view`);

    if (res.status === 200) {
      return res?.data?.data;
    }
  } catch (error: any) {
    if (error.response) {
      console.log("Server response error:", error.response.data);
    } else if (error.request) {
      console.log("No response from server:", error.request);
    } else {
      console.log("Error:", error.message);
    }

    // dispatch(loadDone());
  }
};

export const getLenghtCart = async (
  setLenghtCart: any,
  token: string,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    const api = createAPI(token);
    const res = await api.get(`/retailer/cart/view`);

    if (res.status === 200) {
      setLenghtCart(res?.data?.data?.length);
      return res?.data?.data?.length;
    }
  } catch (error: any) {
    if (error.response) {
      console.log("Server response error:", error.response.data);
    } else if (error.request) {
      console.log("No response from server:", error.request);
    } else {
      console.log("Error:", error.message);
    }

    // dispatch(loadDone());
  }
};

export const deleteProductInCart = async (
  token: string,
  dispatch: Dispatch<AnyAction>,
  product: ProductIdItem
) => {
  try {
    const api = createAPI(token);
    const res = await api.patch(`/retailer/cart/delete-product`, { product });

    if (res.status === 200) {
      return res?.data?.data;
    }
  } catch (error: any) {
    if (error.response) {
      console.log("delete Server response error:", error.response.data);
    } else if (error.request) {
      console.log("No response from server:", error.request);
    } else {
      console.log("Error:", error.message);
    }

    // dispatch(loadDone());
  }
};

export const addProductToCart = async (
  token: string,
  dispatch: Dispatch<AnyAction>,
  product: ProductIdItem
) => {
  try {
    const api = createAPI(token);
    const res = await api.patch(`/retailer/cart/add`, { product });

    if (res.status === 200) {
      return res?.data?.data;
    }
  } catch (error: any) {
    if (error.response) {
      console.log("delete Server response error:", error.response.data);
    } else if (error.request) {
      console.log("No response from server:", error.request);
    } else {
      console.log("Error:", error.message);
    }

    // dispatch(loadDone());
  }
};

export const deleteCart = async (
  token: string,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    const api = createAPI(token);
    const res = await api.patch(`/retailer/cart/delete`);

    if (res.status === 200) {
      return res?.data?.data;
    }
  } catch (error: any) {
    if (error.response) {
      console.log("delete Server response error:", error.response.data);
    } else if (error.request) {
      console.log("No response from server:", error.request);
    } else {
      console.log("Error:", error.message);
    }

    // dispatch(loadDone());
  }
};
