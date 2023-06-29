import React, { } from "react";
import '../../style/form.less';

import { Button } from 'antd';

const OperationSelf = React.forwardRef((props, ref) => {
  const OperationInfor = props.operationInfor;

  return (
    <div id="operation_main">
      <Button type="primary">Operation</Button>
      <p className="content_infor">
        {OperationInfor}
      </p>
    </div>
  )
});

export default React.memo(OperationSelf);