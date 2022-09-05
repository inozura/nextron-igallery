import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Upload, UploadFile } from "antd";
import { Content } from "antd/lib/layout/layout";
import { RcFile, UploadProps } from "antd/lib/upload";
import getBase64 from "../helpers/getbase64";
import { querySqlite } from "../helpers/ipcrenderer";

interface newDataType {
  title: string;
  description: string;
  uri: string;
}

const ModalTambah = ({ open, setOpen, fetchData }) => {
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");
  const [fileList, setFileList] = React.useState<UploadFile[]>();

  const handleCloseMainModal = () => setOpen(false);

  const handleSubmit = async (data: { Nama: string; Deskripsi: string }) => {
    const imageBase64 = await getBase64(fileList[0].originFileObj as RcFile);

    const newData: newDataType = {
      title: data.Nama,
      description: data.Deskripsi,
      uri: imageBase64,
    };

    await querySqlite({ status: "create", data: newData })
      .then(() => {
        message.success("Sukses Tambah Data");
        fetchData();
        handleCloseMainModal();
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <React.Fragment>
      <Modal
        visible={open}
        footer={null}
        onCancel={handleCloseMainModal}
        title="Tambah Data"
        style={{ borderRadius: 10 }}
      >
        <Content style={{ padding: "70px 48px 0px 48px" }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Nama"
              name="Nama"
              rules={[{ required: true, message: "Nama tidak boleh kosong" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Deskripsi"
              name="Deskripsi"
              rules={[
                { required: true, message: "Deskripsi tidak boleh kosong" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Upload" valuePropName="fileList">
              <Upload
                listType="picture-card"
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Modal>

      {/* preview image */}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </React.Fragment>
  );
};

export default ModalTambah;
