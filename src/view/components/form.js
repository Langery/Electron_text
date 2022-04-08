// eslint-disable-next-line
import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import '../../style/form.less';

import { Form, Input, Select } from "antd";

const FormItemInput = React.forwardRef((props, ref) => {
  console.log(props) // { name: 'name' }
  const _formInput = props.formInput;

  useImperativeHandle(ref, ()=> ({
    // a function about the ref event
    refFun() {
      // deal event
      console.log('ref')
      console.log(ref)
      return 'hello'
    }
  }))
  return (
    _formInput.map((item) => {
      let _ref = !item ? useRef(null) : item.ref;
      return (
        <Form.Item label={item.title} key={item.id}>
          <InputSelf props={item} ref={_ref}/>
        </Form.Item>
      )
    })
  )
});

const InputSelf = React.forwardRef((props, ref) => {
  const _props = props.props;
  return (
    <Input type={_props.type} placeholder={_props.placeholder} size={_props.size} prefix={_props.prefix} ref={ref} />
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
        <FormItemInput name={'name'} formInput={formInput}></FormItemInput>
        <FormItemSelect></FormItemSelect>
      </Form>
    </div>
  )
}

export default React.memo(FormSelf);