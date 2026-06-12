import { memo, useMemo, useState } from 'react';
import { Card, Empty, Button, Tag, Space, Input } from 'antd';
import { ReloadOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { sortLibrary } from '../../utils/librarySort';
import '../../style/libraryOverview.less';

const { Meta } = Card;

const DEFAULT_SETTINGS = { theme: 'light', librarySort: 'time', libraryMaxItems: 100 };

const formatAge = (age) => (typeof age === 'number' && age >= 0 ? `${age}岁` : '未填写');

const matchesKeyword = (item, kw) => {
  if (!kw) return true;
  const lower = kw.toLowerCase();
  return (item.name || '').toLowerCase().includes(lower)
    || (item.nickname || '').toLowerCase().includes(lower);
};

const LibraryOverview = memo(() => {
  const [items, , refresh] = useLocalStorage('candidateLibrary', []);
  const [settings] = useLocalStorage('appSettings', DEFAULT_SETTINGS);
  const [keyword, setKeyword] = useState('');

  const displayItems = useMemo(
    () => sortLibrary(items, settings.librarySort).slice(0, settings.libraryMaxItems),
    [items, settings.librarySort, settings.libraryMaxItems]
  );

  const searchedItems = useMemo(
    () => displayItems.filter((i) => matchesKeyword(i, keyword)),
    [displayItems, keyword]
  );

  const desc = keyword
    ? `匹配 ${searchedItems.length} / 显示 ${displayItems.length} / 共 ${items.length} 项`
    : `显示 ${displayItems.length} / 共 ${items.length} 项`;

  return (
    <Card className="library-overview-card" hoverable>
      <div className="library-overview-header">
        <Space size="middle">
          <Meta title="备选库总览" description={desc} />
          <Input
            allowClear
            placeholder="搜索 姓名 / 昵称"
            prefix={<SearchOutlined />}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: 200 }}
            size="small"
          />
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
      ) : searchedItems.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={`没有匹配「${keyword}」的候选项`}
          style={{ padding: '24px 0' }}
        />
      ) : (
        <div className="library-overview-grid">
          {searchedItems.map((item) => (
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