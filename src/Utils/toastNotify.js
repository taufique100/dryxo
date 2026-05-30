import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successNotify = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000, // close after 3s
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    // theme: "colored",
  });
};

export const errorNotify = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    // theme: "colored",
  });
};

export const warningNotify = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    // theme: "colored",
  });
};
