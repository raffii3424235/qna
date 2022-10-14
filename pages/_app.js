import "../styles/globals.css";
import App from "next/app";
import React from "react";
import { AnimatePresence } from "framer-motion";
import Headers from "../components/Headers";

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <AnimatePresence exitBeforeEnter>
        <Headers />
        <Component {...pageProps} key={router.route} />;
      </AnimatePresence>
    );
  }
}

export default MyApp;
