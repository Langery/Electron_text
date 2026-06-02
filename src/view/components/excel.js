import { forwardRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import '../../style/excel.less';

const ExcelSelf = forwardRef((props, ref) => {
  const handleChange = (info) => {
    console.log('=============================>');
    console.log(info);
    const { file } = info;
    console.log(file);
  };

  return (
    <div className="main_excel">
      <Upload action="" onChange={handleChange}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
});

export default ExcelSelf;
