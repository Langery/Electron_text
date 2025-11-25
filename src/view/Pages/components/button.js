import React from "react";

import { Button } from "antd";

const ButtonSelf = (props) => {
  const info = props.props.info;
  
  return (
    <Button type="primary">{info}</Button>
  )
}

export default ButtonSelf;