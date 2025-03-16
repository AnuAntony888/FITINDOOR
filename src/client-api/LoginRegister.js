import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import CryptoJS from "crypto-js";
import { API } from "./APIcategory";
//  const API = "https://admin.myfamilyfitness.com/api/v1";
 //const API = "https://admin.mydemostore.site/api/v1";
export function useRegister() {
  const registerHandler = async (params) => {
    const res = await axios.post(`${API}/register`, params);

    return res.data;
  };

  const {
    mutateAsync: register,
    isLoading,
    error,
  } = useMutation(registerHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        throw new Error(data.errorMessage?.email[0]);
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { register, isLoading, error };
}

export function useLogin() {
  const loginHandler = async (params) => {
    const res = await axios.post(`${API}/user/login`, params);

    return res.data;
  };

  const {
    mutateAsync: login,
    isLoading,
    error,
  } = useMutation(loginHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        throw new Error(data.errorMessage?.email[0]);
      }
      localStorage.setItem("user", JSON.stringify(data?.data));
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { login, isLoading, error };
}

//changepassword
const user = localStorage.getItem("user");

export function useNewPassword() {
  const passwordHandler = async (params) => {
    const res = await axios.post(`${API}/user/changepassword`, params, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        Authorization: `Bearer ${params.token}`,
      },
    });

    return res.data;
  };

  const {
    mutateAsync: changepassword,
    isLoading,
    error,
  } = useMutation(passwordHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        throw new Error(data.errorMessage?.password[0]);
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { changepassword, isLoading, error };
}

//update contact number

export function usePhone(getuserdata) {
  const QueryClient = useQueryClient();
  const phoneHandler = async (params) => {
    const res = await axios.post(`${API}/user/updateMobile`, params, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });

    return res.data;
  };

  const {
    mutateAsync: phonenumber,
    isLoading,
    error,
  } = useMutation(phoneHandler, {
    onSuccess: (data) => {
      QueryClient.invalidateQueries("profile");
      // if (data.statusCode === 401) {
      //   throw new Error(data.errorMessage?.phone[0]);
      // }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { phonenumber, isLoading, error };
}

export function useLogout() {
  const logoutHandler = async (params) => {
    const res = await axios.post(`${API}/user/logout`, params);

    return res.data;
  };

  const {
    mutateAsync: logout,
    isLoading,
    error,
  } = useMutation(logoutHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        throw new Error("Something went wrong");
      }
      localStorage.removeItem("user");
      window.location.href = "/";
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { logout, isLoading, error };
}

//subscription

export function useSubscription() {
  const SubscriptionHandler = async (params) => {
    const res = await axios.post(`${API}/subscribe`, params, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return res.data.data;
  };

  const {
    mutateAsync: subscription,
    isLoading,
    error,
  } = useMutation(SubscriptionHandler, {
    onSuccess: (data) => {
      // if (data.statusCode === 401) {
      //   throw new Error(data.errorMessage?.phone[0]);
      // }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { subscription, isLoading, error };
}

//productreview

export function useProductreView() {
  const ProductreViewHandler = async (params) => {
    const res = await axios.post(`${API}/productreview`, params, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });

    return res.data.data;
  };

  const {
    mutateAsync: productreview,
    isLoading,
    error,
  } = useMutation(ProductreViewHandler, {
    onSuccess: (data) => {
      // if (data.statusCode === 401) {
      //   throw new Error(data.errorMessage?.phone[0]);
      // }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { productreview, isLoading, error };
}

//Login with google
export function useGoogleLogins() {
  const GoogleLoginHandler = async (params) => {
    const res = await axios.post(`${API}/user/googlelogin`, params);
    console.log(res, "response of google");
    return res.data;
  };

  const {
    mutateAsync: googlelogin,
    isLoading,
    error,
  } = useMutation(GoogleLoginHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        throw new Error(data.errorMessage?.email[0]);
      }

      localStorage.setItem("user", JSON.stringify(data.data));
      // console.log(user, "user data");
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { googlelogin, isLoading, error };
}

//Login with Facebook
export function useFacebookLogin() {
  const FacebookLoginHandler = async (params) => {
    const res = await axios.post(`${API}/user/fblogin`, params);

    return res.data;
  };

  const {
    mutateAsync: fblogin,
    isLoading,
    error,
  } = useMutation(FacebookLoginHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        // console.log(data.errorMessage?.email[0],"hai hello how are you");
        throw new Error(data.errorMessage?.email[0]);
      }
      localStorage.setItem("user", JSON.stringify(data?.data));
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { fblogin, isLoading, error };
}
//forgetpassword
export function useForgetPassword() {
  const ForgetPasswordHandler = async (params) => {
    const res = await axios.post(`${API}/forget-password`, params);

    return res.data;
  };

  const {
    mutateAsync: forgetpassword,
    isLoading,
    error,
  } = useMutation(ForgetPasswordHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        console.log("hai hello how are you");
        throw new Error(data.errorMessage?.email[0]);
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { forgetpassword, isLoading, error };
}

//forgetchangepassword

export function useForgetChangepassword() {
  const forgetChangepasswordHandler = async (params) => {
    const res = await axios.post(`${API}/reset-password`, params);

    return res.data;
  };

  const {
    mutateAsync: resetpassword,
    isLoading,
    error,
  } = useMutation(forgetChangepasswordHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        console.log("hai hello how are you");
        throw new Error(data.errorMessage?.email[0]);
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { resetpassword, isLoading, error };
}
