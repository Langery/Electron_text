import { useState, useEffect, memo } from 'react';
import { Button, Input } from 'antd';
import '../../style/talk.less';

const SendMess = memo(() => (
  <li className="send_mess">send info</li>
));

const RecMess = memo(() => (
  <li className="rec_mess">rec info</li>
));

const TalkSelf = () => {
  const [sessionName, setSessionName] = useState(sessionStorage.getItem('name'));
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    if (storedName) {
      setSessionName(storedName);
      console.log('=========> saved name data');
    } else {
      console.log('=========> need to save session data');
    }
  }, []);

  const sendMess = () => {
    console.log('Send message:', message);
    setMessage('');
  };

  const handlePressEnter = () => {
    sendMess();
  };

  return (
    <div className="talk_page">
      <div className="talk_show">
        <ul>
          <SendMess />
          <RecMess />
        </ul>
      </div>
      <div className="talk_input">
        <Input.TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handlePressEnter}
        />
        <Button className="send_btn" type="primary" onClick={sendMess}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default TalkSelf;
