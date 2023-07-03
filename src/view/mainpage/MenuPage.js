import React, { } from "react";
// import '../../style/operation.less';

import { Menu } from 'antd';

// eslint-disable-next-line
const { SubMenu } = Menu;

// eslint-disable-next-line
const HAVE_DATA = 1;

const MenuSelf = React.forwardRef((props, ref) => {
  // TYPEOF menuInfor: Object
  const menuInfor = props.menuInfor;

  const handleClick = e => {

  }

  return (
    <Menu onClick={handleClick} id="menu_main" selectedKeys={[menuInfor.current]} mode={menuInfor.mode}>

    </Menu>
  )
});

export default React.memo(MenuSelf);