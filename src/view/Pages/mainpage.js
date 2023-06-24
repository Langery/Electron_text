// eslint-disable-next-line
import React, { useState, useEffect, useRef } from "react";
import '../../style/main.less';

import { Link } from 'react-router-dom';

import FormSelf from '../components/form';
import ExcelSelf from '../components/excel';
import TalkSelf from '../components/talk';

import card01 from "../../images/card_01.jpg"
import card02 from "../../images/card_02.jpg"
import card03 from "../../images/card_03.jpg"
import card04 from "../../images/card_04.jpg"
import card05 from "../../images/card_05.jpg"
import card06 from "../../images/card_06.jpg"

// Skeleton
import { Col, Layout, Menu, Modal, PageHeader, Row, Tree, Card, Carousel, Button } from 'antd';

import { PostWay, GetWay } from '../../server/request';

const { SubMenu } = Menu;
const { Header, Content } = Layout;

const { Meta } = Card;

const { DirectoryTree } = Tree;

// defined component
function NewCol (item) {
  const i = item.item;
  let [titleWord, Iimg] = ['', ''];
  if (i) {
    titleWord = "Model Card by self " + i.cardname;
    Iimg = i.img
  } else {
    titleWord = "Model Card by self ";
  }
  
  let returnLabel = (
    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
      <Card className="card_content" title={titleWord} cover={<img alt="== 我的照片丢了~" src={Iimg}/>}>
        <Meta title="title" description="text" />
      </Card>
    </Col>
  )
  return returnLabel;
}

function useCallbackState(state) {
  const _cb = useRef();
  const [data, setData] = useState(state);
  useEffect(() => {
    _cb.current && _cb.current(data);
  }, [data])

  return [
    data,
    (val, callback) => {
      _cb.current = callback;
      setData(val);
    }
  ]
}

const MainPage = () => {

  const [current, setCurrent] = useState('nav1_content');
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(true);
  const [treeData, setTreeData] = useState([
    {
      title: 'parent 0',
      key: '0-0',
      children: [
        { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
        { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
      ],
    }
  ])
  // eslint-disable-next-line 
  const [cardList, setCardList] = useState([
    {
      cardname: 1,
      img: card01
    },
    {
      cardname: 2,
      img: card02
    },
    {
      cardname: 3,
      img: card03
    },
    {
      cardname: 4,
      img: card04
    },
    {
      cardname: 5,
      img: card05
    },
    {
      cardname: 6,
      img: card06
    },
    {
      cardname: 7
    },
    {
      cardname: 8
    },
    {
      cardname: 9
    }
  ])

  const [detailInfor, setDetailInfor] = useState('Detail');
  // eslint-disable-next-line
  const [operationInfor, setOperationInfor] = useState('Operation');

  /**
   * This is Form Data
   */
  // eslint-disable-next-line
  const [dataLayout, setDataLayout] = useState({
    labelCol: 4,
    wrapperCol: 20
  })


  // eslint-disable-next-line
  const [dataItem, setDataItem] = useState([
    {
      id: 1,
      title: 'name',
      type: 'input',
      size: 'middle',
      placeholder: 'This is name',
      // inputType: 'text', // text | number
      required: true
    },
    {
      id: 2,
      title: 'age',
      type: 'inputnumber',
      size: 'middle',
      placeholder: 'This is age'
    },
    {
      id: 3,
      title: 'nickname',
      type: 'select',
      size: 'middle',
      placeholder: 'This is select',
      selectData: [
        {
          id: 1,
          name: 'Tom',
          value: 'tom'
        },
        {
          id: 2,
          name: 'Jack',
          value: 'jack'
        }
      ],
      defaultSelect: 'Tom'
    },
    {
      id: 4,
      title: 'create time',
      type: 'datepick',
      size: 'middle',
      placeholder: 'This is data pick',
      disabled: false
    },
    // {
    //   id: 5,
    //   title: 'infor',
    //   type: 'text',
    //   size: 'middle',
    //   placeholder: 'This is TextArea',
    //   row: 4
    // }
  ])

  const [clearData, setClearData] = useCallbackState(false);
  const [backInfor, setBackInfor] = useCallbackState(false);

  const childSendRef = useRef(null);

  // 数据更新
  useEffect(() => {
    setSessionFun(); // 临时数据
    // run function
    getTreeData();
    if (backInfor) childSendRef.current.getChildData();

    return(() => {
      console.log('COMPONENT WILL UNMOUNT ...');
    })
  }, [backInfor])

  /**
   * 存储 session 数据
   * 临时数据
   */
  const setSessionFun = () => {
    sessionStorage.setItem('name', 'demo1')
    sessionStorage.setItem('key', '950214')
  }


  const getTreeData = () => {
    const getWay = PostWay('getTree', '')
    fetch(getWay[0], getWay[1])
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          console.log('error')
        }
      })
      .then(data => {
        console.log(data)
        setTreeData(data);
      })
      .catch(error => { console.log(error) })
  }

  // defined a label
  const NewCreatCol = () => {
    return cardList.map(item => {
      return <NewCol item={item} key={item.cardname}></NewCol>
    })
  }

  // nav click function
  const handleClick = e => {
    let getOldClass = document.getElementsByClassName(current);
    let oldClassSyle = getOldClass[0].style;
    oldClassSyle.display = 'none';
    setCurrent(e.key);

    if (e.keyPath.length > 1) {
      let getFatherClass = document.getElementsByClassName(e.keyPath[1]);
      let classFatherStyle = getFatherClass[0].style;
      classFatherStyle.display = 'block';
    }
    let getClass = document.getElementsByClassName(e.key);

    let classStyle = getClass[0].style;
    classStyle.display = 'block';
  };

  const addListInfor = e => {
    console.log('CLICK ADD ICON ...');
    setBackInfor((false), data => {
      console.log(data);
    })
    setIsModalVisible(true);
  }

  const handleModalOk = e => {
    console.log('CLICK MODAL OK ...')
    // set a event to the child component data
    // setBackInfor((true), data => {
    //   console.log(data);
    // })
    setBackInfor(true)
    setIsModalVisible(false);
  }

  const handleModalCancel = e => {
    setClearData((true), (data) => {
      console.log(data)
    });
    setIsModalVisible(false);
  }

  // tree =====================================================> start
  const onSelect = (keys, info) => {
    let sendKey = keys[0];
    console.log('Trigger Select', sendKey, info);
    const sendData = {
      id: sendKey
    }
    const getWay = GetWay('getListInfor', sendData);
    fetch(getWay[0], getWay[1])
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          console.log('error')
        }
      })
      .then(data => {
        console.log(data);
        setDetailInfor(data.describe);
      })
      .catch(error => { console.log(error) })
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };
  // tree =====================================================> end

  // child component data
  const childRef = (data) => {
    console.log(data)
  }

  return (
    <div className="mainpage">
      <Header>
        <Menu className="mainmenu" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
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
              <Menu.Item key="setting_1">Excel</Menu.Item>
              <Menu.Item key="setting_2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting_3">Option 3</Menu.Item>
              <Menu.Item key="setting_4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="nav4_content">
            <ion-icon name="chatbubbles-outline"></ion-icon>
            Talking
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="maincontent">
        <div className="nav1_content">
          <PageHeader
            title="Components list"
            subTitle="This is a subtitle"
            extra={[
              <div>
                <ion-icon key='2' class="add_icon" onClick={addListInfor} name="add-circle-outline"></ion-icon>
                <Link to="/dragpage">
                  <Button shape="round" class="drag_btn" type="primary" key='1'>
                    Drag&emsp;
                    <ion-icon class="btn_drag_icon" name="arrow-forward-outline"></ion-icon>
                  </Button>
                </Link>
              </div>
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
              <p className="content_infor">
                {detailInfor}
              </p>
              <Carousel>
                <div className="carousel_style">
                  <h3>1</h3>
                </div>
                <div className="carousel_style">
                  <h3>2</h3>
                </div>
                <div className="carousel_style">
                  <h3>3</h3>
                </div>
                <div className="carousel_style">
                  <h3>4</h3>
                </div>
              </Carousel>
            </Col>
            <Col span={8} className="main_col_3">
              <PageHeader
                title="Operation Area"
                subTitle="This is a subtitle"
              >
              </PageHeader>
              <p className="content_infor">
                {operationInfor}
              </p>
            </Col>
          </Row>
        </div>
        <div className="nav2_content">
          {/* <Header>
            Header
          </Header> */}
          <Row className="nav2_row">
            <NewCol></NewCol>
            <NewCreatCol></NewCreatCol>
          </Row>
        </div>
        <div className="nav3_content">
          <div className="nav3_item1">
            <div className="setting_1">
              {/* TODO: Excel */}
              <ExcelSelf></ExcelSelf>
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
        <div className="nav4_content">
          <TalkSelf></TalkSelf>
        </div>
      </Content>
      <Modal title="Add List info modal" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
        <FormSelf
          ref={childSendRef}
          getBackData = {childRef}
          formItemData={dataItem}
          formLayout={dataLayout}
          formClear={clearData}
          formBackInfor={backInfor}
        ></FormSelf>
      </Modal>
    </div>
  )
}

export default React.memo(MainPage);