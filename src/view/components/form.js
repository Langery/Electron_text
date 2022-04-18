// eslint-disable-next-line
import React, { useState, useEffect, useRef, useImperativeHandle, createRef } from "react";
import '../../style/form.less';

// eslint-disable-next-line
import { Form, Input, Select, DatePicker, InputNumber } from "antd";

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
      if (i.type === 'input') {
        OperationComponent = <InputSelf props={i}/>;
      } else if (i.type === 'select') {
        OperationComponent = <SelectSelf props={i} />
      } else if (i.type === 'datepick') {
        OperationComponent = <DatePickerSelf props={i} />
      }
      return (
        <Form.Item name={i.type} required={_required} label={i.title} key={i.id}>
          {OperationComponent}
        </Form.Item>
      )
    })
  )
}

const DatePickerSelf = React.forwardRef(props => {
  const _props = props.props;

  return (
    <DatePicker disabled={_props.disabled} />
  )
})

const InputSelf = React.forwardRef(props => {
  const _props = props.props;

  const storageRef = `${_props.title}Ref`;
  const _ref = useRef(storageRef);
  useImperativeHandle(_ref, ()=> ({
    focus: () => {
      _ref.current.focus();
    }
  }))

  return (
    <Input type={_props.type} key={_props.id} placeholder={_props.placeholder} size={_props.size} prefix={_props.prefix} ref={_ref} />
  )
});

const SelectSelf = React.forwardRef(props => {
  console.log(props)
  const propdata = props.props
  const selectData = propdata.selectData;
  let optionsItem = selectData.map(i => {
    return (
      <Select.Option value={i.key} key={i.id}>{i.name}</Select.Option>
    )
  })
  return (
    <Select defaultValue={propdata.defaultSelect}>
      {optionsItem}
    </Select>
  )
});

const FormSelf = props => {

  const formItem = props.formItemData;
  const formLayout = props.formLayout;

  const formClear = props.formClear;

  // eslint-disable-next-line
  const [backdata, setBackdata] = useState({name: '111', age: 8})

  const formRef = createRef(null);

  useEffect(() => {
    // clear form data
    if (formClear) formRef.current.resetFields(['input', 'select', 'datepick']);

    return(() => {
      console.log('COMPONENT WILL UNMOUNT ...');
    })
  }, [props, backdata, formClear, formRef])

  /**
   * when after deal with the style of form
   * TODO: backdata is a obj to deal a mass of data and save the form input data to parent component
   * Thinking: when trigger the modal sumbit button, the form data should sumbit the handleOk to collet the form data ...
   */
  props.getBackData(backdata);

  const layout = {
    labelCol: { span: formLayout.labelCol },
    wrapperCol: { span: formLayout.wrapperCol },
  }

  return (
    <Form {...layout} ref={formRef} className="formmain">
      <FormItem formItem={formItem}></FormItem>
    </Form>
  )
}

export default React.memo(FormSelf);