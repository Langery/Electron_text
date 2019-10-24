import React, { Component } from "react";
import './mainview.css'
import { Route, Link } from 'react-router-dom'

// Breadcrumb
import { Layout, Menu, Icon } from 'antd'
const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

class MainView extends Component {
  state = {
    collapsed: false
  }
  constructor (props) {
    super(props)
    this.state = {}
  }
  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  handle = (e) => {
    console.log(e)
  }
  render () {
    let {match, routes} = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" onClick={this.handle}>
            <Menu.Item key="/">
              <Icon type="pie-chart" />
              {/* <span>Main 1</span> */}
              <Link to={`${match.url}`}>Main 1</Link>
            </Menu.Item>
            <Menu.Item key="/first">
              <Icon type="desktop" />
              {/* <span>Main 2</span> */}
              <Link to={`${match.url}/first`}>Main 2</Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>extend</span>
            </Menu.Item>
          </Menu>
        </Sider>
        {/* main view */}
        <Layout>
          {/* <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 660 }}>Bill is a cat.</div>
          </Content> */}
          <Content>
            {
              routes.map(({path, ComponentName, exact = true}, key) => {
                return <Route
                        exact = {exact}
                        key={key}
                        path={path}
                        Component={ComponentName}
                        />
              })
            }
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default MainView
