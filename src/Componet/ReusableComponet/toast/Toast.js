import { ToastContainer, toast } from "react-toastify";
export const Toastsucess = (message, success,theme) => {
  if (success) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // theme: "light",
      theme:theme,
    });
  } else {
    toast.error(message, {
      position: "top-right",
      
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
