// eslint-disable-next-line
import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import '../../style/form.less';

import { Form, Input, Select } from "antd";

const FormItemInput = React.forwardRef((props, ref) => {
  const _formInput = props.formInput;

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

  // useImperativeHandle(ref, ()=> ({
  //   // a function about the ref event
  //   refFun() {
  //     // deal event
  //     console.log('ref')
  //     console.log(ref)
  //     return 'hello'
  //   }
  // }))

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

  useEffect(() => {
    return(() => {
      console.log('COMPONENT WILL UNMOUNT ...');
    })
  }, [props])

  return (
    <div className="formmain">
      <Form>
        <FormItemInput formInput={formInput}></FormItemInput>
        <FormItemSelect></FormItemSelect>
      </Form>
    </div>
  )
}

export default React.memo(FormSelf);