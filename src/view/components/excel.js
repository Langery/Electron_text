import React from 'react';

import '../../style/excel.less';

import { UploadOutlined  } from '@ant-design/icons';

import { Button, Upload } from 'antd'; // message

const ExcelSelf = React.forwardRef((props, ref) => {

  const ExcelChangeValue = info => {
    console.log('=============================>');
    console.log(info)
    const file = info.file;
    console.log(file);
  }

  return (
    <div className="main_excel">
      <Upload action="" onChange={ExcelChangeValue}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  )
});

export default React.memo(ExcelSelf);