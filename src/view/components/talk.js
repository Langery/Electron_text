import React, { useEffect, useState } from "react";
import '../../style/talk.less';

import { Button, Input } from "antd";

/**
 * todo: 动态创建输入和接收信息框的展示
 */
// 展示发送信息
const showSendMess = (props) => {
  const info ='send info';
  return (
    <li>{info}</li>
  )
}

// 展示接收信息
const showRecMess = (props) => {
  const info ='rec info';
  return (
    <li>{info}</li>
  )
}

const TalkSelf = () => {

  const [sessionName, setSessionName] = useState(sessionStorage.getItem('name'));
  
  // eslint-disable-next-line
  const [sessionKey, setSessionKey] = useState(sessionStorage.getItem('key'))

  // session deal
  /**
   * save: sessionStorage.setItem(key, value)
   * get: sessionStorage.getItem(key)
   *      if () {}
   * delete: sessionStorage.removeItem(key) 
   *         sessionStorage.clear()
   */
  // User Info
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
  }, [sessionName, sessionKey]);

  const sendMess = () => {
    
  }

  return (
    <div className="talk_page">
      <div className="talk_show">
        <ul>
          <li>
            1
          </li>
          <li>
            2
          </li>
          <li>
            3
          </li>
          <li>
            4
          </li>
        </ul>
      </div>
      <div className="talk_input">
        <Input.TextArea onPressEnter={sendMess} />
        <Button className="send_btn" type="primary" onClick={sendMess}>Send</Button>
      </div>
    </div>
  )
}

export default TalkSelf;