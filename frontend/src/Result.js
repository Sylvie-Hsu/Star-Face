import React, { Component } from "react";
import "./App.css";
import { Router, Route } from "react-router";
import { Button, Icon, Layout, Row, Upload, message } from "antd";

const { Header, Footer, Content } = Layout;

const props = {
  name: "file",
  action: "http://127.0.0.1:5000/get",
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

class App extends Component {
  render() {
    return (
      <Layout style={{ background: "#fff" }}>
        <Header
          style={{ background: "#fff", textAlign: "center", minHeight: 150 }}
        />
        <Content style={{ margin: "30px 16px 0", textAlign: "center" }}>
          <div
            style={{
              padding: 24,
              background: "#fff",
              minHeight: 300
            }}
          >
            <Upload {...props}>
              <Button
                className="App"
                type="default"
                style={{
                  borderColor: "#9437e6",
                  borderWidth: 2,
                  paddingLeft: 25,
                  paddingRight: 25,
                  minHeight: 270,
                  fontSize: 10
                }}
              >
                <Icon type="plus" />
                <br />
                支持上传jpg、jpeg、png、pdf文件
              </Button>
            </Upload>
          </div>
          <div className="App" />
        </Content>
        <Footer style={{ background: "#fff", textAlign: "center" }}>
          <Row style={{ minHeight: 50 }}>
            <Button
              size="large"
              type="primary"
              style={{
                background: "#9437E6",
                borderColor: "#9437E6",
                paddingLeft: 60,
                paddingRight: 60
              }}
            >
              寻找明星脸
            </Button>
          </Row>
          <Row>
            <Button
              size="large"
              type="default"
              style={{
                borderColor: "#9437E6",
                color: "#9437E6",
                paddingLeft: 60,
                paddingRight: 60
              }}
              onClick={() => this.handleClick()}
            >
              相似度排名
            </Button>
          </Row>
        </Footer>
      </Layout>
    );
  }
}

export default App;
