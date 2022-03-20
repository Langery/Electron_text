import React, { Component } from "react";
import '../../style/main.less';

import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Header } = Layout;

class MainPage extends Component {
  state = {
    current: 'nav1'
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render () {
    const { current } = this.state;
    return (
      <div className="mainpage">
        <Header>
          <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="nav1">
              <ion-icon name="balloon-outline"></ion-icon>
              Navigation One
            </Menu.Item>
            <Menu.Item key="nva2">
              <ion-icon name="beer-outline"></ion-icon>
              Navigation Two
            </Menu.Item>
            <SubMenu
              key="nva3"
              title={
                <span>
                  <ion-icon name="bandage-outline"></ion-icon>
                  Navigation Three
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
      </div>
    )
  }
}

export default MainPage;