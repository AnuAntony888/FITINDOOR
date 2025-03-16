import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AuthProvider } from "./Context/AuthContext";
import { FilterContextProvider } from "./Context/Filter_context_section";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { PopupProvider } from "./Context/PopupContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { MetaComponent } from "./Icons/Icons";
import ReactGA4 from "react-ga4";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const measurementID = "G-4FNKL8CC3P";

// ReactGA4.initialize(measurementID);
ReactGA4.initialize(measurementID, { debug: true });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GoogleOAuthProvider clientId="756474276985-7muekmupvouma61cie0n0jtpp7v9j8p5.apps.googleusercontent.com">
        <FilterContextProvider>
          <Provider store={store}>
 
            <PopupProvider>
              <MetaComponent />
              <App />
              </PopupProvider>
        
          </Provider>
        </FilterContextProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

serviceWorkerRegistration.register();

reportWebVitals();
