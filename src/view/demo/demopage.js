import { memo } from 'react';
import { Card, Tag, Empty, Space, Typography } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import ExcelSelf from '../components/excel';
import TalkSelf from '../components/talk';
import MapSelf from '../MainView/components/map';
import RoughSelf from '../MainView/components/rough';
import ConnectSelf from '../MainView/components/connenct';
import ListSelf from '../MainView/components/listed';
import '../../style/demo.less';

const { Title, Paragraph } = Typography;

const DEMO_CARDS = [
  {
    key: 'excel',
    name: 'Excel',
    source: 'src/view/components/excel.js',
    status: 'real',
    summary: 'antd Upload 封装,带 forwardRef 导出。',
    render: () => <ExcelSelf />
  },
  {
    key: 'note',
    name: 'Note',
    source: 'src/view/components/note.js',
    status: 'stub',
    summary: 'TS interface 演示(IDemoProps / extendDemoProps),文件含 TS 语法需 tsconfig 才能编译,当前 Vite 工程暂跳渲染。',
    render: null
  },
  {
    key: 'talk',
    name: 'Talk',
    source: 'src/view/components/talk.js',
    status: 'real',
    summary: '聊天输入框,读 sessionStorage.name 做发送人标识。',
    render: () => <TalkSelf />
  },
  {
    key: 'rough',
    name: 'Rough',
    source: 'src/view/MainView/components/rough.js',
    status: 'real',
    summary: 'rough-charts + react-rough 手绘风格图表,双 LineSeries + 表情符号 Path。',
    render: () => <RoughSelf />
  },
  {
    key: 'map',
    name: 'Map',
    source: 'src/view/MainView/components/map.js',
    status: 'stub',
    summary: 'MapVGL 占位,需要接入地图实例才可显示。',
    render: () => <MapSelf />
  },
  {
    key: 'connect',
    name: 'Connect',
    source: 'src/view/MainView/components/connenct.js',
    status: 'stub',
    summary: '连接状态指示器占位(空组件),计划用作 WebSocket / IPC 状态展示。',
    render: () => <ConnectSelf />
  },
  {
    key: 'list',
    name: 'List',
    source: 'src/view/MainView/components/listed.js',
    status: 'stub',
    summary: '列表视图占位(空组件),计划承载备选库的另一种展示形态(区别于 LibraryOverview 卡片网格)。',
    render: () => <ListSelf />
  }
];

const STATUS_META = {
  real: { color: 'green', text: '已实装' },
  stub: { color: 'default', text: '占位' }
};

const DemoPage = memo(() => (
  <div className="demo-page">
    <div className="demo-header">
      <Title level={3} style={{ margin: 0 }}>组件库 Demo 总览</Title>
      <Paragraph type="secondary" style={{ margin: '4px 0 0' }}>
        收纳散落在 components/ 和 MainView/components/ 下的 7 个 demo 组件。
        已实装的 3 个可在下方交互;占位的 4 个展示空状态。
      </Paragraph>
    </div>

    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {DEMO_CARDS.map((d) => {
        const meta = STATUS_META[d.status];
        return (
          <Card
            key={d.key}
            className="demo-card"
            hoverable
            title={
              <Space>
                <CodeOutlined />
                <span>{d.name}</span>
                <Tag color={meta.color}>{meta.text}</Tag>
              </Space>
            }
            extra={<span className="demo-card-source">{d.source}</span>}
          >
            <Paragraph type="secondary" style={{ margin: '0 0 12px' }}>{d.summary}</Paragraph>
            <div className="demo-card-stage">
              {d.status === 'stub' ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="该组件为占位 stub,暂无可演示内容"
                />
              ) : (
                d.render()
              )}
            </div>
          </Card>
        );
      })}
    </Space>
  </div>
));

export default DemoPage;
