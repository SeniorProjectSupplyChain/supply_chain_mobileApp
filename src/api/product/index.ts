import { createAPI } from "../axiosConfig";
import { loadDone, loadStart } from "../../redux/features/load";
import { ProductCommercial } from "../../types/models";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export const getProductById = async (
  id: string,
  token: string,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    const api = createAPI(token);
    // console.log(id);

    const res = await api.get(`/product/${id}/`);

    if (res.status === 200) {
      // console.log(res?.data);

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

export const getProductCommercialById = async (
  id: string,
  token: string,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    const api = createAPI(token);

    const res = await api.get(`/product-commercial/${id}/`);

    if (res.status === 200) {
      const productCommercial = res?.data?.data as ProductCommercial;
      const res_product = await api.get(
        `/product/${productCommercial.productId}/`
      );
      const response = {
        ...productCommercial,
        amount: res_product.data.data.amount,
      };

      return response;
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

export const getAllProducts = async (
  token: string,
  dispatch: Dispatch<AnyAction>
) => {
  // dispatch(loadStart());
  try {
    const api = createAPI(token);
    const res = await api.get("/product/all");

    if (res.status === 200) {
      // dispatch(loadDone());
      return res.data.data;
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

export const getProductsPopular = async (
  token: string,
  dispatch: Dispatch<AnyAction>
) => {
  // dispatch(loadStart());
  try {
    const api = createAPI(token);
    const res = await api.get("/retailer/product/popular-ordered");

    if (res.status === 200) {
      // dispatch(loadDone());
      if (res.data.data.length < 3) {
        const res_product = await api.get("/retailer/product/manufactured");
        return res_product.data.data;
      }
      return res.data.data;
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

export const getProductsManufactured = async (
  token: string,
  dispatch: Dispatch<AnyAction>
) => {
  // dispatch(loadStart());
  try {
    const api = createAPI(token);
    const res = await api.get("/retailer/product/manufactured");

    if (res.status === 200) {
      // dispatch(loadDone());
      return res.data.data;
    }
  } catch (error: any) {
    if (error.response) {
      console.log("Server response error:", error.response.data);
    } else if (error.request) {
      console.log("No response from server:", error.request);
    } else {
      console.log("Error:", error.message);
    }
  }
};
