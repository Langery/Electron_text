import { memo } from 'react';
import { Button } from 'antd';

const ButtonSelf = memo(({ props }) => (
  <Button type="primary">{props.info}</Button>
));

export default ButtonSelf;
