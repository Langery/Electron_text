import { memo, useState, useCallback } from 'react';
import chartXkcd from 'chart.xkcd';
import { Line } from 'chart.xkcd-react';
import { Radio, Button, Space, Empty } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
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

const readCandidateLibrary = () => {
  try {
    const raw = localStorage.getItem('candidateLibrary');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const isValidItem = (i) => i.name && typeof i.age === 'number' && i.age >= 0;

const buildLibraryConfig = (items) => {
  const valid = items.filter(isValidItem);
  return {
    title: valid.length > 0 ? '备选库年龄分布' : '备选库(无有效数据)',
    xLabel: '姓名',
    yLabel: '年龄',
    data: {
      labels: valid.map((i) => i.name),
      datasets: [{ label: '年龄', data: valid.map((i) => i.age) }]
    },
    options: {
      yTickCount: 3,
      legendPosition: chartXkcd.config.positionType.upLeft
    }
  };
};

const ChartxkcdIndex = memo(() => {
  const [source, setSource] = useState('demo');
  const [library, setLibrary] = useState(() => readCandidateLibrary());

  const refreshLibrary = useCallback(() => {
    setLibrary(readCandidateLibrary());
  }, []);

  const config = source === 'demo' ? DEMO_CONFIG : buildLibraryConfig(library);
  const hasValidData = source === 'demo' || library.some(isValidItem);

  return (
    <div className="chartxkcd-wrap">
      <div className="chartxkcd-controls">
        <Space>
          <Radio.Group
            value={source}
            onChange={(e) => setSource(e.target.value)}
            size="small"
          >
            <Radio.Button value="demo">Demo 数据</Radio.Button>
            <Radio.Button value="library">备选库数据</Radio.Button>
          </Radio.Group>
          {source === 'library' && (
            <Button size="small" icon={<ReloadOutlined />} onClick={refreshLibrary}>
              刷新
            </Button>
          )}
        </Space>
      </div>
      {hasValidData ? (
        <Line config={config} />
      ) : (
        <Empty
          description="备选库中没有有效数据(需要 name + age)"
          style={{ marginTop: 40 }}
        />
      )}
    </div>
  );
});

export default ChartxkcdIndex;