import React, { useState, useRef } from "react";
import './demo.css'

const list = [
  {
    id: '1',
    text: 'Num 1'
  },
  {
    id: '2',
    text: 'Num 2'
  },
  {
    id: '3',
    text: 'Num 3'
  },
  {
    id: '4',
    text: 'Num 4'
  },
  {
    id: '5',
    text: 'Num 5'
  }
];

const DragDemo = () => {

  const [leftDragList, setLeftDragList] = useState(list)
  const [rightDragList, setRightDragList] = useState([])
  const dataRef = useRef(null)

  // 初始化
  dataRef.current = {
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

      if (arrow === 'left') setRightDragList(preData => preData.filter(item => item.id !== curData.id))
      else setLeftDragList(preData => preData.filter(item => item.id !== curData.id))
    }
  }

  // 拖拽元素进入目标元素时触发事件-为目标元素添加拖拽元素进入时的样式效果
  const handleDragEnter = e => e.target.classList.add('over')

  // 拖拽元素离开目标元素时触发事件-移除目标元素的样式效果
  const handleDragLeave = e => e.target.classList.remove('over')

  // 拖拽开始时触发事件-通过dataTransfer对象设置所需要的数据
  const handleDragStart = data => e => e.dataTransfer.setData('itemData', JSON.stringify(data))

  return (
    <div className="dragEvent-wrap">
      {
        Object.entries(dataRef.current).map(([key, { callback, list }]) => {
          return (
            <div
              key={key}
              className="content-wrap"
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(callback, key)}
            >
              {
                list.map(item => 
                (<div
                  className="item-text"
                  key={item.id}
                  data-id={item.id}
                  draggable
                  onDragStart={handleDragStart(item)}
                >
                  {item.text}
                </div>))
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default DragDemo;