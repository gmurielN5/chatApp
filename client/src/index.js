import React from "react"
import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import { ContextApp } from "./context"

import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextApp>
        <App />
      </ContextApp>
    </BrowserRouter>
  </React.StrictMode>
)
