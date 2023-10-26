import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { CollectionsProvider } from "./contexts/collections.context.jsx";
import { RecordsProvider } from "./contexts/records.context.jsx";
import { UserProvider } from "./contexts/user.context.jsx";
import App from "./App.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CollectionsProvider>
          <RecordsProvider>
            <App />
          </RecordsProvider>
        </CollectionsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
