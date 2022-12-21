import React, { useState, useRef } from "react";
import { createFromIconfontCN } from '@ant-design/icons';
import '../../style/drag.less';

// eg: import component
import { Input, Select, Button, Layout, PageHeader, Col, Row } from "antd";

import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3819225_cvuht688sxe.js', // 阿里图标库链接
});

const list = [
  {
    id: 1,
    name: 'Input',
    icon: 'icon-instagram-co',
    iconTwoTone: false
  },
  {
    id: 2,
    name: 'Select',
    icon: 'icon-food-pizza',
    iconTwoTone: true // 双色图标配置
  },
  {
    id: 3,
    name: 'Button',
    icon: '',
    iconTwoTone: false
  },
  {
    id: 4,
    name: 'Num 4',
    icon: '',
    iconTwoTone: false
  },
  {
    id: 5,
    name: 'Num 5',
    icon: '',
    iconTwoTone: false
  }
];

// 拖拽开始时触发事件-通过dataTransfer对象设置所需要的数据
const handleDragStart = data => e => e.dataTransfer.setData('itemData', JSON.stringify(data));

interface ISideItem {
  props: null
}

const SumSide: React.FC<ISideItem> = (props) => {

  const rightList = props.selfList.list;

  return (
    rightList.map(item => {
      return (
        <div
          key={item.id}
          data-id={item.id}
          draggable
          onDragStart={handleDragStart(item)}
        >
          {item.name}
        </div>
      )
    })
  )
}

const DragPage = () => {

  const [leftDragList, setLeftDragList] = useState(list);
  const [rightDragList, setRightDragList] = useState([]);
  const dataRef = useRef(null);

  dataRef.current = { // 初始化
    left: {
      callback: setLeftDragList,
      list: leftDragList,
    },
    right: {
      callback: setRightDragList,
      list: rightDragList,
    }
  }
  
  // 拖拽元素在目标元素移动事件-阻止浏览器默认行为让目标元素成为可释放的目标元素
  const handleDragOver = e => e.preventDefault()

  // 拖拽完成事件-处理完成拖拽时的逻辑
  const handleDrop = (callback, arrow) => {
    return e => {
      const { dataset: { id }, classList } = e.target;
      classList.remove('over');
      const curData = JSON.parse(e.dataTransfer.getData('itemData'))

      callback(preData => {
        const mapPreData = JSON.parse(JSON.stringify(preData)).filter(item => item.id !== curData.id)
        if (!id) return [...mapPreData, curData]

        const index = mapPreData.findIndex(item => item.id === id)
        mapPreData.splice(index, 0, curData)
        return mapPreData
      })

      arrow === 'left' ? setRightDragList(preData => preData.filter(item => item.id !== curData.id)) : setLeftDragList(preData => preData.filter(item => item.id !== curData.id))
    }
  }

  // 拖拽元素进入目标元素时触发事件-为目标元素添加拖拽元素进入时的样式效果
  const handleDragEnter = e => e.target.classList.add('over')

  // 拖拽元素离开目标元素时触发事件-移除目标元素的样式效果
  const handleDragLeave = e => e.target.classList.remove('over')

  const [[_leftKey, _leftlist], [_rightKey, _rightlist]] = Object.entries(dataRef.current);

  return (
    <div className="dragpage">
      <Header>
        <PageHeader title="Drag" subTitle="Drag component to a frame" />
      </Header>
      <Content>
        {/* initialization  */}
        <div className="operatio_zone">
          <Button className="drag_ability">Reset</Button>
          <Link to="/mainpage">
            <Button shape="round" className="back_btn">
              Back to MainPage&emsp;
              <ion-icon class="btn_drag_icon" name="arrow-forward-outline"></ion-icon>
            </Button>
          </Link>
        </div>
        <Row justify="space-around">
          <Col span={8}>
            <div
              key={_leftKey}
              className="left-wrap"
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(_leftlist.callback, _leftKey)}
            >
              {
                _leftlist.list.map(item => 
                (<div
                  className="item-text"
                  key={item.id}
                  data-id={item.id}
                  draggable
                  onDragStart={handleDragStart(item)}
                >
                  <IconFont type={item.icon ? item.icon : null} twoToneColor={item.iconColor} />
                  {item.name}
                </div>))
              }
            </div>
          </Col>
          <Col span={16}>
            <div
              key={_rightKey}
              className="right-wrap"
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(_rightlist.callback, _rightKey)}
            >
              <SumSide selfList={_rightlist}></SumSide>
            </div>
          </Col>
        </Row>
      </Content>
    </div>
  )
}

export default DragPage;