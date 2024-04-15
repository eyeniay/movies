import React from "react";
import { Layout } from "antd";
import Filters from "components/filter";
import Logo from "components/logo";

const AppLayout: React.FC<any> = ({ children }) => {
  return (
    <Layout className="movies-layout">
      <Layout.Header className="header">
        <Logo />
        <Filters />
      </Layout.Header>
      <Layout.Content className="content">{children}</Layout.Content>
    </Layout>
  );
};

export default AppLayout;
