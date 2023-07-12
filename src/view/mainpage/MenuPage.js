import React, { useState } from "react";
// import '../../style/operation.less';

import { Menu } from 'antd';

const { SubMenu } = Menu;

// eslint-disable-next-line
const HAVE_DATA = 1;

const MenuSelf = React.forwardRef((props, ref) => {
  // TYPEOF menuInfor: Object
  const menuInfor = props.menuInfor;

  const [current, setCurrent] = useState(menuInfor.current);
  const menulist = menuInfor.menulist;

  // click function
  const handleClick = e => {
    let getOldClass = document.getElementsByClassName(current);
    let oldClassSyle = getOldClass[0].style;
    console.log("getOldClass:  " + getOldClass)
    oldClassSyle.display = 'none';
    setCurrent(e.key);

    if (e.keyPath.length > HAVE_DATA) {
      let getFatherClass = document.getElementsByClassName(e.keyPath[1]);
      let classFatherStyle = getFatherClass[0].style;
      classFatherStyle.display = 'block';
    }
    let getClass = document.getElementsByClassName(e.key);

    let classStyle = getClass[0].style;
    classStyle.display = 'block';
  }

  const MenuItem = () => {
    return menulist.map(i => {
      if (!i.submenu) {
        return (
          <Menu.Item key={i.key}>
            <ion-icon name={i.icon}></ion-icon>
            {i.name}
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={i.key}
            title={
              <span>
                <ion-icon name={i.icon}></ion-icon>
                {i.name}
              </span>
            }
          >

          </SubMenu>
        )
      }
      
    })
  }

  return (
    <Menu onClick={handleClick} id="menu_main" selectedKeys={[current]} mode={menuInfor.mode}>
      <MenuItem></MenuItem>
    </Menu>
  )
});

export default React.memo(MenuSelf);