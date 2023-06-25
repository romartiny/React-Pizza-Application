import React from "react";

import Header from "./components/Header";

import "./scss/app.scss";
import { Home } from "./Pages/Home";
import {Route, Routes} from "react-router-dom";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
