// eslint-disable-next-line
import React, { useState, useEffect, useRef, useImperativeHandle, createRef, createContext, useContext } from "react";
import '../../style/form.less';

// eslint-disable-next-line
import { Form, Input, Select, DatePicker, InputNumber, Button } from "antd";

const { Option } = Select;
const { TextArea } = Input;

// Step1: 初始输入内容
const FormItem = (props) => {

  const formItem = props.formItem;
  
  return (
    formItem.map(i => {
      let _required = !i ? false : i.required;
      let OperationComponent = null;
      /**
       * rule ...
       */

      const InputChangeValue = data => {
        props.backInputUpData(data);
      }

      const NicknameChangeValue = data => {
        props.backNicknameUpData(data);
      }

      const DateChangeValue = data => {
        props.backDateUpData(data);
      }
      const NumberChangeValue = data => {
        console.log('number data: ', data);
        props.backNumberData(data);
      }

      // 定义类型
      if (i.type === 'input') {
        OperationComponent = <InputSelf backInput={InputChangeValue} props={i}/>;
      } else if (i.type === 'select') {
        OperationComponent = <NicknameSelf backNickname={NicknameChangeValue} props={i} />
      } else if (i.type === 'datepick') {
        OperationComponent = <DatePickerSelf backDate={DateChangeValue} props={i} />
      } else if (i.type === 'text') {
        OperationComponent = <TextSelf props={i} />
      } else if (i.type === 'inputnumber') {
        OperationComponent = <InputNumberSelf props={i} backNumber={NumberChangeValue}/>
      }
      return (
        <Form.Item name={i.title} required={_required} label={i.title} key={i.id}>
          {OperationComponent}
        </Form.Item>
      )
    })
  )
}

const InputNumberSelf = React.forwardRef(props => {

  const handleNumberChange = (e) => {
    const value = e;
    props.backNumber(value);
  }

  return (
    <InputNumber style={{ width: '100%' }} onChange={handleNumberChange} />
  )
})

const DatePickerSelf = React.forwardRef(props => {
  const _props = props.props;

  const handleDataPickChange = (date, dateString) => {
    // console.log(date, dateString)
    const value = dateString;

    props.backDate(value);
  }

  return (
    <DatePicker onChange={handleDataPickChange} disabled={_props.disabled} />
  )
})

const InputSelf = React.forwardRef(props => {
  const _props = props.props;

  const handleInputChange = (e) => {
    const { value } = e.target;
    props.backInput(value);
  }

  return (
    <Input onChange={handleInputChange} type={_props.type} key={_props.id} placeholder={_props.placeholder} size={_props.size} prefix={_props.prefix} />
  )
});

const NicknameSelf = React.forwardRef(props => {

  const propdata = props.props;
  const selectData = propdata.selectData;
  let optionsItem = selectData.map(i => {
    return (
      <Option value={i.name} key={i.id}>{i.name}</Option>
    )
  })

  const handleSelectChange = (e) => {
    const value = e;
    props.backNickname(value);
  }
  return (
    <Select onChange={handleSelectChange} defaultValue={propdata.defaultSelect}>
      {optionsItem}
    </Select>
  )
});

const TextSelf = React.forwardRef(props => {
  const _props = props.props;
  return (
    <TextArea rows={_props.row} placeholder={_props.placeholder} />
  )
})

const FormSelf = React.forwardRef((props, ref) => {

  const formItem = props.formItemData;
  const formLayout = props.formLayout;

  const formClear = props.formClear;

  const formBackInfor = props.formBackInfor
  console.log(formBackInfor);

  // eslint-disable-next-line
  const [backdata, setBackdata] = useState({name: '111', age: 8})

  const formRef = createRef(null);

  const [form] = Form.useForm();
  // const userName = Form.useWatch('name', form);
  // console.log(userName);

  const clearType = ['input', 'select', 'datepick', 'text']

  /**
   * setFormData start
   * form list data had save
   */
  const [formName, setFormName] = useState(null);
  // const [formSelect, setFormSelect] = useState(null);
  const [formDate, setFormDate] = useState(null);
  const [formNickname, setFormNickname] = useState(null);
  const [formNumber, setFormNumber] = useState(0);
  /**
   * setFormData end
   */

  useEffect(() => {
    // clear form data
    if (formClear) formRef.current.resetFields(clearType);

    return(() => {
      console.log('COMPONENT WILL UNMOUNT ...');
    })
  }, [props, backdata, formClear, formRef, clearType])
  
  useImperativeHandle(ref, ()=> ({
    getChildData: () => {
      // onFinish();
      // console.log(formRef)
      console.log(formRef.current)
      /**
       * send data to up level
       */
      console.log('GET CHILD DATA TO UP LEVEL ...')
      // console.log(form.getFieldsValue());
      const returnForm = {
        name: formName,
        date: formDate,
        age: formNumber,
        nickname: formNickname
      }
      console.log(returnForm)
      props.getBackData(returnForm);
      form.resetFields();
    }
  }))

  /**
   * TODO: backdata is a obj to deal a mass of data and save the form input data to parent component
   * Thinking: when trigger the modal sumbit button, the form data should sumbit the handleOk to collet the form data ...
   */

  const labelLayout = {
    span: formLayout.labelCol
  }
  const wrapperLayout = {
    span: formLayout.wrapperCol
  }

  const InputValue = (data) => {
    setFormName(data)
  }

  const NicknameValue = (data) => {
    setFormNickname(data);
  }

  const DateValue = (data) => {
    setFormDate(data);
  }

  const NumberValue = (data) => {
    setFormNumber(data);
  }

  return (
    <Form labelCol={labelLayout} wrapperCol={wrapperLayout} form={form} ref={formRef} layout="horizontal" className="formmain">
      <FormItem backInputUpData={InputValue} backNicknameUpData={NicknameValue} backDateUpData={DateValue} backNumberData={NumberValue} formItem={formItem}></FormItem>
    </Form>
  )
})

export default React.memo(FormSelf);