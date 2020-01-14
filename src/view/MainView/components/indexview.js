import React, { Component } from 'react'
import '../css/indexview.css'
// Badge,
import { Layout, Calendar, Input, Row, Col, Button, Popover, Select } from 'antd'
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

// value 日 day  2020-01-04
// function getListData1 (uid,date) {

//   //查数据库  按天查
//   listDbdate = [{
//     "userId": "langery",
//     "event": "new",
//     "createtime": "2020-01-01",
//     "status": "1",
//     "newtime": "2020-01-01"
//   },...];

//   //数据转换
//   /*
//     status -> type
//     evet -> content
//     createtime   long->string
//   */
//   data = getDate4DbData(dbdate);

//   listData = [
//     { type: 'warning', content: 'This is warning event.' },
//     { type: 'success', content: 'This is usual event.' }
//   ]
//   return listData || []
// }

function getListData (value) {

  console.log(value)

  let listData = []
  if (JSON.stringify(value) === '{}') { return }
  for (var item in value) {
    // console.log(value[item])
    const sendList = {
      type: value[item].status,
      constent: value[item].event
    }

    listData.push(sendList)
  }
  console.log(listData)
  // var thisYear = value.year()
  var thisMonth = getDate(null, 2)
  console.log(thisMonth)
  if (thisMonth) {

  }
  // if (thisMonth === 12) {
  //   switch (value.date()) {
  //     case 8:
  //       listData = [
  //         { type: 'warning', content: 'This is warning event.' },
  //         { type: 'success', content: 'This is usual event.' }
  //       ]
  //       break;
  //     case 10:
  //       listData = [
  //         { type: 'warning', content: 'This is warning event.' },
  //         { type: 'success', content: 'This is usual event.' },
  //         { type: 'error', content: 'This is error event.' }
  //       ]
  //       break;
  //     case 15:
  //       listData = [
  //         { type: 'warning', content: 'This is warning event' },
  //         { type: 'success', content: 'This is very long usual event。。....' },
  //         { type: 'error', content: 'This is error event 1.' },
  //         { type: 'error', content: 'This is error event 2.' },
  //         { type: 'error', content: 'This is error event 3.' },
  //         { type: 'error', content: 'This is error event 4.' }
  //       ]
  //       break;
  //     default:
  //   }
  // }

  return listData || []
}

function addInfo () {
  console.log('add info')
  const dateBool = data.dateBool
  dateBool.flag = !dateBool.flag
}

// function upInfo () {
//   console.log('up info')
// }

const Addtext = (
  <div>
    <span>Add</span>
    <Button className="btn-tight" size="small" onClick={() => addInfo()}>Add</Button>
  </div>
)
// const Edittext = (
//   <div>
//     <span>Edit</span>
//     <Button className="btn-tight" size="small" onClick={() => editInfo()}>Edit</Button>
//   </div>
// )
// const content = (
//   <div>
//     <p>info</p>
//     <div>
//       <Input placeholder="Add infor" />
//       <Select>
//         <Option value="success">Success</Option>
//         <Option value="warning">Warning</Option>
//         <Option value="error">Error</Option>
//       </Select>
//     </div>
//     <Button onClick={() => upInfo()}>Sure</Button>
//   </div>
// )

function dealContent (item) {
  console.log(item)
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

// function editInfo () {
//   console.log('click edit bution')
// }

function dateCellRender (value) {
  console.log(value)
  const listData = getListData(value)
  console.log(listData)
  if (listData === undefined) { return }

  if (listData.length === 0) {
    return (
      <Popover trigger="click" title={Addtext} content={dealContent(data.dateBool)} key={Addtext}>
        <ul style={{height: '80%'}}></ul>
      </Popover>
    )
  } /* else {
    return (
      // <Popover trigger="click" title={Edittext} content={content} key={Edittext}>
      //   <ul className="events">
      //     {listData.map(item => (
      //       <li key={item.content}>
      //         <Badge status={item.type} text={item.content} />
      //       </li>
      //     ))}
      //   </ul>
      // </Popover>
    )
  }*/
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
    console.log(nowtime)
    console.log(newtime)

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
            <Calendar onSelect={selectDay} className="calendar-style" dateCellRender={dateCellRender(this.state.firstData)} monthCellRender={monthCellRender} />
          </Content>
        </Layout>
      </div>
    )
  }
}

export default IndexView
