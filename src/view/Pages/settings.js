import { memo, useCallback } from 'react';
import { Card, Form, Radio, Select, InputNumber, Space, Tag, message } from 'antd';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import '../../style/settings.less';

const DEFAULT_SETTINGS = {
  theme: 'light',
  librarySort: 'time',
  libraryMaxItems: 100
};

const SORT_OPTIONS = [
  { value: 'time', label: '按添加时间(最新在前)' },
  { value: 'name', label: '按姓名(A-Z)' },
  { value: 'age', label: '按年龄(大→小)' }
];

const SettingsPage = memo(() => {
  const [settings, setSettings] = useLocalStorage('appSettings', DEFAULT_SETTINGS);

  const update = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    message.success('设置已保存');
  }, [setSettings]);

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>设置</h2>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          偏好即时生效,自动持久化到 localStorage
        </p>
      </div>

      <Card className="settings-card" hoverable>
        <Form className="settings-form" layout="vertical">
          <Form.Item label={<span className="settings-label">主题</span>}>
            <Radio.Group
              value={settings.theme}
              onChange={(e) => update('theme', e.target.value)}
            >
              <Radio.Button value="light">浅色</Radio.Button>
              <Radio.Button value="dark">深色</Radio.Button>
            </Radio.Group>
            <div className="settings-hint">切换后立即生效,影响全站背景/文字色</div>
          </Form.Item>

          <Form.Item label={<span className="settings-label">备选库排序</span>}>
            <Select
              value={settings.librarySort}
              onChange={(v) => update('librarySort', v)}
              style={{ width: 240 }}
              options={SORT_OPTIONS}
            />
            <div className="settings-hint">影响 mainpage 备选库总览卡和 dragpage 备选库区的展示顺序</div>
          </Form.Item>

          <Form.Item label={<span className="settings-label">备选库显示上限</span>}>
            <Space>
              <InputNumber
                value={settings.libraryMaxItems}
                onChange={(v) => update('libraryMaxItems', v ?? 100)}
                min={10}
                max={500}
                step={10}
              />
              <Tag color="blue">项</Tag>
            </Space>
            <div className="settings-hint">仅影响显示数量,不会删除 localStorage 中已有的候选项</div>
          </Form.Item>
        </Form>

        <div className="settings-footer">
          当前设置:{settings.theme === 'dark' ? '深色' : '浅色'}主题 ·
          排序 {SORT_OPTIONS.find((o) => o.value === settings.librarySort)?.label} ·
          上限 {settings.libraryMaxItems} 项
        </div>
      </Card>
    </div>
  );
});

export default SettingsPage;
