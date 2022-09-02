import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout, message } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";

const { Content } = Layout;
import { querySqlite } from "../helpers/ipcrenderer";

function Home() {
  const [images, setImages] = React.useState<null | Array<Object>>(null);
  const [isLoadingFetchData, setIsLoadingFetchData] =
    React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoadingFetchData(true);

    await querySqlite({ status: "get" })
      .then((res: Array<Object>) => {
        setImages(res);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  return (
    <React.Fragment>
      <Head>
        <title>Home Gallery</title>
      </Head>

      <Content style={{ padding: 48 }}>
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom, lgFullscreen]}
          fullScreen={true}
          thumbnail={true}
          mode="lg-fade"
          elementClassNames="element-gallery"
        >
          <a href="images/logo.png">
            <img className="img-fluid" src="images/logo.png" alt="thumbs" />
          </a>
          <a href="images/logo.png">
            <img className="img-fluid" src="images/logo.png" alt="thumbs" />
          </a>
          <a href="images/logo.png">
            <img className="img-fluid" src="images/logo.png" alt="thumbs" />
          </a>
          <a href="images/logo.png">
            <img className="img-fluid" src="images/logo.png" alt="thumbs" />
          </a>
          <a href="images/Post IG KKN (1).png">
            <img
              className="img-fluid"
              src="images/Post IG KKN (1).png"
              alt="thumbs"
            />
          </a>
          <a href="images/Post IG KKN (2).png">
            <img className="img-fluid" src="images/logo.png" alt="thumbs" />
          </a>
          <a href="images/logo.png">
            <img
              className="img-fluid"
              src="images/Post IG KKN (1).png"
              alt="thumbs"
            />
          </a>
        </LightGallery>
      </Content>
    </React.Fragment>
  );
}

export default Home;
