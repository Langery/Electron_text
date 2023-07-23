// common Js
import { useRef, useState, useEffect } from "react";

export function useCallbackState(state) {
  const _cb = useRef();
  const [data, setData] = useState(state);
  useEffect(() => {
    _cb.current && _cb.current(data);
  }, [data])

  return [
    data,
    (val, callback) => {
      _cb.current = callback;
      setData(val);
    }
  ]
}


