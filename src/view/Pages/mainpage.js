import React, { Component } from "react";
import '../../style/main.less';

import { Col, Layout, Menu, PageHeader, Row, Tree } from 'antd';

const { SubMenu } = Menu;
const { Header, Content } = Layout;

const { DirectoryTree } = Tree;
const treeData = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];
class MainPage extends Component {
  state = {
    current: 'nav1'
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render () {

    // tree =====================================================> start
    const onSelect = (keys, info) => {
      console.log('Trigger Select', keys, info);
    };
  
    const onExpand = () => {
      console.log('Trigger Expand');
    };
    // tree =====================================================> end

    const { current } = this.state;
    return (
      <div className="mainpage">
        <Header>
          <Menu className="mainmenu" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="nav1">
              <ion-icon name="balloon-outline"></ion-icon>
              Nav1
            </Menu.Item>
            <Menu.Item key="nva2">
              <ion-icon name="beer-outline"></ion-icon>
              Nav2
            </Menu.Item>
            <SubMenu
              key="nva3"
              title={
                <span>
                  <ion-icon name="bandage-outline"></ion-icon>
                  Nav3
                </span>
              }
            >
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </Header>
        {/* Content */}
        <Content className="maincontent">
          <PageHeader
            title="Components list"
            subTitle="This is a subtitle"
          >
          </PageHeader>
          <Row>
            <Col span={8} className="main_col_1">
              <PageHeader
                title="Menu Area"
                subTitle="This is a subtitle"
              >
              </PageHeader>
              <DirectoryTree
                multiple
                defaultExpandAll
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={treeData}
              />
            </Col>
            <Col span={8} className="main_col_2">
              <PageHeader
                title="Detail Area"
                subTitle="This is a subtitle"
              >
              </PageHeader>
            </Col>
            <Col span={8} className="main_col_3">
              <PageHeader
                title="Operation Area"
                subTitle="This is a subtitle"
              >
              </PageHeader>
            </Col>
          </Row>
        </Content>
      </div>
    )
  }
}

export default MainPage;