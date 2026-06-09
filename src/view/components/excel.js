import { forwardRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import '../../style/excel.less';

const ExcelSelf = forwardRef((props, ref) => {
  const handleChange = (info) => {
    const { file } = info;
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
