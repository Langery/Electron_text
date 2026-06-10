import { useState, createRef, forwardRef, memo } from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../style/form.less';

const { Option } = Select;
const { TextArea } = Input;

const InputNumberSelf = forwardRef((props, ref) => (
  <InputNumber style={{ width: '100%' }} onChange={(value) => props.backNumber(value)} />
));

const DatePickerSelf = forwardRef(({ props, backDate }, ref) => (
  <DatePicker
    onChange={(date, dateString) => backDate(dateString)}
    disabled={props.disabled}
  />
));

const InputSelf = forwardRef(({ props, backInput }, ref) => (
  <Input
    onChange={(e) => backInput(e.target.value)}
    type={props.type}
    key={props.id}
    placeholder={props.placeholder}
    size={props.size}
    prefix={props.prefix}
  />
));

const NicknameSelf = forwardRef(({ props, backNickname }, ref) => (
  <Select onChange={(value) => backNickname(value)} defaultValue={props.defaultSelect}>
    {props.selectData.map((i) => (
      <Option value={i.name} key={i.id}>{i.name}</Option>
    ))}
  </Select>
));

const TextSelf = forwardRef(({ props }, ref) => (
  <TextArea rows={props.row} placeholder={props.placeholder} />
));

const FormItem = memo(({ formItem, backInputUpData, backNicknameUpData, backDateUpData, backNumberData }) => (
  formItem.map((i) => {
    if (!i) return null;

    const getComponent = () => {
      switch (i.type) {
        case 'input':
          return <InputSelf backInput={backInputUpData} props={i} />;
        case 'select':
          return <NicknameSelf backNickname={backNicknameUpData} props={i} />;
        case 'datepick':
          return <DatePickerSelf backDate={backDateUpData} props={i} />;
        case 'text':
          return <TextSelf props={i} />;
        case 'inputnumber':
          return <InputNumberSelf backNumber={backNumberData} props={i} />;
        default:
          return null;
      }
    };

    return (
      <Form.Item
        key={i.id}
        name={i.title}
        required={i.required}
        label={i.title}
      >
        {getComponent()}
      </Form.Item>
    );
  })
));

const FormSelf = forwardRef(({
  formItemData,
  formLayout,
  onSubmit
}, ref) => {
  const [form] = Form.useForm();
  const formRef = createRef();
  const [formName, setFormName] = useState(null);
  const [formDate, setFormDate] = useState(null);
  const [formNickname, setFormNickname] = useState(null);
  const [formNumber, setFormNumber] = useState(0);

  const resetAll = () => {
    form.resetFields();
    setFormName(null);
    setFormDate(null);
    setFormNickname(null);
    setFormNumber(0);
  };

  const handleAdd = () => {
    if (!formName) {
      message.warning('请先填写 name');
      return;
    }
    onSubmit?.({
      id: Date.now(),
      name: formName,
      age: formNumber,
      nickname: formNickname,
      createTime: formDate
    });
    resetAll();
  };

  const labelLayout = { span: formLayout.labelCol };
  const wrapperLayout = { span: formLayout.wrapperCol };

  return (
    <Form
      labelCol={labelLayout}
      wrapperCol={wrapperLayout}
      form={form}
      ref={formRef}
      layout="horizontal"
      className="formmain"
    >
      <FormItem
        formItem={formItemData}
        backInputUpData={setFormName}
        backNicknameUpData={setFormNickname}
        backDateUpData={setFormDate}
        backNumberData={setFormNumber}
      />
      <div className="form-submit-row">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          block
        >
          加入备选库
        </Button>
      </div>
    </Form>
  );
});

export default memo(FormSelf);
