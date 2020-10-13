import React, { Component } from 'react'
import '../css/indexview.css'
// Badge, Popover, Select
import { Layout, Calendar, Input, Row, Col, Button, Badge, Popconfirm } from 'antd'
import { PostWay } from '../../../server/request'

const { Content, Header } = Layout

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
  month = month < 10 ? '0' + month : month;
  let day = getdate.getDate();
  if (type === NORMAL) {
    return year + '-' + month + '-' + day;
  } else if (type === YEARMON) {
    return year + '-' + month;
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

function getListData (value) {
  let listData;
  // month 默认是 +1 的
  switch (value.year()) {
    case 2020: // year
      switch (value.month()) {
        case 8: // month
          switch (value.date()) {
            case 2: // day
              listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
              ];
              break;
            case 18:
              listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
              ];
              break;
            case 20:
              listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
              ];
              break;
            default:
          }
          break;
        case 9:
          switch (value.date()) {
            case 8:
              listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
              ];
              break;
            case 10:
              listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
              ];
              break;
            case 15:
              listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
              ];
              break;
            default:
          }
          break;
        default:
      }
      break;
    default:
  }
  return listData || [];
}

function dateCellRender (value) {
  const listData = getListData(value);
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
      <li></li>
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
      <div>
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
