import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Layout, message, Typography } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgRotate from "lightgallery/plugins/rotate";

const { Content } = Layout;
import { querySqlite } from "../helpers/ipcrenderer";
import ModalTambah from "../components/ModalTambah";
import { imageGallery } from "../types/gallery";

function Home() {
  const [openModalTambah, setOpenModalTambah] = React.useState(false);
  const [images, setImages] = React.useState<null | Array<imageGallery>>(null);
  const [isLoadingFetchData, setIsLoadingFetchData] =
    React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoadingFetchData(true);

    await querySqlite({ status: "get" })
      .then((res: Array<imageGallery>) => {
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

      <Content style={{ padding: "90px 48px 0px 48px" }}>
        {/* <Typography.Title title="Gallery" style={{ textAlign: "right" }}>
          Home
        </Typography.Title> */}
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom, lgFullscreen, lgRotate]}
          fullScreen={true}
          thumbnail={true}
          mode="lg-fade"
          elementClassNames="element-gallery"
        >
          {images?.map((image) => (
            <a href={image.uri}>
              <img className="img-fluid" src={image.uri} alt={image.title} />
            </a>
          ))}
        </LightGallery>
      </Content>

      <Button
        type="primary"
        size="large"
        style={{ position: "fixed", bottom: 30, right: 30, borderRadius: 20 }}
        onClick={() => setOpenModalTambah(true)}
      >
        {"+ "} Tambah Data
      </Button>

      {/* modal tambah */}
      <ModalTambah open={openModalTambah} setOpen={setOpenModalTambah} />
    </React.Fragment>
  );
}

export default Home;
