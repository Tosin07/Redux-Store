import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";

function App() {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  // console.log(isLoggedIn)
  // const cartItems = useSelector((state) => state.cart.itemsList)
  // console.log(cartItems)
  useEffect(() => {
    //Send state as Sending Request
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sending request",
          type: "warning",
        })
      );
      const response = await fetch(
        "https://react-redux-http-d913a-default-rtdb.firebaseio.com/",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      const data = await response.json();
      // send state as Request is successful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent to database successfully",
          type: "success",
        })
      );
    };
    sendRequest().catch((error) => {
      // send state as error
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent to database failed",
          type: "error",
        })
      );
    });
  }, [cart]);

  return (
    <div className="App">
      {notification && (
        <Notification type={notification} message={notification.message} />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
