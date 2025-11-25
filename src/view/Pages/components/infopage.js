import React from "react";

const InfoPage = (props) => {

  const isShow = {visibility: props.isShow ? 'visible' : 'hidden' }

  return (
    <div style={isShow}>
      Info Page Content
    </div>
  )
}

export default InfoPage;