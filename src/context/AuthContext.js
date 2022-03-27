import createDataContext from "./createDataContext";
import TrackerApi from "../api/Tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => {
  return async () => {
    try {
      //get the stored token
      const token = await AsyncStorage.getItem("token");
      //the token has been successfully gotten, then dispatch the sign action and update state
      if (token) {
        dispatch({ type: "signin", type: token });
        //then navigate to mainFlow
        navigate("TrackList");
      }
      
      if (!token) {
        navigate("Signup");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

const clearErrorMessage = (dispatch) => {
  return () => dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    //make api request to sign up with that email and password
    try {
      const response = await TrackerApi.post("/signup", { email, password });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      //if we sign up, modify our state, and say that we are authenticated
      dispatch({ type: "signup", payload: response.data.token });
      //navigate to main flow
      navigate("TrackList");
    } catch (err) {
      //if signing up fails, we need to reflect an error message some where
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign the up",
      });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    //Try to sign in
    try {
      const response = await TrackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      //Handle success by updating state
      dispatch({ type: "signin", payload: response.data.token });
      //navigate to mainFlow
      navigate("TrackList");
    } catch (err) {
      //Handle failure by showing error message(somewhere)
      dispatch({
        type: "add_error",
        payload: "something went wrong with sign in",
      });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    try {
      //remove the stored token
      await AsyncStorage.removeItem("token");
      //then signout
      dispatch({ type: "signout" });
      //then navigate to loginFlow
      navigate("loginFlow");
    } catch (err) {
      //handle any error during signout
      console.log(err.message);
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, clearErrorMessage, tryLocalSignin, signout },
  { token: null, errorMessage: "" }
);
