import React, { Component } from "react";
import './mainview.css'
import { Route, Link, BrowserRouter } from 'react-router-dom'

// Breadcrumb
import { Layout, Menu, Icon } from 'antd'
const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const aStyle = {
  float: 'right',
  marginRight: '35%'
}
const bStyle = {
  float: 'right',
  marginRight: '22%'
}
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
                <Icon type="pie-chart" />
                <Link style={aStyle} to={`${match.url}`}>Homepage</Link>
              </Menu.Item>
              <Menu.Item key="first">
                <Icon type="desktop" />
                <Link style={aStyle}  to={`${match.url}/first`}>Main 2</Link>
              </Menu.Item>
              <SubMenu
                title={
                  <span>
                    <Icon type="user" />
                    <span>Draw</span>
                  </span>
                }
              >
                <Menu.Item key="rough">
                  <Icon type="pie-chart" />
                  <Link style={aStyle} to={`${match.url}/rough`}>Rough</Link>
                </Menu.Item>
                <Menu.Item key="chartxkcd">
                  <Icon type="dot-chart" />
                  <Link style={bStyle} to={`${match.url}/chartxkcd`}>Chart.xkcd</Link>
                </Menu.Item>
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
          <Layout>
            <Content>
              {
                routes.map(({path, ComponentName, exact = true, routes = []}, key) => {
                  console.log(routes)
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
