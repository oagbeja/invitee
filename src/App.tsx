import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // UploadOutlined,
  UserOutlined,
  // VideoCameraOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Col,
  Card,
  Row,
  Modal,
  Input,
} from "antd";

import { fetchData, addData, delData, sendMessage } from "./utils/api";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [records, setRecords] = useState<any>([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formstate, setFormstate] = useState<any>({});
  const [message, setMessage] = useState<any>("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    let data = formstate.del
      ? await delData(formstate.id)
      : await addData(formstate, !!formstate.id);
    if (data) {
      setIsModalOpen(false);
      setFormstate({});
      getData();
    }
  };

  const handleCancel = () => {
    setFormstate({});
    setIsModalOpen(false);
  };

  const getData = async () => {
    let data = await fetchData();
    data && setRecords(data);
  };

  const handleEdit = async (item: any) => {
    let data = await fetchData(item.id);
    if (data) {
      setFormstate(data);
      showModal();
    }
  };

  const handleDelete = async (item: any) => {
    setFormstate({ ...item, del: true });
    showModal();
  };

  const displayContent = () => (
    <Row gutter={[16, 16]}>
      {records.map((el: any, idx: number) => (
        <Col key={`Gr${idx}`} xs={14} sm={8}>
          <Card title={el?.name} bordered={false}>
            <p>{el.phnum}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <DeleteOutlined
                twoToneColor='red'
                onClick={() => handleDelete(el)}
                style={{ cursor: "pointer" }}
              />
              <div
                style={{
                  textAlign: "right",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
                onClick={() => handleEdit(el)}
              >
                Edit
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ paddingTop: 60 }}
      >
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Home",
            },
            // {
            //   key: "2",
            //   icon: <VideoCameraOutlined />,
            //   label: "nav 2",
            // },
            // {
            //   key: "3",
            //   icon: <UploadOutlined />,
            //   label: "nav 3",
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <label style={{ fontSize: "2vw", fontWeight: "bold" }}>
            Apostolic Faith ArabRoad Invitation System
          </label>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            background: "#ddeef0",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "20px",
            }}
          >
            <div
              style={{ alignItems: "flex-end", display: "flex", gap: "10px" }}
            >
              <textarea
                value={message}
                style={{ background: "#fff", color: "#000" }}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                cols={30}
              />
              <Button type='primary' onClick={() => sendMessage(message)}>
                Send Bulk Message
              </Button>
            </div>
            <Button type='primary' onClick={showModal}>
              Add
            </Button>
          </div>

          {displayContent()}
        </Content>
      </Layout>
      <Modal
        title='Add/Edit Record'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {formstate.del ? (
          <>
            Do you actually want to delete {formstate.name} with{" "}
            {formstate.phnum} ?{" "}
          </>
        ) : (
          <>
            <Input
              size='large'
              placeholder='Name'
              onChange={(e) =>
                setFormstate({ ...formstate, name: e.target.value })
              }
              prefix={<UserOutlined />}
              style={{ marginBottom: 5 }}
              value={formstate.name}
            />
            <Input
              size='large'
              type='number'
              onChange={(e) =>
                setFormstate({ ...formstate, phnum: e.target.value })
              }
              value={formstate.phnum}
              placeholder='Phone Number'
              prefix={<UserOutlined />}
            />
          </>
        )}
      </Modal>
    </Layout>
  );
};

export default App;
