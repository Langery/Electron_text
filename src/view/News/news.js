import { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, Spin, Empty, Pagination, Modal, Tag, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { api } from '../../server/request';
import useRequest from '../../hooks/useRequest';
import './css/news.less';

const { Meta } = Card;

// 公开 demo 接口, 接 Flask 后台时把 URL 换成相对路径 'news/list' / 'news/detail' 即可
const NEWS_API = 'https://jsonplaceholder.typicode.com/posts';
const PAGE_SIZE = 9;
const TOTAL = 100; // jsonplaceholder posts 总数固定 100; 接真后台时改为响应里的 total 字段
const DEBOUNCE_MS = 300;

const NewsView = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [activeId, setActiveId] = useState(null);

  // 防抖: keyword 停止变化 300ms 后才更新 debouncedKeyword + 重置到第 1 页
  // setPage(1) 和 setDebouncedKeyword 同 microtask 触发, React 18 自动 batch, list 只重拉一次
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setDebouncedKeyword(keyword);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [keyword]);

  // 列表请求: page 或 debouncedKeyword 变化时重拉
  const listService = useCallback(
    (_, { signal }) =>
      api.get(NEWS_API, {
        params: {
          _page: page,
          _limit: PAGE_SIZE,
          q: debouncedKeyword || undefined
        },
        signal
      }),
    [page, debouncedKeyword]
  );
  const { data: list, loading } = useRequest(listService, { deps: [page, debouncedKeyword] });

  // 详情请求: manual, 点卡片时触发
  const detailService = useCallback(
    (id, { signal }) => api.get(`${NEWS_API}/${id}`, { signal }),
    []
  );
  const { data: detail, loading: detailLoading, refetch: fetchDetail } = useRequest(
    detailService,
    { manual: true }
  );

  const handleCardClick = (id) => {
    setActiveId(id);
    fetchDetail(id);
  };

  const handleClose = () => setActiveId(null);

  // 防抖未结算时也提示用户"正在等待输入完成", 视觉反馈
  const isTyping = keyword !== debouncedKeyword;

  return (
    <div className="news-view">
      <div className="news-toolbar">
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="搜索资讯标题或正文..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          suffix={isTyping ? <Spin size="small" /> : null}
          className="news-search"
        />
        {debouncedKeyword && (
          <Tag color="blue" className="news-keyword-tag">
            当前搜索: {debouncedKeyword}
          </Tag>
        )}
      </div>

      {loading ? (
        <div className="news-loading">
          <Spin size="large" tip="加载资讯..." />
        </div>
      ) : !list || list.length === 0 ? (
        <Empty
          className="news-empty"
          description={debouncedKeyword ? `未找到「${debouncedKeyword}」相关资讯` : '暂无资讯'}
        />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {list.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={8} xl={8}>
                <Card
                  hoverable
                  className="news-card"
                  onClick={() => handleCardClick(item.id)}
                >
                  <Meta
                    title={<span className="news-title">{item.title}</span>}
                    description={<span className="news-desc">{item.body}</span>}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <div className="news-pagination">
            <Pagination
              current={page}
              total={
                debouncedKeyword
                  ? list.length === PAGE_SIZE
                    ? page * PAGE_SIZE + 1 // 当前页满, 暗示可能有下一页
                    : (page - 1) * PAGE_SIZE + list.length // 当前页不满, 已到末尾
                  : TOTAL
              }
              pageSize={PAGE_SIZE}
              showSizeChanger={false}
              onChange={setPage}
            />
          </div>
        </>
      )}

      <Modal
        title={detail ? `资讯 #${detail.id}` : '加载中...'}
        open={activeId !== null}
        onCancel={handleClose}
        footer={null}
        width={640}
        destroyOnClose
      >
        {detailLoading || !detail ? (
          <div className="news-detail-loading">
            <Spin tip="加载详情..." />
          </div>
        ) : (
          <div className="news-detail">
            <h3 className="news-detail-title">{detail.title}</h3>
            <div className="news-detail-meta">
              <Tag color="blue">作者 {detail.userId}</Tag>
              <Tag>ID {detail.id}</Tag>
            </div>
            <p className="news-detail-body">{detail.body}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NewsView;
