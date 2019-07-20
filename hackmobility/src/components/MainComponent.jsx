import React, { Component } from "react";
import Header from "./Header";
import MapArea from "./MapArea";
import Analytics from "./Analytics";
import Footer from "./Footer";

class MainComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <MapArea />
        <Analytics />
        <Footer />
      </div>
    );
  }
}

export default MainComponent;
