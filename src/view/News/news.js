import { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, Spin, Empty, Pagination, Modal, Tag, Input, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { api } from '../../server/request';
import useRequest from '../../hooks/useRequest';
import './css/news.less';

const { Meta } = Card;

const NEWS_API = 'https://jsonplaceholder.typicode.com/posts';
const PAGE_SIZE = 9;
const TOTAL = 100;
const DEBOUNCE_MS = 300;

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const Highlight = ({ text, kw }) => {
  if (!kw || !text) return <>{text}</>;
  const re = new RegExp(`(${escapeRegExp(kw)})`, 'gi');
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? <mark key={i} className="news-highlight">{p}</mark> : <span key={i}>{p}</span>
      )}
    </>
  );
};

const NewsView = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setDebouncedKeyword(keyword);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [keyword]);

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

  const detailService = useCallback(
    (id, { signal }) => api.get(`${NEWS_API}/${id}`, { signal }),
    []
  );
  const { data: detail, loading: detailLoading, refetch: fetchDetail } = useRequest(
    detailService,
    { manual: true }
  );

  const relatedService = useCallback(
    (userId, { signal }) =>
      api.get(NEWS_API, { params: { userId, _limit: 100 }, signal }),
    []
  );
  const {
    data: related,
    loading: relatedLoading,
    refetch: fetchRelated
  } = useRequest(relatedService, { manual: true });

  useEffect(() => {
    if (detail?.userId != null) {
      fetchRelated(detail.userId);
    }
  }, [detail?.userId, fetchRelated]);

  const handleCardClick = (id) => {
    setActiveId(id);
    fetchDetail(id);
  };

  const handleClose = () => setActiveId(null);

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
                    title={<Highlight text={item.title} kw={debouncedKeyword} />}
                    description={<Highlight text={item.body} kw={debouncedKeyword} />}
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
                    ? page * PAGE_SIZE + 1
                    : (page - 1) * PAGE_SIZE + list.length
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
            <h3 className="news-detail-title">
              <Highlight text={detail.title} kw={debouncedKeyword} />
            </h3>
            <div className="news-detail-meta">
              <Tag color="blue">作者 {detail.userId}</Tag>
              <Tag>ID {detail.id}</Tag>
            </div>
            <p className="news-detail-body">
              <Highlight text={detail.body} kw={debouncedKeyword} />
            </p>

            <Divider style={{ margin: '20px 0 12px' }}>同作者的其他资讯</Divider>

            {relatedLoading ? (
              <div className="news-related-loading">
                <Spin size="small" />
              </div>
            ) : !related || related.length <= 1 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="该作者暂无其他资讯" />
            ) : (
              <ul className="news-related-list">
                {related
                  .filter((r) => r.id !== detail.id)
                  .map((r) => (
                    <li
                      key={r.id}
                      className="news-related-item"
                      onClick={() => handleCardClick(r.id)}
                    >
                      <span className="news-related-id">#{r.id}</span>
                      <Highlight text={r.title} kw={debouncedKeyword} />
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NewsView;
