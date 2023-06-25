import React from "react";

import Header from "./components/Header";

import "./scss/app.scss";
import { Home } from "./Pages/Home";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          {/*<Home/>*/}
          <NotFound/>
        </div>
      </div>
    </div>
  );
}

export default App;
