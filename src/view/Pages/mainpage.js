import { useState, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Layout, Menu, Modal, Row, Tree, Card, Carousel, Button, Popover, Badge, Tag, message } from 'antd';
import IonIcon from '../../common/IonIcon';
import FormSelf from '../components/form';
import LibraryOverview from '../components/libraryOverview';
import ExcelSelf from '../components/excel';
import MapSelf from '../MainView/components/map';
import RoughSelf from '../MainView/components/rough';
import ChartxkcdSelf from '../MainView/components/chartxkcd';
import TalkSelf from '../components/talk';
import NewsSelf from '../News/news';
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
    describe: '这是一个父节点,包含两个叶子节点,用于演示目录树到详情面板的联动效果。',
    category: '父节点',
    children: [
      {
        title: 'leaf 0-0',
        key: '0-0-0',
        isLeaf: true,
        describe: '叶子节点 0-0 的描述,属于 A 类目下的一条记录,展示树节点字段到详情面板的映射。',
        category: 'A 类目'
      },
      {
        title: 'leaf 0-1',
        key: '0-0-1',
        isLeaf: true,
        describe: '叶子节点 0-1 的描述,属于 B 类目。切换节点时可以观察详情面板的实时更新。',
        category: 'B 类目'
      }
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
  const [detailInfor, setDetailInfor] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [treeDataState] = useState(treeData);

  const navigate = useNavigate();

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

  const handleNavClick = useCallback((e) => {
    setCurrentNav(e.key);
  }, []);

  const addListInfor = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleModalCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleFormSubmit = useCallback((item) => {
    try {
      const raw = localStorage.getItem('candidateLibrary');
      const list = raw ? JSON.parse(raw) : [];
      list.push(item);
      localStorage.setItem('candidateLibrary', JSON.stringify(list));
      message.success(`已加入备选库: ${item.name}`);
      setIsModalVisible(false);
    } catch (err) {
      message.error('写入备选库失败');
    }
  }, []);

  const onSelect = useCallback((keys, info) => {
    setSelectedKeys(keys);
    const node = info.node;
    if (!node) return;
    setDetailInfor({
      title: node.title,
      describe: node.describe || '暂无描述',
      category: node.category || '未分类'
    });
  }, []);

  const handleRefresh = useCallback(() => {
    setDetailInfor(null);
    setSelectedKeys([]);
  }, []);

  const handleExport = useCallback((data) => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detail-${data.title}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleRestore = useCallback(() => {
    navigate('/dragpage');
  }, [navigate]);

  const renderContent = () => {
    switch (currentNav) {
      case 'nav1_content':
        return (
          <>
            <Row gutter={[16, 16]} className="content-row">
              <Col xs={24} md={8} lg={7}>
                <Card className="content-card card-menu" hoverable>
                  <Meta title="导航面板" description="目录树导航" />
                  <DirectoryTree
                    className="menu-tree"
                    multiple
                    defaultExpandAll
                    selectedKeys={selectedKeys}
                    onSelect={onSelect}
                    treeData={treeDataState}
                  />
                </Card>
              </Col>
              <Col xs={24} md={10} lg={10}>
                <Card className="content-card card-detail" hoverable>
                  <Meta title="详情信息" description="选中项目详细信息" />
                  {detailInfor ? (
                    <div className="detail-content">
                      <h3 className="detail-title">{detailInfor.title}</h3>
                      <Tag color="blue" className="detail-category">{detailInfor.category}</Tag>
                      <p className="detail-text">{detailInfor.describe}</p>
                    </div>
                  ) : (
                    <p className="detail-text detail-empty">请从左侧树中选择节点查看详情</p>
                  )}
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
                  <OperationSelf
                    onAdd={addListInfor}
                    onRefresh={handleRefresh}
                    onExport={handleExport}
                    onRestore={handleRestore}
                    detailInfor={detailInfor}
                  />
                  <div className="action-buttons">
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
            <Row gutter={[16, 16]} className="content-row">
              <Col xs={24}>
                <LibraryOverview />
              </Col>
            </Row>
          </>
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
      case 'nav6_content':
        return <NewsSelf />;
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
    ]},
    { key: 'nav6_content', icon: 'newspaper-outline', label: 'News' }
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
        onCancel={handleModalCancel}
        footer={null}
        destroyOnClose
      >
        <FormSelf
          formItemData={dataItem}
          formLayout={dataLayout}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default memo(MainPage);