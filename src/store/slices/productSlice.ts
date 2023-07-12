import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/interfaces";
import axios from "axios";
import appBaseConfig from "../../config/appConfig";
import { EditedProductKey } from "../../contexts/editDetailsContext";

interface IProductSlice {
  loading: boolean;
  product: IProduct;
  error: string;
}

const initialState: IProductSlice = {
  loading: false,
  product: {
    id: 0,
    name: "",
    description: "",
    picture: "",
    type: {
      id: 1,
      name: "",
    },
    categories: [],
    investmentEffort: "",
    trl: {
      id: 1,
      name: "",
    },
    video: "",
    user: {
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      sex: 0,
      profilePicture: "",
      position: "",
    },
    company: {
      name: "",
      logo: "",
      address: {
        country: {
          name: "",
        },
        city: {
          name: "",
        },
        street: "",
        house: "",
        zipCode: "",
        longitude: "",
        latitude: "",
      },
    },
    businessModels: [],
  },
  error: "",
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const abrtctrlr = new AbortController();
    return axios
      .get<IProduct>(appBaseConfig.endpoints.getProduct, {
        signal: abrtctrlr.signal,
      })
      .then((res) => res.data);
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<IProduct>) => {
      state.product = action.payload;
    },
    editProduct: (state, action: PayloadAction<Partial<IProduct>>) => {
      const keys = Object.keys(action.payload) as EditedProductKey[];

      for (const key of keys) {
        switch (key) {
          case "name":
          case "description":
          case "video":
          case "investmentEffort":
            state.product[key] = action.payload[key]!;
            break;
          case "trl":
            state.product[key] = action.payload[key]!;
            break;
          case "businessModels":
          case "categories":
            state.product[key] = [
              ...state.product[key],
              ...action.payload[key]!,
            ];
            break;
          default:
            break;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.product = initialState.product;
      state.error = action.error.message || "Error encountered!";
    });
  },
});

export default productSlice;
