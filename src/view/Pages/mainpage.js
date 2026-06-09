import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Layout, Menu, Modal, Row, Tree, Card, Carousel, Button, Popover, Badge } from 'antd';
import { api } from '../../server/request';
import useRequest from '../../hooks/useRequest';
import IonIcon from '../../common/IonIcon';
import FormSelf from '../components/form';
import ExcelSelf from '../components/excel';
import MapSelf from '../MainView/components/map';
import RoughSelf from '../MainView/components/rough';
import ChartxkcdSelf from '../MainView/components/chartxkcd';
import IndexSelf from '../MainView/components/indexview';
import ListSelf from '../MainView/components/listed';
import TalkSelf from '../components/talk';
import OperationSelf from '../mainpage/Operation';
import card01 from '../../images/card_01.jpg';
import card02 from '../../images/card_02.jpg';
import card03 from '../../images/card_03.jpg';
import card04 from '../../images/card_04.jpg';
import card05 from '../../images/card_05.jpg';
import card06 from '../../images/card_06.jpg';
import '../../style/main.less';

const { SubMenu } = Menu;
const { Header, Content } = Layout;
const { Meta } = Card;
const { DirectoryTree } = Tree;

const cardList = [
  { cardname: 1, img: card01 },
  { cardname: 2, img: card02 },
  { cardname: 3, img: card03 },
  { cardname: 4, img: card04 },
  { cardname: 5, img: card05 },
  { cardname: 6, img: card06 },
  { cardname: 7 },
  { cardname: 8 },
  { cardname: 9 }
];

const treeData = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true }
    ]
  }
];

const NewCol = memo(({ cardData }) => {
  const titleWord = cardData ? `Model Card ${cardData.cardname}` : 'Model Card';
  const cardImg = cardData?.img;

  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
      <Card
        className="card_content"
        title={titleWord}
        cover={cardImg ? <img alt="card" src={cardImg} style={{ height: '160px', objectFit: 'cover' }} /> : null}
      >
        <Meta title="title" description="text" />
      </Card>
    </Col>
  );
});

const MainPage = () => {
  const [currentNav, setCurrentNav] = useState('nav1_content');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailInfor, setDetailInfor] = useState('Detail');
  const [treeDataState] = useState(treeData);
  const [clearData, setClearData] = useState(false);
  const [backInfor, setBackInfor] = useState(false);

  const childSendRef = useRef(null);

  const dataLayout = { labelCol: 4, wrapperCol: 20 };

  const dataItem = [
    { id: 1, title: 'name', type: 'input', size: 'middle', placeholder: 'This is name', required: true },
    { id: 2, title: 'age', type: 'inputnumber', size: 'middle', placeholder: 'This is age' },
    {
      id: 3,
      title: 'nickname',
      type: 'select',
      size: 'middle',
      placeholder: 'This is select',
      selectData: [
        { id: 1, name: 'Tom', value: 'tom' },
        { id: 2, name: 'Jack', value: 'jack' }
      ],
      defaultSelect: 'Tom'
    },
    { id: 4, title: 'create time', type: 'datepick', size: 'middle', placeholder: 'This is data pick', disabled: false }
  ];

  const popoverMenu = [
    { id: 1, name: 'Content 1 ~', count: 5 },
    { id: 2, name: 'Content 2 !', count: 9 },
    { id: 3, name: 'Content 3 @', count: 3 }
  ];

  const popoverText = (
    <div className="popover_menu">
      <span>Menu List</span>
      <IonIcon className="popover_menuIcon" name="refresh-outline" size={14} />
    </div>
  );

  const popoverContent = (
    <div>
      {popoverMenu.map((i) => (
        <div className="popover_item" key={i.id}>
          <p>{i.name}</p>
          <Badge className="popover_badge" count={i.count} />
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    sessionStorage.setItem('name', 'demo1');
    sessionStorage.setItem('key', '950214');
  }, []);

  useEffect(() => {
    if (backInfor && childSendRef.current) {
      childSendRef.current.getChildData();
    }
  }, [backInfor]);

  const handleNavClick = useCallback((e) => {
    setCurrentNav(e.key);
  }, []);

  const addListInfor = useCallback(() => {
    setBackInfor(false);
    setIsModalVisible(true);
  }, []);

  const handleModalOk = useCallback(() => {
    setBackInfor(true);
    setIsModalVisible(false);
  }, []);

  const handleModalCancel = useCallback(() => {
    setClearData(true);
    setIsModalVisible(false);
  }, []);

  // service 用 useCallback 稳引用, 让 useRequest 内部 run 也稳, 避免 onSelect 跟着每次 render 重建
  const fetchListInforService = useCallback(
    (params, { signal }) => api.get('getListInfor', { params, signal }),
    []
  );
  const { refetch: fetchListInfor } = useRequest(fetchListInforService, { manual: true });

  const onSelect = useCallback(async (keys, info) => {
    const sendKey = keys[0];
    const data = await fetchListInfor({ id: sendKey });
    if (data === undefined) return;
    setDetailInfor(data.describe || 'No description');
  }, [fetchListInfor]);

  const onExpand = useCallback(() => {}, []);

  const childRef = useCallback((data) => {
  }, []);

  const renderContent = () => {
    switch (currentNav) {
      case 'nav1_content':
        return (
          <Row gutter={[16, 16]} className="content-row">
            <Col xs={24} md={8} lg={7}>
              <Card className="content-card card-menu" hoverable>
                <Meta title="导航面板" description="目录树导航" />
                <DirectoryTree
                  className="menu-tree"
                  multiple
                  defaultExpandAll
                  onSelect={onSelect}
                  onExpand={onExpand}
                  treeData={treeDataState}
                />
              </Card>
            </Col>
            <Col xs={24} md={10} lg={10}>
              <Card className="content-card card-detail" hoverable>
                <Meta title="详情信息" description="选中项目详细信息" />
                <p className="detail-text">{detailInfor}</p>
                <Carousel autoplay dotPosition="bottom" className="detail-carousel">
                  {[1, 2, 3, 4].map((num) => (
                    <div className="carousel-item" key={num}>
                      <h3>{num}</h3>
                    </div>
                  ))}
                </Carousel>
              </Card>
            </Col>
            <Col xs={24} md={6} lg={7}>
              <Card className="content-card card-operation" hoverable>
                <Meta title="快捷操作" description="常用功能入口" />
                <OperationSelf operationInfor="This is Operation" />
                <div className="action-buttons">
                  <IonIcon onClick={addListInfor} name="add-circle-outline" size={32} className="action-icon" />
                  <Link to="/dragpage">
                    <Button type="primary" shape="round" className="drag-btn">
                      Drag
                      <IonIcon name="arrow-forward-outline" size={18} />
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          </Row>
        );
      case 'nav2_content':
        return (
          <Row gutter={[16, 16]} className="content-row">
            <NewCol cardData={{}} />
            {cardList.map((item) => <NewCol key={item.cardname} cardData={item} />)}
          </Row>
        );
      case 'nav3_content':
        return (
          <Row gutter={[16, 16]} className="content-row">
            <Col xs={24} md={12}>
              <ExcelSelf />
            </Col>
            <Col xs={24} md={12}>
              <Card className="content-card" hoverable>
                <Meta title="Option 2" description="Additional settings" />
                <p style={{ color: '#333' }}>Content 3_2</p>
              </Card>
            </Col>
          </Row>
        );
      case 'nav4_content':
        return <TalkSelf />;
      case 'nav5_content':
        return (
          <Row gutter={[16, 16]} className="content-row">
            <Col xs={24} md={12} lg={8}><MapSelf /></Col>
            <Col xs={24} md={12} lg={8}><RoughSelf /></Col>
            <Col xs={24} md={12} lg={8}><ChartxkcdSelf /></Col>
          </Row>
        );
      default:
        return null;
    }
  };

  const menuItems = [
    { key: 'nav1_content', icon: 'balloon-outline', label: 'Nav1' },
    { key: 'nav2_content', icon: 'beer-outline', label: 'Nav2' },
    { key: 'nav3_content', icon: 'bandage-outline', label: 'Nav3', submenu: [
      { key: 'setting_1', label: 'Excel' },
      { key: 'setting_2', label: 'Option 2' }
    ]},
    { key: 'nav4_content', icon: 'chatbubbles-outline', label: 'Talking' },
    { key: 'nav5_content', icon: 'bandage-outline', label: 'View', submenu: [
      { key: 'view_1', label: 'Map' },
      { key: 'view_2', label: 'Rough' },
      { key: 'view_3', label: 'Chartxkcd' },
      { key: 'view_4', label: 'IndexView' },
      { key: 'view_5', label: 'ListSelf' }
    ]}
  ];

  return (
    <div className="mainpage">
      <Header className="main-header">
        <Row align="middle" justify="space-between">
          <Col>
            <Link to="/" className="logo-text">Electron Ant</Link>
          </Col>
          <Col>
            <Menu
              onClick={handleNavClick}
              selectedKeys={[currentNav]}
              mode="horizontal"
              className="nav-menu"
            >
              {menuItems.map(item => (
                item.submenu ? (
                  <SubMenu
                    key={item.key}
                    title={
                      <span className="menu-item-with-icon">
                        <IonIcon name={item.icon} size={16} />
                        <span>{item.label}</span>
                      </span>
                    }
                  >
                    {item.submenu.map(sub => (
                      <Menu.Item key={sub.key}>{sub.label}</Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
                  <Menu.Item key={item.key}>
                    <span className="menu-item-with-icon">
                      <IonIcon name={item.icon} size={16} />
                      <span>{item.label}</span>
                    </span>
                  </Menu.Item>
                )
              ))}
            </Menu>
          </Col>
          <Col>
            <Popover
              placement="bottomRight"
              title={popoverText}
              content={popoverContent}
              trigger="click"
            >
              <Button shape="circle" className="cart-btn">
                <IonIcon name="cart-outline" size={18} />
              </Button>
            </Popover>
          </Col>
        </Row>
      </Header>

      <Content className="main-content">
        {renderContent()}
      </Content>

      <Modal
        title="Add List info"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <FormSelf
          ref={childSendRef}
          getBackData={childRef}
          formItemData={dataItem}
          formLayout={dataLayout}
          formClear={clearData}
          formBackInfor={backInfor}
        />
      </Modal>
    </div>
  );
};

export default memo(MainPage);