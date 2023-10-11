import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import rootReducer from "./components/Reducers";
import { configureStore } from "@reduxjs/toolkit";
import toast, { Toaster } from 'react-hot-toast';
import Irctc from "./components/common/Irctc";
import Loading from "./components/common/Loading";



const store=configureStore({
  reducer:rootReducer,
})



const RootComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if it's the initial load or a reload
    const isReload = sessionStorage.getItem("isReloaded");

    if (isReload) {
      // If it's a reload, disable the loader immediately
      setIsLoading(false);
    } else {
      // If it's the initial load, set a flag in sessionStorage and show the loader
      sessionStorage.setItem("isReloaded", "true");

      // Simulate an async operation (e.g., loading data)
      setTimeout(() => {
        setIsLoading(false); // Set isLoading to false when done loading
      }, 2000); // Simulate a 2-second loading time (replace with your actual loading logic)
    }
  }, []);

 
  return (
    <React.StrictMode>
      {isLoading ? (
        <div >
        <Irctc  /> 
        </div>
      ) : (
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <Toaster />
            <ToastContainer />
          </BrowserRouter>
        </Provider>
      )}
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);


