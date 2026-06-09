import { useState, useEffect, memo } from 'react';
import { Layout, Calendar, Input, Row, Col, Button, Badge, Popconfirm } from 'antd';
import { request } from '../../../server/request';
import '../css/indexview.less';

const { Content, Header } = Layout;

const getDate = (date, type = 0, addmonth = 1) => {
  const [NORMAL, YEARMON, MONTH, DAY] = [0, 1, 2, 3];
  const getdate = date === null ? new Date() : new Date(date);
  let year = getdate.getFullYear();
  let month = getdate.getMonth() + addmonth;
  month = month < 10 ? `0${month}` : month;
  const day = getdate.getDate();
  if (type === NORMAL) return `${year}-${month}-${day}`;
  if (type === YEARMON) return `${year}-${month}`;
  if (type === MONTH) return month;
  if (type === DAY) return day;
};

const timeStamp = (time) => Date.parse(new Date(time)) / 1000;

const getMonthData = (value) => {
  if (value.month() === 8) return 1394;
  if (value.month() === 2) return 1234;
};

const monthCellRender = (value) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};

const getListData = (value, data) => {
  let listData;
  data.forEach((yearItem) => {
    value.year() === yearItem.year && yearItem.monthList.forEach((monItem) => {
      value.month() === monItem.month && monItem.dayList.forEach((dayItem) => {
        if (value.date() === dayItem.day) {
          const tempArr = [];
          dayItem.contentList.forEach((item) => {
            tempArr.push({ type: item.type, content: item.content });
          });
          listData = tempArr;
        }
      });
    });
  });
  return listData || [];
};

const dateCellRender = (value) => {
  const date = [{
    year: 2020,
    monthList: [{
      month: 10,
      dayList: [
        { day: 1, type: 'warning', contentList: [{ type: 'success', content: 'hello' }, { type: 'warning', content: 'world' }] },
        { day: 2, type: 'success', contentList: [{ type: 'success', content: '你好' }, { type: 'warning', content: '欢迎' }] }
      ]
    }]
  }];

  const listData = getListData(value, date);

  const liList = listData.length !== 0 ? (
    listData.map((item) => (
      <li key={item.content}>
        <Badge status={item.type} text={item.content} />
      </li>
    ))
  ) : (
    <li><p className="untext" /></li>
  );

  return (
    <Popconfirm title="Are you add Infor?" okText="Add" cancelText="Cancel">
      <ul>{liList}</ul>
    </Popconfirm>
  );
};

const IndexView = () => {
  const [val, setVal] = useState('');
  const [firstData, setFirstData] = useState({});

  useEffect(() => {
    const nowtime = timeStamp(getDate(null, 1));
    const newtime = timeStamp(getDate(null, 1, 2));
    const sendData = { nowtime, newtime };

    request.post('calendar/list', sendData)
      .then((data) => {
        const processed = data.map((item) => ({
          ...item,
          createtime: getDate(item.createtime * 1000)
        }));
        console.log(processed);
        setFirstData(processed);
      })
      .catch((err) => console.error(err));
  }, []);

  const searchClick = async () => {
    const getUser = { username: val };
    try {
      const data = await request.post('canlendar', getUser);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => setVal(e.target.value);

  const selectDay = (date) => {
    const clickTime = getDate(date);
    console.log('Selected:', clickTime);
  };

  return (
    <div className="calendar_view">
      <Layout>
        <Header className="header-style">
          <Row>
            <Col span={8}>
              <span style={{ marginRight: 20 }}>User:</span>
              <Input
                onChange={handleChange}
                defaultValue={val}
                style={{ width: 180 }}
                placeholder="Search"
                size="small"
              />
            </Col>
            <Col span={8} />
            <Col span={8}>
              <Button type="primary" onClick={searchClick}>Search</Button>
            </Col>
          </Row>
        </Header>
        <Content>
          <Calendar
            onSelect={selectDay}
            dateCellRender={dateCellRender}
            className="calendar-style"
            monthCellRender={monthCellRender}
          />
        </Content>
      </Layout>
    </div>
  );
};

export default memo(IndexView);
