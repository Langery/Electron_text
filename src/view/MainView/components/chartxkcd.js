import { memo, useState } from 'react';
import chartXkcd from 'chart.xkcd';
import { Line, Bar } from 'chart.xkcd-react';
import { Radio, Button, Space, Empty, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import '../../../style/chartxkcd.less';

const DEMO_CONFIG = {
  title: 'Monthly income of an indie developer',
  xLabel: 'Month',
  yLabel: '$ Dollors',
  data: {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      { label: 'Plan', data: [30, 70, 200, 300, 500, 800] },
      { label: 'Reality', data: [0, 1, 30, 70, 80, 100, 50] }
    ]
  },
  options: {
    yTickCount: 3,
    legendPosition: chartXkcd.config.positionType.upLeft
  }
};

const DIMENSION_CONFIG = {
  age: {
    title: '备选库年龄分布',
    yLabel: '年龄',
    validate: (i) => i.name && typeof i.age === 'number' && i.age >= 0,
    extract: (i) => i.age
  },
  nickname: {
    title: '备选库昵称字数',
    yLabel: '字数',
    validate: (i) => i.name && typeof i.nickname === 'string' && i.nickname.length > 0,
    extract: (i) => i.nickname.length
  },
  days: {
    title: '备选库添加时间(距今天数)',
    yLabel: '天数',
    validate: (i) => i.name && i.createTime,
    extract: (i) => Math.floor((Date.now() - new Date(i.createTime).getTime()) / 86400000)
  }
};

const DEFAULT_SETTINGS = { theme: 'light', librarySort: 'time', libraryMaxItems: 100 };

const buildLibraryConfig = (items, dimension, maxItems) => {
  const cfg = DIMENSION_CONFIG[dimension] || DIMENSION_CONFIG.age;
  const valid = items.filter(cfg.validate).slice(0, maxItems);
  return {
    title: valid.length > 0 ? cfg.title : `备选库(${cfg.yLabel} 维度无有效数据)`,
    xLabel: '姓名',
    yLabel: cfg.yLabel,
    data: {
      labels: valid.map((i) => i.name),
      datasets: [{ label: cfg.yLabel, data: valid.map(cfg.extract) }]
    },
    options: {
      yTickCount: 3,
      legendPosition: chartXkcd.config.positionType.upLeft
    }
  };
};

const ChartxkcdIndex = memo(() => {
  const [source, setSource] = useState('demo');
  const [viewType, setViewType] = useState('line');
  const [dimension, setDimension] = useState('age');
  const [library, , refreshLibrary] = useLocalStorage('candidateLibrary', []);
  const [settings] = useLocalStorage('appSettings', DEFAULT_SETTINGS);

  const config = source === 'demo'
    ? DEMO_CONFIG
    : buildLibraryConfig(library, dimension, settings.libraryMaxItems);
  const hasValidData = source === 'demo'
    || library.some((DIMENSION_CONFIG[dimension] || DIMENSION_CONFIG.age).validate);
  const ChartComp = viewType === 'bar' ? Bar : Line;

  return (
    <div className="chartxkcd-wrap">
      <div className="chartxkcd-controls">
        <Space wrap>
          <Radio.Group
            value={source}
            onChange={(e) => setSource(e.target.value)}
            size="small"
          >
            <Radio.Button value="demo">Demo 数据</Radio.Button>
            <Radio.Button value="library">备选库数据</Radio.Button>
          </Radio.Group>
          <Radio.Group
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            size="small"
          >
            <Radio.Button value="line">折线</Radio.Button>
            <Radio.Button value="bar">柱状</Radio.Button>
          </Radio.Group>
          {source === 'library' && (
            <Select
              value={dimension}
              onChange={setDimension}
              size="small"
              style={{ width: 130 }}
              options={[
                { value: 'age', label: '维度:年龄' },
                { value: 'nickname', label: '维度:昵称字数' },
                { value: 'days', label: '维度:添加天数' }
              ]}
            />
          )}
          {source === 'library' && (
            <Button size="small" icon={<ReloadOutlined />} onClick={refreshLibrary}>
              刷新
            </Button>
          )}
        </Space>
      </div>
      {hasValidData ? (
        <ChartComp config={config} />
      ) : (
        <Empty
          description={`备选库中没有该维度的有效数据(需要 name + ${(DIMENSION_CONFIG[dimension] || DIMENSION_CONFIG.age).yLabel})`}
          style={{ marginTop: 40 }}
        />
      )}
    </div>
  );
});

export default ChartxkcdIndex;
