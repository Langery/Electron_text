// eslint-disable-next-line
import React, { useState, useEffect, useRef, useImperativeHandle, createRef } from "react";
import '../../style/form.less';

import { Form, Input, Select } from "antd";

interface IFormItem {
  props: null
}

const FormItem: React.FC<IFormItem> = (props) => {

  const formItem = props.formItem;
  
  return (
    formItem.map(i => {
      let _required = !i ? false : i.required;
      let OperationComponent = null
      if (i.type === 'input') {
        OperationComponent = <InputSelf props={i}/>;
      } else if (i.type === 'select') {
        OperationComponent = <SelectSelf props={i} />
      }
      return (
        <Form.Item required={_required} label={i.title} key={i.id}>
          {OperationComponent}
        </Form.Item>
      )
    })
  )
}

// eslint-disable-next-line
const InputSelf = React.forwardRef(props => {
  const _props = props.props;

  const storageRef = `${_props.title}Ref`;
  const _ref = useRef(storageRef);

  return (
    <Input type={_props.type} placeholder={_props.placeholder} size={_props.size} prefix={_props.prefix} ref={_ref} />
  )
});
// eslint-disable-next-line
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
  console.log(formItem);
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
      <FormItem formItem={formItem}></FormItem>
    </Form>
  )
}

export default React.memo(FormSelf);