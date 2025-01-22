import React, { Component } from 'react';
import '../css/indexview.less';
// Badge, Popover, Select
import { Layout, Calendar, Input, Row, Col, Button, Badge, Popconfirm } from 'antd';
import { PostWay } from '../../../server/request';

const { Content, Header } = Layout;

const data = {
  flag: false,
  date: '',
  dateBool: {
    flag: false,
    date: ''
  }
}

function getMonthData (value) {
  if (value.month() === 8) { // Sep has 1394, month add once
    return 1394
  } else if (value.month() === 2) {
    return 1234
  }
}

// click year show infor
function monthCellRender (value) {
  const num = getMonthData(value)
  return num ? (
    // this data from backstage
    // TODO: restructure
    <div className="notes-month">
      <section>{ num }</section>
      <span>Backlog number</span>
    </div>
  ) : null
}

function selectDay (date) {
  // get the time
  const clickTime = getDate(date)
  data.dateBool.date = clickTime
  data.date = clickTime
  // open a little window and write infor
}

function getDate (date, type = 0, addmonth = 1) {
  let [NORMAL, YEARMON, MONTH, DAY] = [0, 1, 2, 3];
  let getdate = date === null ? new Date() : new Date(date);
  let year = getdate.getFullYear();
  let month = getdate.getMonth() + addmonth;
  month = month < 10 ? `0${month}` : month;
  let day = getdate.getDate();
  if (type === NORMAL) {
    return `${year}-${month}-${day}`;
  } else if (type === YEARMON) {
    return `${year}-${month}`;
  } else if (type === MONTH) {
    return month;
  } else if (type === DAY) {
    return day;
  }
}

// time stamp
function timeStamp (time) {
  let backTime = Date.parse(new Date(time)) / 1000
  return backTime
}

function getListData (value, data) {
  let listData;
  // month 默认是 +1 的
  data.forEach(yearItem => {
    value.year() === yearItem.year && yearItem.monthList.forEach(monItem => {
      value.month() === monItem.month && monItem.dayList.forEach(dayItem => {
        if (value.date() === dayItem.day) {
          let tempArr = []
          dayItem.contentList.forEach((item) => {
            const sendTemp = {
              type: item.type,
              content: item.content
            }
            tempArr.push(sendTemp)
          })
          listData = tempArr;
        }
      })
    })
  })
  return listData || [];
}

function dateCellRender (value) {
  let date = [
    {
      "year": 2020,
      "monthList": [
        {
          "month": 10,
          "dayList": [
            {
              "day": 1,
              "type": "warning",
              "contentList": [
                {
                  "type": "success",
                  "content": "hello"
                },
                {
                  "type": "warning",
                  "content": "world"
                }
              ]
            },
            {
              "day": 2,
              "type": "success",
              "contentList": [
                {
                  "type": "success",
                  "content": "你好"
                },
                {
                  "type": "warning",
                  "content": "欢迎"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  const listData = getListData(value, date);
  let liList;
  if (listData.length !== 0) {
    liList = (
      listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))
    )
  }else {
    liList = (
      <li>
        <p className="untext"></p>
      </li>
    )
  }
  let arrHTML = (
    <Popconfirm title="Are you add Infor?" okText="Add" cancelText="Cancel">
      <ul>
        {liList}
      </ul>
    </Popconfirm>
  )

  return arrHTML
}

class IndexView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      val: '',
      firstData: {}
    }
  }
  // DOM 渲染前调用
  componentWillMount () {
    // 处理时间戳 time stamp
    const nowtime = timeStamp(getDate(null, 1))
    const newtime = timeStamp(getDate(null, 1, 2)) // newtime 一个月后的时间戳

    let sendData = {
      nowtime: nowtime,
      newtime: newtime
    }
    const getCalendar = PostWay(sendData, 'calendar/list')
    fetch(getCalendar[0], getCalendar[1])
      .then(response => {
        return response.json()
      })
      .then(data => {
        data.forEach(item => {
          item.createtime = getDate(item.createtime * 1000)
        })
        console.log(data)
        this.setState({
          firstData: data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  searchClick = () => {
    const getUser = {
      username: this.state.val
    }
    const getWay = PostWay(getUser, 'canlendar')
    console.log(getWay)
    fetch(getWay[0], getWay[1])
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
      })
  }

  handelChange (e) {
    this.setState({
      val: e.target.value
    })
  }

  render () {
    return (
      <div className='calendar_view'>
        <Layout>
          <Header className="header-style">
            {/* 分栏 */}
            <Row>
              <Col span={8}>
                {/* 查询框：
                  姓名、内容
                */}
                <span style={{ marginRight: 20 }}>User:</span>
                <Input onChange={this.handelChange.bind(this)} defaultValue={this.state.val} style={{ width: 180 }} placeholder="Search" size="small" />
              </Col>
              <Col span={8}>

              </Col>
              <Col span={8}>
                {/* 录入框 - button & 侧边栏 */}
                <Button type="primary" icon="search" size="small" onClick={() => this.searchClick()}>Search</Button>
              </Col>
            </Row>
          </Header>
          {/* 日历展示 */}
          <Content>
            {/* this.state.firstData */}
            <Calendar onSelect={selectDay} dateCellRender={dateCellRender} className="calendar-style" monthCellRender={monthCellRender} />
          </Content>
        </Layout>
      </div>
    )
  }
}

export default IndexView
