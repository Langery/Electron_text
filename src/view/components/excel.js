import React from 'react';

import { UploadOutlined  } from '@ant-design/icons';

import { Button, Upload } from 'antd'; // message

const ExcelSelf = React.forwardRef((props, ref) => {

  const ExcelChangeValue = info => {
    console.log(info)
  }

  return (
    <div className="main_excel">
      <Upload onChange={ExcelChangeValue}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  )
});

export default React.memo(ExcelSelf);