// eslint-disable-next-line
import React, { useState, useEffect, useRef, useImperativeHandle, createRef } from "react";
import '../../style/form.less';

import { Form, Input, Select } from "antd";

import DemoSelf from "./demo";

interface IFormInputProps {
  props: null
}

const FormItemInput: React.FC<IFormInputProps> = (props) => {

  const formInput = props.formInput;

  return formInput.map(item => {
    let _required = !item ? false : item.required;
    return (
      <Form.Item required={_required} label={item.title} key={item.id}>
        <InputSelf props={item} />
      </Form.Item>
    )
  })
}

const InputSelf = React.forwardRef(props => {
  const _props = props.props;

  const storageRef = `${_props.title}Ref`;
  const _ref = useRef(storageRef);

  return (
    <Input type={_props.type} placeholder={_props.placeholder} size={_props.size} prefix={_props.prefix} ref={_ref} />
  )
});

const FormItemSelect = React.forwardRef((props, ref) => {
  return (
    <Form.Item>
      <Select>
        <Option></Option>
      </Select>
    </Form.Item>
  )
});


const { Option } = Select;

const FormSelf = props => {

  const formInput = props.formInput;
  console.log(formInput);
  const formLayout = props.formLayout;

  useEffect(() => {
    return(() => {
      console.log('COMPONENT WILL UNMOUNT ...');
    })
  }, [props])

  const formRef = createRef(null);
  
  // eslint-disable-next-line
  const [backdata, setBackdata] = useState({name: '111', age: 8})
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
      <FormItemInput formInput={formInput}></FormItemInput>
      <FormItemSelect></FormItemSelect>
      <DemoSelf></DemoSelf>
    </Form>
  )
}

export default React.memo(FormSelf);