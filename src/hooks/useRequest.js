import { useState, useEffect, useCallback, useRef } from 'react';
import { message } from 'antd';
import { api } from '../server/request';

/**
 * useRequest —— 统一数据请求 hook
 *
 * 决策依据见 Markdown/视图处理方式设计.md。
 *
 * @param {function} service  业务请求函数, 签名 (params, { signal }) => Promise
 *                           例如: (params, { signal }) => api.post('login', params, { signal })
 * @param {object}   options
 *   - manual {boolean}  为 true 时不在 mount 时自动调用, 由 refetch() 触发
 *   - deps   {Array}    依赖数组, 任一项变化时自动重跑(类似 useEffect deps)
 *
 * @returns {{ data, error, loading, refetch, abort }}
 */
const useRequest = (service, options = {}) => {
  const { manual = false, deps = [] } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!manual);

  // 持有当前正在飞行的 AbortController, 方便 unmount / 重跑时取消
  const controllerRef = useRef(null);

  const run = useCallback(
    async (params) => {
      // 取消上一个进行中的请求, 避免竞态(前一个请求 resolve 时 setState 覆盖新数据)
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const result = await service(params, { signal: controller.signal });
        // 请求途中被 abort 后又 resolve 的边角情况, 丢弃结果
        if (controller.signal.aborted) return undefined;
        setData(result);
        return result;
      } catch (err) {
        // 主动 abort 不算 error, 静默吞掉
        if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return undefined;
        // 已知错误: 走 antd toast(Q3 决策)
        const errorMsg = err?.message || '请求失败';
        message.error(errorMsg);
        setError(err);
      } finally {
        // 只有"还是当前 controller"时才清 loading, 防止 abort 后新请求的 loading 被提前清掉
        if (controllerRef.current === controller) {
          setLoading(false);
        }
      }
    },
    [service]
  );

  // deps 故意只用 options.deps, 不放 run/service:
  // 调用方常传 inline arrow function 作 service, 每 render 都是新引用,
  // 放进 deps 会死循环。manual 也不放, 它在闭包里只在 mount 时读一次。
  useEffect(() => {
    if (manual) return;
    run();
    return () => controllerRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const abort = useCallback(() => {
    controllerRef.current?.abort();
  }, []);

  return { data, error, loading, refetch: run, abort };
};

export default useRequest;
