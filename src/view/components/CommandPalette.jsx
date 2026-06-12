import { useState, useEffect, useMemo, useCallback, memo, useRef } from 'react';
import { Modal, Input, Tag, Empty, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import '../../style/commandPalette.less';

const DEFAULT_SETTINGS = { theme: 'light', librarySort: 'time', libraryMaxItems: 100 };

const NAVIGATABLE = [
  { path: '/mainpage', title: '前往 Main', keywords: ['主', '主页', 'main'] },
  { path: '/dragpage', title: '前往 Drag', keywords: ['拖拽', 'drag'] },
  { path: '/demo', title: '前往 Demo', keywords: ['演示', 'demo'] },
  { path: '/settings', title: '前往 Settings', keywords: ['设置', 'settings', '偏好'] },
  { path: '/login', title: '前往 Login', keywords: ['登录', 'login'] },
  { path: '/register', title: '前往 Register', keywords: ['注册', 'register'] }
];

const matchesKeyword = (cmd, kw) => {
  if (!kw) return true;
  const lower = kw.toLowerCase();
  if (cmd.title.toLowerCase().includes(lower)) return true;
  return (cmd.keywords || []).some((k) => k.toLowerCase().includes(lower));
};

const CommandPalette = memo(() => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [hoverIndex, setHoverIndex] = useState(0);
  const [confirmClear, setConfirmClear] = useState(false);
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const [settings, setSettings] = useLocalStorage('appSettings', DEFAULT_SETTINGS);
  const [library, setLibrary] = useLocalStorage('candidateLibrary', []);

  const commands = useMemo(() => {
    const list = [...NAVIGATABLE];
    list.push({
      id: 'toggle-theme',
      category: '设置',
      title: settings.theme === 'dark' ? '切换到浅色主题' : '切换到深色主题',
      keywords: ['主题', 'theme', '深色', '浅色', '暗色', '亮色'],
      action: () => {
        setSettings((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
        message.success(`已切换到${settings.theme === 'dark' ? '浅色' : '深色'}主题`);
      }
    });
    if (library.length > 0) {
      list.push({
        id: 'clear-library',
        category: '数据',
        title: `清空备选库(${library.length} 项)`,
        keywords: ['清空', '备选库', 'clear', 'library', '数据'],
        needsConfirm: true,
        action: () => setConfirmClear(true)
      });
    }
    return list;
  }, [settings.theme, library.length, setSettings]);

  const filtered = useMemo(
    () => commands.filter((c) => matchesKeyword(c, keyword)),
    [commands, keyword]
  );

  useEffect(() => {
    setHoverIndex(0);
  }, [keyword, open]);

  useEffect(() => {
    if (hoverIndex >= filtered.length) setHoverIndex(0);
  }, [hoverIndex, filtered.length]);

  const runCommand = useCallback((cmd) => {
    if (!cmd) return;
    if (cmd.path) {
      navigate(cmd.path);
    } else if (cmd.action) {
      cmd.action();
    }
    setOpen(false);
    setKeyword('');
  }, [navigate]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHoverIndex((i) => (filtered.length === 0 ? 0 : (i + 1) % filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHoverIndex((i) => (filtered.length === 0 ? 0 : (i - 1 + filtered.length) % filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(filtered[hoverIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  }, [filtered, hoverIndex, runCommand]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleClearConfirm = useCallback(() => {
    setLibrary([]);
    setConfirmClear(false);
    setOpen(false);
    setKeyword('');
    message.success('备选库已清空');
  }, [setLibrary]);

  return (
    <>
      <Modal
        open={open}
        onCancel={() => { setOpen(false); setKeyword(''); }}
        footer={null}
        closable={false}
        width={600}
        destroyOnClose
        className="command-palette-modal"
        maskStyle={{ backdropFilter: 'blur(2px)' }}
      >
        <Input
          ref={inputRef}
          allowClear
          size="large"
          prefix={<SearchOutlined />}
          placeholder="输入命令 (跳转 / 设置 / 数据)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="command-palette-list">
          {filtered.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={`没有匹配「${keyword}」的命令`} />
          ) : (
            filtered.map((cmd, idx) => (
              <div
                key={cmd.id || cmd.path}
                className={`command-palette-item${idx === hoverIndex ? ' active' : ''}`}
                onMouseEnter={() => setHoverIndex(idx)}
                onClick={() => runCommand(cmd)}
              >
                <div className="command-palette-item-main">
                  <span className="command-palette-item-title">{cmd.title}</span>
                  {cmd.category && <Tag color="blue">{cmd.category}</Tag>}
                </div>
                {cmd.path && <span className="command-palette-item-path">{cmd.path}</span>}
              </div>
            ))
          )}
        </div>

        <div className="command-palette-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> 导航</span>
          <span><kbd>Enter</kbd> 执行</span>
          <span><kbd>Esc</kbd> 关闭</span>
          <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>
            {filtered.length} / {commands.length} 命令
          </span>
        </div>
      </Modal>

      <Modal
        title="确认清空备选库"
        open={confirmClear}
        onOk={handleClearConfirm}
        onCancel={() => setConfirmClear(false)}
        okText="清空"
        cancelText="取消"
        okButtonProps={{ danger: true }}
      >
        <p>此操作将清空 <strong>{library.length}</strong> 项备选库数据,且无法恢复。</p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>
          (拖拽布局 `dragLayout` 不受影响)
        </p>
      </Modal>
    </>
  );
});

export default CommandPalette;
