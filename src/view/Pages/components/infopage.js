import React from "react";

import '../../../style/infoipage.less';

const InfoPage = (props) => {

  const isShow = {visibility: props.isShow ? 'visible' : 'hidden' }

  return (
    <div id="info_page" style={isShow}>
      Info Page Content
    </div>
  )
}

export default InfoPage;