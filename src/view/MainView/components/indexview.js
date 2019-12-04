import React, { Component } from 'react'
import '../css/indexview.css'
import { Layout, Calendar, Badge, Input, Row, Col, Button, Popover } from 'antd'
import { PostWay } from '../../../common/common'

const { Footer, Content, Header } = Layout

function getListData (value) {
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
}

const Addtext = (
  <div>
    <span>Add</span>
    <Button className="btn-tight" size="small">Add</Button>
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
    <p>Info</p>
    <Button onClick={() => addInfo()}>Sure</Button>
  </div>
)

function editInfo () {
  console.log('click edit bution')
}

function dateCellRender (value) {
  const listData = getListData(value)
  if (listData.length === 0) {
    return (
      <Popover trigger="click" title={Addtext} content={content}>
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
  console.log(clickTime)
  // open a little window and write info

}

// deal time data
function getDate (date) {
  var getdate = new Date(date)
  var year = getdate.getFullYear()
  var month = getdate.getMonth() + 1
  var day = getdate.getDate()
  return year + '-' + month + '-' + day
}

class IndexView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      val: ''
    }
  }

  searchClick = () => {
    // console.log(this.state.val)
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
                <Input onChange={this.handelChange.bind(this)} defaultValue={this.state.val} style={{ width: 200 }} placeholder="Search" size="small" />
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
          <Footer>
          </Footer>
        </Layout>
      </div>
    )
  }
}

export default IndexView
