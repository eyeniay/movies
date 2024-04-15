import React from "react";
import { Layout } from "antd";

const AppLayout: React.FC<any> = ({ children }) => {
  return (
    <Layout className="movies-layout">
      <Layout.Header className="header"></Layout.Header>
      <Layout.Content className="content">{children}</Layout.Content>
    </Layout>
  );
};

export default AppLayout;
