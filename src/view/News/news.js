import { useCallback } from 'react';
import { Card, Row, Col, Spin, Empty } from 'antd';
import { api } from '../../server/request';
import useRequest from '../../hooks/useRequest';
import './css/news.less';

const { Meta } = Card;

// 公开 demo 接口, 接 Flask 后台时把 URL 换成相对路径 'news/list' 即可
const NEWS_API = 'https://jsonplaceholder.typicode.com/posts';
const PAGE_SIZE = 9;

const NewsView = () => {
  const listService = useCallback(
    (_, { signal }) =>
      api.get(NEWS_API, {
        params: { _page: 1, _limit: PAGE_SIZE },
        signal
      }),
    []
  );

  const { data: list, loading } = useRequest(listService);

  if (loading) {
    return (
      <div className="news-loading">
        <Spin size="large" tip="加载资讯..." />
      </div>
    );
  }

  if (!list || list.length === 0) {
    return <Empty className="news-empty" description="暂无资讯" />;
  }

  return (
    <div className="news-view">
      <Row gutter={[16, 16]}>
        {list.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card hoverable className="news-card">
              <Meta
                title={<span className="news-title">{item.title}</span>}
                description={<span className="news-desc">{item.body}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NewsView;
