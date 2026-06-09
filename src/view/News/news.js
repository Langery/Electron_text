import { useState, useCallback } from 'react';
import { Card, Row, Col, Spin, Empty, Pagination, Modal, Tag } from 'antd';
import { api } from '../../server/request';
import useRequest from '../../hooks/useRequest';
import './css/news.less';

const { Meta } = Card;

// 公开 demo 接口, 接 Flask 后台时把 URL 换成相对路径 'news/list' / 'news/detail' 即可
const NEWS_API = 'https://jsonplaceholder.typicode.com/posts';
const PAGE_SIZE = 9;
const TOTAL = 100; // jsonplaceholder posts 总数固定 100; 接真后台时改为响应里的 total 字段

const NewsView = () => {
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState(null);

  // 列表请求: page 变化时重拉 (deps: [page])
  const listService = useCallback(
    (_, { signal }) =>
      api.get(NEWS_API, {
        params: { _page: page, _limit: PAGE_SIZE },
        signal
      }),
    [page]
  );
  const { data: list, loading } = useRequest(listService, { deps: [page] });

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

  return (
    <div className="news-view">
      {loading ? (
        <div className="news-loading">
          <Spin size="large" tip="加载资讯..." />
        </div>
      ) : !list || list.length === 0 ? (
        <Empty className="news-empty" description="暂无资讯" />
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
              total={TOTAL}
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
