import React, { Component } from 'react'
import '../css/indexview.css'
// Badge, Popover, Select
import { Layout, Calendar, Input, Row, Col, Button } from 'antd'
// import { PostWay } from '../../../common/common'
import { PostWay } from '../../../server/request'

const { Content, Header } = Layout
// const { Option } = Select

const data = {
  flag: false,
  date: '',
  dateBool: {
    flag: false,
    date: ''
  }
}

function getMonthData (value) {
  if (value.month() === 8) {
    // Sep has 1394
    return 1394
  }
}

function monthCellRender (value) {
  const num = getMonthData(value)
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null
}

function selectDay (date) {

  // get the time
  const clickTime = getDate(date)
  // console.log(clickTime)
  data.dateBool.date = clickTime
  data.date = clickTime
  // open a little window and write info
}

// deal time data
/**
 * type 0 : yyyy-mm-dd
 * type 1 : yyyy-mm
 * type 2 : mm
 * type 3 : dd
 */
function getDate (date, type = 0, addmonth = 1) {

  let getdate = date === null ? new Date() : new Date(date)
  let year = getdate.getFullYear()
  let month = getdate.getMonth() + addmonth
  month = month < 10 ? '0' + month : month
  let day = getdate.getDate()
  if (type === 0) {
    return year + '-' + month + '-' + day
  } else if (type === 1) {
    return year + '-' + month
  } else if (type === 2) {
    return month
  } else if (type === 3) {
    return day
  }
}

// time stamp
function timeStamp (time) {
  let backTime = Date.parse(new Date(time)) / 1000
  return backTime
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
          <Content>
            {/* this.state.firstData */}
            <Calendar onSelect={selectDay} className="calendar-style" monthCellRender={monthCellRender} />
          </Content>
        </Layout>
      </div>
    )
  }
}

export default IndexView
