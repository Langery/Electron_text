// eslint-disable-next-line
import React, { useState, useEffect, useRef, useImperativeHandle, createRef } from "react";
import '../../style/form.less';

import { Form, Input, Select } from "antd";

const FormItemInput = React.forwardRef((props, ref) => {
  const _formInput = props.formInput;

  useImperativeHandle(ref, () => ({

  }))

  return (
    _formInput.map((item) => {
      let _required = !item ? false : item.required
      return (
        <Form.Item required={_required} label={item.title} key={item.id}>
          <InputSelf props={item} />
        </Form.Item>
      )
    })
  )
});

const InputSelf = React.forwardRef((props, ref) => {
  const _props = props.props;

  const storageRef = `${_props.title}Ref`;
  const _ref = useRef(storageRef);

  // useImperativeHandle(ref, ()=> ({
  //   // a function about the ref event
  //   focus: () => {
  //     _ref.current.focus()
  //   }
  // }))

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

  useEffect(() => {
    return(() => {
      console.log('COMPONENT WILL UNMOUNT ...');
    })
  }, [props])

  const formRef = createRef(null);
  
  // eslint-disable-next-line
  const [backdata, setBackdata] = useState({name: '111', age: 8})
  // TODO: backdata is a obj to deal a mass of data and save the form input data to parent component
  props.getBackData(backdata);

  return (
    <Form ref={formRef} className="formmain">
      <FormItemInput formInput={formInput}></FormItemInput>
      <FormItemSelect></FormItemSelect>
    </Form>
  )
}

export default React.memo(FormSelf);