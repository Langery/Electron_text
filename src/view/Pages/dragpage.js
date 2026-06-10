import { useState, memo, useCallback } from 'react';
import { message } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { Checkbox, Input, Select, Button, Radio, Layout, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import IonIcon from '../../common/IonIcon';
import ButtonSelf from './components/button';
import InfoPage from './components/infopage';
import '../../style/drag.less';

const { Header, Content } = Layout;
const { Meta } = Card;

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3819225_cvuht688sxe.js'
});

const menuList = [
  { id: 1, name: 'Input', icon: 'icon-instagram-co', iconTwoTone: false, number: 1 },
  { id: 2, name: 'Select', icon: 'icon-food-pizza', iconTwoTone: true, number: 2 },
  { id: 3, name: 'Button', icon: '', iconTwoTone: false, info: 'default', number: 3 },
  { id: 4, name: 'Radio', icon: '', iconTwoTone: false, number: 4 },
  { id: 5, name: 'Checkbox', icon: '', iconTwoTone: false, number: 5 },
  { id: 6, name: 'Button', icon: '', iconTwoTone: false, number: 6 }
];

const readCandidateLibrary = () => {
  try {
    const raw = localStorage.getItem('candidateLibrary');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const persistCandidateLibrary = (list) => {
  try {
    localStorage.setItem('candidateLibrary', JSON.stringify(list));
  } catch {
    // ignore quota errors
  }
};

const readDragLayout = () => {
  try {
    const raw = localStorage.getItem('dragLayout');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const persistDragLayout = (list) => {
  try {
    localStorage.setItem('dragLayout', JSON.stringify(list));
  } catch {
    // ignore quota errors
  }
};

const handleDragStart = (data) => (e) =>
  e.dataTransfer.setData('itemData', JSON.stringify(data));

const SumSide = memo(({ selfList, onGetShow }) => {
  const handleClick = useCallback(() => onGetShow(true), [onGetShow]);

  return selfList.map((item) => {
    const getComponent = () => {
      if (item.source === 'library') {
        return (
          <div className="library-render">
            <strong>{item.name}</strong>
            {item.age != null && <span> · {item.age}岁</span>}
            {item.nickname && <span> · {item.nickname}</span>}
          </div>
        );
      }
      switch (item.name) {
        case 'Input': return <Input />;
        case 'Select': return <Select />;
        case 'Button': return <ButtonSelf props={item} />;
        case 'Radio': return <Radio />;
        case 'Checkbox': return <Checkbox />;
        default: return <div>Unknown Component</div>;
      }
    };

    return (
      <div
        key={item.id}
        className="right_item"
        draggable
        onDragStart={handleDragStart(item)}
        onClick={handleClick}
      >
        {getComponent()}
      </div>
    );
  });
});

const DragPage = () => {
  const [leftDragList, setLeftDragList] = useState([...menuList]);
  const [rightDragList, setRightDragList] = useState(() => readDragLayout());
  const [candidateList, setCandidateList] = useState(() => readCandidateLibrary());
  const [isInfoShow, setIsInfoShow] = useState(false);
  const [dragOverId, setDragOverId] = useState(null);

  const handleDragOver = useCallback((e) => e.preventDefault(), []);

  const handleDrop = useCallback((setCallback, setOtherList, arrow) => (e) => {
    e.preventDefault();
    const dropTarget = e.currentTarget;
    const id = dropTarget.dataset.id;

    const curData = JSON.parse(e.dataTransfer.getData('itemData'));

    if (curData.source === 'library' && arrow === 'left') {
      setDragOverId(null);
      return;
    }

    setCallback((preData) => {
      const filtered = preData.filter((item) => item.id !== curData.id);
      if (!id) return [...filtered, curData];

      const index = filtered.findIndex((item) => item.id === id);
      filtered.splice(index, 0, curData);
      return filtered;
    });

    if (arrow === 'left') {
      setOtherList((pre) => pre.filter((item) => item.id !== curData.id));
    } else if (curData.source === 'library') {
      setCandidateList((pre) => {
        const next = pre.filter((item) => item.id !== curData.id);
        persistCandidateLibrary(next);
        return next;
      });
    }

    setIsInfoShow(false);
    setDragOverId(null);
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    setDragOverId(e.currentTarget.dataset.id || 'drop-zone');
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverId(null);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDragOverId(null);
  }, []);

  const resetList = useCallback(() => {
    setLeftDragList([...menuList]);
    setRightDragList([]);
  }, []);

  const refreshLibrary = useCallback(() => {
    setCandidateList(readCandidateLibrary());
  }, []);

  const clearLibrary = useCallback(() => {
    setCandidateList([]);
    persistCandidateLibrary([]);
  }, []);

  const saveLayout = useCallback(() => {
    persistDragLayout(rightDragList);
    message.success(`已保存布局 (${rightDragList.length} 项)`);
  }, [rightDragList]);

  const clearLayout = useCallback(() => {
    setRightDragList([]);
    persistDragLayout([]);
    message.success('已清空布局');
  }, []);

  return (
    <div className="dragpage">
      <Header>
        <Card className="drag_card">
          <Meta title="Drag" description="Drag component to a frame" />
        </Card>
      </Header>
      <Content>
        <div className="operatio_zone">
          <Button className="drag_ability" onClick={resetList}>
            Reset List
          </Button>
          <Button className="drag_ability" onClick={saveLayout}>
            保存布局
          </Button>
          <Button className="drag_ability" danger onClick={clearLayout} disabled={rightDragList.length === 0}>
            清空布局
          </Button>
          <Link to="/mainpage">
            <Button shape="round" className="back_btn">
              Back to MainPage&emsp;
              <IonIcon className="btn_drag_icon" name="arrow-forward-outline" size={18} />
            </Button>
          </Link>
        </div>

        <div className="candidate-library">
          <div className="library-header">
            <h4>备选库</h4>
            <span className="library-count">{candidateList.length} 项</span>
            <Button size="small" onClick={refreshLibrary}>刷新</Button>
            <Button size="small" danger onClick={clearLibrary} disabled={candidateList.length === 0}>
              清空
            </Button>
          </div>
          <div className="library-items">
            {candidateList.length === 0 ? (
              <p className="library-empty">暂无备选项,请到 MainPage 用表单 + 按钮添加</p>
            ) : (
              candidateList.map((item) => (
                <div
                  key={item.id}
                  className="library-item"
                  draggable
                  onDragStart={handleDragStart({ ...item, source: 'library' })}
                  title="拖到中间画布使用"
                >
                  <div className="library-item-title">{item.name}</div>
                  <div className="library-item-meta">
                    {item.age != null && <span>{item.age}岁</span>}
                    {item.nickname && <span>{item.nickname}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div
              className={`left-wrap${dragOverId === 'left-drop' ? ' over' : ''}`}
              data-id="left-drop"
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(setLeftDragList, setRightDragList, 'left')}
              onDragEnd={handleDragEnd}
            >
              {leftDragList.map((item) => (
                <div
                  key={item.id}
                  className="item-text"
                  draggable
                  onDragStart={handleDragStart(item)}
                >
                  {item.icon && <IconFont type={item.icon} />}
                  {item.name}
                </div>
              ))}
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div
              className={`min-wrap${dragOverId === 'right-drop' ? ' over' : ''}`}
              data-id="right-drop"
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(setRightDragList, setLeftDragList, 'right')}
              onDragEnd={handleDragEnd}
            >
              <SumSide selfList={rightDragList} onGetShow={setIsInfoShow} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}>
            <div className="right-wrap">
              <InfoPage isShow={isInfoShow} />
            </div>
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default DragPage;
