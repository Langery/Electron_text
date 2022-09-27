// eslint-disable-next-line
import React, { useState, useEffect, useRef, useImperativeHandle, createRef, createContext, useContext } from "react";
import '../../style/form.less';

// eslint-disable-next-line
import { Form, Input, Select, DatePicker, InputNumber, Button } from "antd";

const { TextArea } = Input;

interface IFormItem {
  props: null
}

const FormItem: React.FC<IFormItem> = (props) => {

  const formItem = props.formItem;
  
  return (
    formItem.map(i => {
      let _required = !i ? false : i.required;
      let OperationComponent = null;
      /**
       * rule
       */

      const InputChangeValue = data => {
        props.backInputUpData(data);
      }

      const SelectChangeValue = data => {
        props.backSelectUpData(data);
      }

      const DateChangeValue = data => {
        props.backDateUpData(data);
      }

      if (i.type === 'input') {
        OperationComponent = <InputSelf backInput={InputChangeValue} props={i}/>;
      } else if (i.type === 'select') {
        OperationComponent = <SelectSelf backSelect={SelectChangeValue} props={i} />
      } else if (i.type === 'datepick') {
        OperationComponent = <DatePickerSelf backDate={DateChangeValue} props={i} />
      } else if (i.type === 'text') {
        OperationComponent = <TextSelf props={i} />
      }
      return (
        <Form.Item name={i.title} required={_required} label={i.title} key={i.id}>
          {OperationComponent}
        </Form.Item>
      )
    })
  )
}

const DatePickerSelf = React.forwardRef(props => {
  const _props = props.props;

  const handleChange = (e) => {
    const { value } = e.target;
    props.backDate(value);
  }

  return (
    <DatePicker onchange={handleChange} disabled={_props.disabled} />
  )
})

const InputSelf = React.forwardRef(props => {
  const _props = props.props;

  const handleChange = (e) => {
    const { value } = e.target;
    props.backInput(value);
  }

  return (
    <Input onChange={handleChange} type={_props.type} key={_props.id} placeholder={_props.placeholder} size={_props.size} prefix={_props.prefix} />
  )
});

const SelectSelf = React.forwardRef(props => {

  const propdata = props.props;
  const selectData = propdata.selectData;
  let optionsItem = selectData.map(i => {
    return (
      <Select.Option value={i.key} key={i.id}>{i.name}</Select.Option>
    )
  })

  const handleChange = (e) => {
    const { value } = e.target;
    props.backSelect(value);
  }
  return (
    <Select onChange={handleChange} defaultValue={propdata.defaultSelect}>
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
   */
  const [formName, setFormName] = useState(null)
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
      props.getBackData(backdata);
    }
  }))

  /**
   * when after deal with the style of form
   * TODO: backdata is a obj to deal a mass of data and save the form input data to parent component
   * Thinking: when trigger the modal sumbit button, the form data should sumbit the handleOk to collet the form data ...
   */

  const labelLayout = {
    span: formLayout.labelCol
  }
  const wrapperLayout = {
    span: formLayout.wrapperCol
  }

  const onFinish = value => {
    console.log(value)
    value.name = formName;
    // props.getBackData(value);
    setBackdata(value)
    form.resetFields();
  }

  const InputValue = (data) => {
    setFormName(data)
  }

  const SelectValue = (data) => {
    console.log(data)
  }

  const DateValue = (data) => {
    console.log(data)
  }

  return (
    <Form onFinish={onFinish} labelCol={labelLayout} wrapperCol={wrapperLayout} form={form} ref={formRef} layout="horizontal" className="formmain">
      <FormItem backInputUpData={InputValue} backSelectUpData={SelectValue} backDateUpData={DateValue} formItem={formItem}></FormItem>
      <Form.Item
        label="input"
        name="input"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
})

export default React.memo(FormSelf);