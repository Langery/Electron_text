import { memo } from 'react';
import '../../../style/infoipage.less';

const InfoPage = memo(({ isShow }) => (
  <div id="info_page" style={{ visibility: isShow ? 'visible' : 'hidden' }}>
    Info Page Content
  </div>
));

export default InfoPage;
