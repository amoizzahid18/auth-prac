import { toast } from "react-toastify";

export const handleSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
  });
};

export const handleRedirection = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
  });
};

export const handleLogout = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 2000,
  });
};

export const handleError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
  });
};
