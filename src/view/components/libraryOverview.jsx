import { memo, useState, useCallback } from 'react';
import { Card, Empty, Button, Tag, Space } from 'antd';
import { ReloadOutlined, UserAddOutlined } from '@ant-design/icons';
import '../../style/libraryOverview.less';

const { Meta } = Card;

const readCandidateLibrary = () => {
  try {
    const raw = localStorage.getItem('candidateLibrary');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const formatAge = (age) => (typeof age === 'number' && age > 0 ? `${age}岁` : '未填写');

const LibraryOverview = memo(() => {
  const [items, setItems] = useState(() => readCandidateLibrary());

  const refresh = useCallback(() => {
    setItems(readCandidateLibrary());
  }, []);

  return (
    <Card className="library-overview-card" hoverable>
      <div className="library-overview-header">
        <Space>
          <Meta title="备选库总览" description={`共 ${items.length} 项 · 来自表单 + 加入备选库`} />
        </Space>
        <Button size="small" icon={<ReloadOutlined />} onClick={refresh}>
          刷新
        </Button>
      </div>

      {items.length === 0 ? (
        <Empty
          image={<UserAddOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />}
          description="还没有备选项,点上方「新增」表单填好后 + 加入备选库"
          style={{ padding: '24px 0' }}
        />
      ) : (
        <div className="library-overview-grid">
          {items.map((item) => (
            <Card
              key={item.id}
              size="small"
              className="library-overview-item"
              title={<span className="library-item-name">{item.name || '未命名'}</span>}
              extra={<Tag color="green">{formatAge(item.age)}</Tag>}
            >
              <div className="library-item-meta">
                {item.nickname && <span>昵称:{item.nickname}</span>}
                {item.createTime && <span>添加于:{item.createTime}</span>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
});

export default LibraryOverview;