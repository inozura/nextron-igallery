import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Slide } from "react-awesome-reveal";

import "antd/dist/antd.css";
import "../styles/gallery.css";

// import styles lightgallery
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-medium-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-rotate.css";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {router.route !== "/home" && (
        <Slide
          direction="down"
          triggerOnce
          style={{
            position: "fixed",
            left: "10%",
            right: "10%",
            width: "auto",
            zIndex: 9,
          }}
        >
          <Header />
        </Slide>
      )}

      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
