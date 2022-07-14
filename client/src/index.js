import React from "react"

import ReactDOM from "react-dom/client"
import { ContextApp } from "./context"

import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ContextApp>
      <App />
    </ContextApp>
  </React.StrictMode>
)
