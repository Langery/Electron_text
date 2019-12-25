import React, { Component } from 'react'
import '../css/indexview.css'
import { Layout, Calendar, Badge, Input, Row, Col, Button, Popover, Select } from 'antd'
import { PostWay } from '../../../common/common'

const { Content, Header } = Layout
const { Option } = Select

const data = {
  flag: false,
  date: '',
  dateBool: {
    flag: false,
    date: ''
  }
}


function getListData (value) {
  console.log(data)
  let listData

  var thisMonth = value.month() + 1

  if (thisMonth === 12) {
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' }
        ]
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' }
        ]
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' }
        ]
        break;
      default:
    }
  }

  return listData || []
}

function addInfo () {
  console.log('add info')
  const dateBool = data.dateBool
  dateBool.flag = !dateBool.flag
}

function upInfo () {
  console.log('up info')
}

const Addtext = (
  <div>
    <span>Add</span>
    <Button className="btn-tight" size="small" onClick={() => addInfo()}>Add</Button>
  </div>
)
const Edittext = (
  <div>
    <span>Edit</span>
    <Button className="btn-tight" size="small" onClick={() => editInfo()}>Edit</Button>
  </div>
)
const content = (
  <div>
    <p>info</p>
    <div>
      <Input placeholder="Add infor" />
      <Select>
        <Option value="success">Success</Option>
        <Option value="warning">Warning</Option>
        <Option value="error">Error</Option>
      </Select>
    </div>
    <Button onClick={() => upInfo()}>Sure</Button>
  </div>
)

function dealContent (item) {
  // console.log(item)
  if (!item.flag) {
    return <p>deal infor {data.date}</p>
  } else {
    return <div>
    <Select style={{ width: 70}}>
      <Option value="success">Success</Option>
      <Option value="warning">Warning</Option>
      <Option value="error">Error</Option>
    </Select>
    <Input placeholder="Add infor" style={{ width: 150, marginLeft: 5}} />
  </div>
  }
}

function editInfo () {
  console.log('click edit bution')
}

function dateCellRender (value) {

  const listData = getListData(value)

  if (listData.length === 0) {
    return (
      <Popover trigger="click" title={Addtext} content={dealContent(data.dateBool)}>
        <ul style={{height: '80%'}}></ul>
      </Popover>
    )
  } else {
    return (
      <Popover trigger="click" title={Edittext} content={content}>
        <ul className="events">
          {listData.map(item => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      </Popover>
    )
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
  var clickTime = getDate(date)
  // console.log(clickTime)
  data.dateBool.date = clickTime
  data.date = clickTime
  // open a little window and write info
}

// deal time data
function getDate (date, type = 0) {
  var getdate = date === null ? new Date() : new Date(date)
  var year = getdate.getFullYear()
  var month = getdate.getMonth() + 1
  var day = getdate.getDate()
  return type === 0 ? year + '-' + month + '-' + day : year + '-' + month
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
    const nowtime = getDate(null, 1)
    console.log(nowtime)
    let sendData = { time: nowtime }
    const getCalendar = PostWay(sendData, 'calendar/list')
    fetch(getCalendar[0], getCalendar[1])
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(this)
        this.setState({
          firstData: data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  searchClick = () => {
    // request
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
      <div className="">
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
            <Calendar onSelect={selectDay} className="calendar-style" dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
          </Content>
        </Layout>
      </div>
    )
  }
}

export default IndexView
