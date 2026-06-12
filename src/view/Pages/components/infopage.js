import { memo } from 'react';
import { Tag, Empty } from 'antd';
import '../../../style/infoipage.less';

const LibraryDetail = memo(({ item }) => (
  <div className="info_detail">
    <h3 className="info_title">{item.name}</h3>
    <Tag color="green" className="info_tag">备选库</Tag>
    <div className="info_fields">
      {item.age != null && (
        <div className="info_field">
          <span className="info_label">年龄</span>
          <span className="info_value">{item.age}岁</span>
        </div>
      )}
      {item.nickname && (
        <div className="info_field">
          <span className="info_label">昵称</span>
          <span className="info_value">{item.nickname}</span>
        </div>
      )}
      {item.createTime && (
        <div className="info_field">
          <span className="info_label">添加时间</span>
          <span className="info_value">{item.createTime}</span>
        </div>
      )}
    </div>
  </div>
));

const MenuDetail = memo(({ item }) => (
  <div className="info_detail">
    <h3 className="info_title">{item.name}</h3>
    <Tag color="blue" className="info_tag">菜单组件</Tag>
    <div className="info_fields">
      {item.icon && (
        <div className="info_field">
          <span className="info_label">图标</span>
          <span className="info_value">{item.icon}</span>
        </div>
      )}
      {item.info && (
        <div className="info_field">
          <span className="info_label">信息</span>
          <span className="info_value">{item.info}</span>
        </div>
      )}
      <div className="info_field">
        <span className="info_label">编号</span>
        <span className="info_value">{item.number}</span>
      </div>
    </div>
  </div>
));

const InfoPage = memo(({ item }) => {
  if (!item) {
    return (
      <div id="info_page">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="点击右侧组件查看详情"
          style={{ padding: '24px 0' }}
        />
      </div>
    );
  }

  return (
    <div id="info_page">
      {item.source === 'library' ? <LibraryDetail item={item} /> : <MenuDetail item={item} />}
    </div>
  );
});

export default InfoPage;
