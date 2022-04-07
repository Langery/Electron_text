// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import '../../style/form.less';

import { Form, Input, Select } from "antd";

const FormItemInput = React.forwardRef((props, ref) => {
  console.log(props)
  console.log(ref)
  return (
    <Form.Item>
      <Input ref={ref} />
    </Form.Item>
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
  const ref = React.createRef();

  // ref.age = 18;

  useEffect(() => {
    return(() => {
      console.log('COMPONENT WILL UNMOUNT ...');
    })
  }, [props])

  return (
    <div className="formmain">
      <Form>
        <FormItemInput name={'name'} ref={ref}></FormItemInput>
        <FormItemSelect></FormItemSelect>
      </Form>
    </div>
  )
}

export default React.memo(FormSelf);