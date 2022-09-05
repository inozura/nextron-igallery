import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Layout, message, Input, Empty } from "antd";
import { Fade, Slide } from "react-awesome-reveal";

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgZoomMedium from "lightgallery/plugins/mediumZoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgRotate from "lightgallery/plugins/rotate";

const { Content } = Layout;
import { querySqlite } from "../helpers/ipcrenderer";
import ModalTambah from "../components/ModalTambah";
import { imageGallery } from "../types/gallery";

function Home() {
  const [openModalTambah, setOpenModalTambah] = React.useState(false);
  const [images, setImages] = React.useState<null | Array<imageGallery>>(null);
  const [isLoadingSearch, setIsLoadingSearch] = React.useState<boolean>(false);
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

  const handleSearchData = async (title: string) => {
    setIsLoadingSearch(true);
    setTimeout(async () => {
      try {
        await querySqlite({ status: "find", title }).then(
          (res: Array<imageGallery>) => setImages(res)
        );
      } catch (error) {
        message.error(error);
      }
      setIsLoadingSearch(false);
    }, 1500);
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input.Search
            placeholder="input search text"
            enterButton="Cari"
            size="large"
            width={200}
            style={{ maxWidth: 500, margin: "20px 0" }}
            loading={isLoadingSearch}
            onSearch={handleSearchData}
          />
        </div>
        {images?.length === 0 ? (
          <Empty />
        ) : (
          <LightGallery
            speed={500}
            plugins={[
              lgThumbnail,
              lgZoom,
              lgFullscreen,
              lgRotate,
              // lgZoomMedium,
            ]}
            fullScreen={true}
            thumbnail={true}
            zoom={true}
            mode="lg-fade"
            elementClassNames="element-gallery"
          >
            {images?.map((image) => (
              <a href={image.uri} key={image.title}>
                <Fade>
                  <img
                    className="img-fluid"
                    src={image.uri}
                    alt={image.title}
                  />
                </Fade>
              </a>
            ))}
          </LightGallery>
        )}
      </Content>

      <Slide
        direction="up"
        delay={300}
        triggerOnce
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 9,
        }}
      >
        <Button
          type="primary"
          size="large"
          style={{ borderRadius: 20 }}
          onClick={() => setOpenModalTambah(true)}
        >
          {"+ "} Tambah Data
        </Button>
      </Slide>

      {/* modal tambah */}
      <ModalTambah
        open={openModalTambah}
        setOpen={setOpenModalTambah}
        fetchData={fetchData}
      />
    </React.Fragment>
  );
}

export default Home;
