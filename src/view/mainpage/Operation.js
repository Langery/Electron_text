import { memo, useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined, ReloadOutlined, DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import '../../style/operation.less';

const OperationSelf = memo(({ onAdd, onRefresh, onExport, detailInfor }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const hasSelection = !!detailInfor;

  return (
    <div id="operation_main">
      <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
        新增
      </Button>
      <Button icon={<ReloadOutlined />} onClick={onRefresh}>
        刷新
      </Button>
      <Button
        icon={<DownloadOutlined />}
        onClick={() => onExport(detailInfor)}
        disabled={!hasSelection}
      >
        导出
      </Button>
      <Button icon={<SettingOutlined />} onClick={() => setSettingsOpen(true)}>
        设置
      </Button>

      <Modal
        title="设置"
        open={settingsOpen}
        onCancel={() => setSettingsOpen(false)}
        footer={null}
        width={420}
      >
        <p style={{ color: '#999', marginBottom: 12 }}>设置功能开发中,以下为预留选项:</p>
        <ul style={{ paddingLeft: 20, color: '#666', lineHeight: 1.8 }}>
          <li>主题:浅色(默认)</li>
          <li>语言:简体中文</li>
          <li>字号:中(默认)</li>
        </ul>
      </Modal>
    </div>
  );
});

export default OperationSelf;
