import { forwardRef, memo } from 'react';
import { Button } from 'antd';
import '../../style/operation.less';

const OperationSelf = forwardRef(({ operationInfor }, ref) => (
  <div id="operation_main">
    <Button type="primary">Operation</Button>
    <Button type="primary">+</Button>
    <p className="content_infor">{operationInfor}</p>
  </div>
));

export default memo(OperationSelf);
