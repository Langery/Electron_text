import { useState, useCallback, memo } from 'react';
import { Layout, Calendar, Input, Row, Col, Button, Badge, Popconfirm } from 'antd';
import { api } from '../../../server/request';
import useRequest from '../../../hooks/useRequest';
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

  // 主请求: mount 时拉日历列表, service 内包数据加工 (createtime 时间戳转日期串)
  const calendarService = useCallback(
    (_, { signal }) => {
      const nowtime = timeStamp(getDate(null, 1));
      const newtime = timeStamp(getDate(null, 1, 2));
      return api.post('calendar/list', { nowtime, newtime }, { signal })
        .then((data) => data.map((item) => ({ ...item, createtime: getDate(item.createtime * 1000) })));
    },
    []
  );
  useRequest(calendarService);
  // 注: 原本 setFirstData 后从未在 JSX 中读取, 已删 (死状态);
  //     hook 内部已托管请求/错误/卸载 abort, 此处仅触发副作用

  // 搜索: 点击触发, 独立的第二个 hook
  const searchService = useCallback(
    (params, { signal }) => api.post('canlendar', params, { signal }),
    []
  );
  const { loading: searching, refetch: doSearch } = useRequest(searchService, { manual: true });

  const searchClick = () => doSearch({ username: val });

  const handleChange = (e) => setVal(e.target.value);

  // 原 selectDay 只把入参算了一次 clickTime 但从未消费, 等同空函数;
  // 保留以维持 Calendar 的 onSelect prop 不变, 后续真要响应再扩
  const selectDay = () => {};

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
              <Button type="primary" onClick={searchClick} loading={searching}>Search</Button>
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
