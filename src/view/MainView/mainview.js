import React, { Component } from "react";
import './mainview.less'
import { Route, Link, BrowserRouter } from 'react-router-dom'

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
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  handle = (e) => {
    console.log(e)
    // this.setState({
    //   current: e.key
    // })
  }
  render () {
    let {match, routes} = this.props
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['/mainView']} mode="inline" onClick={this.handle}>
              <Menu.Item key="/mainView">
                <Link to={`${match.url}`}>
                  <Icon type="pie-chart" />
                  <span>Homepage</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="first">
                <Link to={`${match.url}/map`}>
                  <Icon type="desktop" />
                    <span>Map</span>
                  </Link>
              </Menu.Item>
              <SubMenu
                title={
                  <span>
                    <Icon type="user" />
                    <span>Draw</span>
                  </span>
                }
              >
                <Menu.Item key="/rough">
                  <Link to={`${match.url}/rough`}>
                    <Icon type="pie-chart" />
                    <span>Rough</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/chartxkcd">
                  <Link to={`${match.url}/chartxkcd`}>
                    <Icon type="dot-chart" />
                    <span>Chart.xkcd</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="team" />
                    <span>Friends</span>
                  </span>
                }
              >
                <Menu.Item key="/list">
                  <Link to={`${match.url}/list`}>
                    <span>List</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/connection">
                  <Link to={`${match.url}/connection`}>
                    <span>Connection</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="appstore" />
                <span>extend</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content>
              {
                routes.map(({path, ComponentName, exact = true, routes = []}, key) => {
                  return <Route
                          exact = {exact}
                          key={key}
                          path={path}
                          render = {props => (
                            <ComponentName {...props} routes = {routes} />
                          )}
                          />
                })
              }
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    )
  }
}

export default MainView
