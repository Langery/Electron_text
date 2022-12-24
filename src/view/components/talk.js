import React from "react";
import '../../style/talk.less';

import { Button, Empty  } from "antd";

const TalkSelf = props => {
  return (
    <div className="talk_page">
      <div className="talk_show">
        <Empty description={false} />
      </div>
      <div className="edit_zone">
        <Button className="send_btn" type="primary">Send</Button>
      </div>
    </div>
  )
}

export default TalkSelf;