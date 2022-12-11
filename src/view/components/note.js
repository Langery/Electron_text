import React, { useState } from "react";

export interface IDemoProps {
  /**
   * ? 表示 props 是可选的
   */
  name: string,
  age: number,
  nickname?: string
}

/**
 * 定义扩展组件，用于添加扩展项
 */
export interface extendDemoProps extends IDemoProps {
  years: number
}

export interface IDemoState { 
}

/**
 * 可以考虑在入参初设置可选项默认值
 * 若有扩展项直接引入扩展项即可
 */
const DemoSelf: React.FC<extendDemoProps> = ({nickname = '11111'}) => {

  // eslint-disable-next-line
  const [name, setName] = useState('hahahah');
  // eslint-disable-next-line
  const [age, setAge] = useState(18);
  // eslint-disable-next-line
  const [years, setYears] = useState(22);

  return <div>
      <p>interface demo</p>
      <p>{name}: {age}</p><span> {years}</span>
      <p>{nickname}</p>
    </div>
};

export default DemoSelf;

