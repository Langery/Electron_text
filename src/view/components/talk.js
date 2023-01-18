import React, { useEffect, useState } from "react";
import '../../style/talk.less';

import { Button } from "antd";

const TalkSelf = () => {

  const [sessionName, setSessionName] = useState(sessionStorage.getItem('name'));

  // session deal
  /**
   * save: sessionStorage.setItem(key, value)
   * get: sessionStorage.getItem(key)
   *      if () {}
   * delete: sessionStorage.removeItem(key) 
   *         sessionStorage.clear()
   */
  // User Infor
  const UserProfile = () => {
    if (sessionStorage.getItem('name')) {
      setSessionName(sessionStorage.getItem('name'))
      console.log('=========> saved name data');
    } else {
      console.log('=========> need to save session data');
    }
  };

  useEffect(() => {
    UserProfile();
  }, [sessionName]);

  return (
    <div className="talk_page">
      <div className="talk_show">
        <ul>
          <li>

          </li>
        </ul>
      </div>
      <div className="edit_zone">
        <Button className="send_btn" type="primary">Send</Button>
      </div>
    </div>
  )
}

export default TalkSelf;