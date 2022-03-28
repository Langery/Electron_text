import React, { Component, useState } from "react";
import '../../style/main.less';

import { Col, Layout, Menu, Modal, PageHeader, Row, Tree, Card } from 'antd';

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

// defined component
function NewCol (props) {
  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
      <Card title="Model Card by self">
      </Card>
    </Col>
  )
}

function NewList () {
  return (
    <NewCol></NewCol>
  )
}

// function defHook () {
//   // hook
//   // defined data
//   const [current, setCurrent] = useState['nav1_content']
// }

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'nav1_content',
      isModalVisible: false,
      cardList: [
        {
          name: 1
        },
        {
          name: 2
        },
        {
          name: 3
        },
        {
          name: 4
        },
        {
          name: 5
        },
        {
          name: 6
        },
        {
          name: 7
        }
      ]
    }
  }

  // nav click function
  handleClick = e => {
    let getOldClass = document.getElementsByClassName(this.state.current);
    let oldClassSyle = getOldClass[0].style;
    oldClassSyle.display = 'none';
    this.setState({ current: e.key });

    if (e.keyPath.length > 1) {
      let getFatherClass = document.getElementsByClassName(e.keyPath[1]);
      let classFatherStyle = getFatherClass[0].style;
      classFatherStyle.display = 'block';
    }
    let getClass = document.getElementsByClassName(e.key);

    let classStyle = getClass[0].style;
    classStyle.display = 'block';
  };

  addListInfor = e => {
    console.log('click add icon');
    this.setState({
      isModalVisible: true
    })
  }

  handleModalOk = e => {
    this.setState({
      isModalVisible: false
    })
  }

  handleModalCancel = e => {
    this.setState({
      isModalVisible: false
    })
  }

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
            <Menu.Item key="nav1_content">
              <ion-icon name="balloon-outline"></ion-icon>
              Nav1
            </Menu.Item>
            <Menu.Item key="nav2_content">
              <ion-icon name="beer-outline"></ion-icon>
              Nav2
            </Menu.Item>
            <SubMenu
              key="nav3_content"
              title={
                <span>
                  <ion-icon name="bandage-outline"></ion-icon>
                  Nav3
                </span>
              }
            >
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting_1">Option 1</Menu.Item>
                <Menu.Item key="setting_2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Item 2">
                <Menu.Item key="setting_3">Option 3</Menu.Item>
                <Menu.Item key="setting_4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </Header>
        {/* Content */}
        <Content className="maincontent">
          <div className="nav1_content">
            <PageHeader
              title="Components list"
              subTitle="This is a subtitle"
              extra={[
                <ion-icon key='1' class="add_icon" onClick={this.addListInfor}  name="add-circle-outline"></ion-icon>
              ]}
            >
            </PageHeader>
            <Row className="nav1_row">
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
          </div>
          <div className="nav2_content">
            <Row className="nav2_row">
              <NewCol></NewCol>
              <NewList></NewList>
            </Row>
          </div>
          <div className="nav3_content">
            <div className="nav3_item1">
              <div className="setting_1">
                <p style={{color: '#fff'}}>
                  Content 3_1
                </p>
              </div>
              <div className="setting_2">
                <p style={{color: '#fff'}}>
                  Content 3_2
                </p>
              </div>
            </div>
            <div className="nav3_item2">
              <div className="setting_3">
                <p style={{color: '#fff'}}>
                  Content 3_3
                </p>
              </div>
              <div className="setting_4">
                <p style={{color: '#fff'}}>
                  Content 3_4
                </p>
              </div>
            </div>
          </div>
        </Content>
        <Modal title="Add List info modal" visible={this.state.isModalVisible} onOk={this.handleModalOk} onCancel={this.handleModalCancel}>
            Add list informations
        </Modal>
      </div>
    )
  }
}

export default MainPage;