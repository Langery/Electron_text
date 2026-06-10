import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTabs } from '../../contexts/TabsContext';
import '../../style/tabbar.less';

const TabBar = () => {
  const { tabs, activeKey, switchTab, closeTab } = useTabs();
  const navigate = useNavigate();

  if (tabs.length === 0) return null;

  const items = tabs.map((t) => ({
    key: t.key,
    label: t.title,
    closable: t.closable !== false
  }));

  const handleChange = (key) => {
    switchTab(key);
    navigate(key);
  };

  const handleEdit = (key, action) => {
    if (action === 'remove') closeTab(key);
  };

  return (
    <div className="tabbar-wrap">
      <Tabs
        type="editable-card"
        activeKey={activeKey}
        items={items}
        onChange={handleChange}
        onEdit={handleEdit}
        hideAdd
        size="small"
      />
    </div>
  );
};

export default TabBar;