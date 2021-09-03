import React, { createContext, useEffect, useReducer } from "react";
import { getWeatherApi } from "../apis/WeatherApi";
import Reducers from "../reducers/Reducers";
import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from "./Action.types";

export const Ctx = createContext(null);

const ContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(Reducers, {
    isLoading: false,
    data: [],
    error: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({
          type: FETCH_DATA_REQUEST,
        });
        const { data } = await getWeatherApi();
        if (data) {
          dispatch({
            type: FETCH_DATA_SUCCESS,
            payload: data,
          });
        }
      } catch (error) {
        dispatch({
          type: FETCH_DATA_FAILURE,
          payload: error.response.data,
        });
      }
    };
    fetchData();
  }, []);
  const value = {
    data,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
export default ContextProvider;
