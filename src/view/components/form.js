// eslint-disable-next-line
import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import '../../style/form.less';

import { Form, Input, Select } from "antd";

/**
 * Ant-design API
 * Input:
 *    size: large | middle | small
 */

const FormItemInput = React.forwardRef((props, ref) => {
  console.log(props) // { name: 'name' }
  const _formInput = props.formInput

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
    _formInput.map(item => {
      // let _ref = !item ? useRef(null) : item.ref
      return (
        <Form.Item label={item.title} key={item.id}>
          <Input type={item.type} placeholder={item.placeholder} size={item.size} prefix={item.prefix}/>
          {/* <InputSelf ref={_ref}></InputSelf> */}
        </Form.Item>
      )
    })
  )
});

const InputSelf = React.forwardRef((props, ref) => {
  console.log(props)
  console.log(ref)
  return (
    <Input />
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

  const formRef = props.formRef;
  const formInput = props.formInput;

  console.log(formInput);

  useEffect(() => {
    formRef.current.refFun()
    return(() => {
      console.log('COMPONENT WILL UNMOUNT ...');
    })
  }, [props, formRef])

  return (
    <div className="formmain">
      <Form>
        <FormItemInput name={'name'} ref={formRef} formInput={formInput}></FormItemInput>
        <FormItemSelect></FormItemSelect>
      </Form>
    </div>
  )
}

export default React.memo(FormSelf);