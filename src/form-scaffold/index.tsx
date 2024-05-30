import './style.less';
import React from 'react';
import {Flex, Form, FormItemProps} from 'antd';
import type {FormProps, FormInstance, FormRule} from 'antd';
import {componentNameEnum, componentsMap} from './utils/components-map';
import {ruleHelper} from './utils/rule-picker'
import {generatePlaceholder} from './utils/component-help.js';
import proxyFormHooks from './utils/hooks';
import {omit} from "./utils/tools";
import type {ComponentMap} from './utils/components-map';
import {UseFormScaffold} from "./types";
import {AntdComponentProps, GenerateOption} from "./types/antd-component";

export interface FormScaffoldProps {
  form?: FormInstance;
  formLayout?: FormProps['layout'];
  formProps?: FormProps;
  className?: string;
  rootClassName?: string;
}

export interface FormScaffoldChild {
  options: Array<FormScaffoldItem<keyof AntdComponentProps>>;
  layout?: string;
}

export const generateOption: GenerateOption = (key, obj) => {
  return {
    ...obj,
    child: key,
  }
};

export interface FormScaffoldItem<T extends keyof AntdComponentProps> extends Omit<FormItemProps, 'id' | 'rules' | 'render'>
{
  id: string | string[];
  label: string | React.ReactNode;
  rules?: string[] | FormRule[];
  child: T;
  render?: (props: FormScaffoldItem<T>, form: FormInstance) => React.ReactNode;
  fieldProps?: AntdComponentProps[T];
  containerRender?: (form: FormInstance) => React.ReactNode;
  weight?: string | number;
  placeholder?: string;
}

const idRegistration = {}; // id注册表

const childProps: FormScaffoldChild = {
  options: [
    {
      id: 'asd',
      label: 'asd',
      child: 'Select',
      fieldProps: {
        open: true,
      },
    }
  ],
  layout: 'horizontal',
}

const RenderItem = <T extends keyof AntdComponentProps = 'Input'>(_props: FormScaffoldItem<T>) => {
  const props = {..._props};
  const form = Form.useFormInstance();
  if (props.containerRender) {
    return props.containerRender(form);
  }


  // @ts-ignore
  const Comp: ComponentMap = componentsMap[props.child || componentNameEnum.INPUT];

  const customRender = props.render || null;



  const childProps: AntdComponentProps[T] = {
    // @ts-ignore
    placeholder: props.placeholder || generatePlaceholder(props),
    ...(props.fieldProps || {}),
  };

  /**
   * 去掉render和fieldProps
   */
  omit(props, ['render', 'fieldProps']);


  return (
    <Form.Item
      {...props as FormItemProps}
      rootClassName={props.rootClassName}
      style={{...props.style, width: props.weight || 'auto',}}
      name={props.id}
      initialValue={props.initialValue}
      // @ts-ignore
      rules={ruleHelper(props.rules, childProps.placeholder)}
      label={props.label}
    >
      {customRender ? (
        customRender(props, form)
      ) : (
        // @ts-ignore
        <Comp {...childProps as any} />
      )}
    </Form.Item>
  );
};

const RenderWrap = (props: FormScaffoldChild) => {
  const {options, layout} = props;

  const generateComp = <T extends keyof AntdComponentProps>(list: FormScaffoldItem<keyof AntdComponentProps>[]) => {
    return (list || []).map((item, index) => {
      if (Array.isArray(item)) {
        return (
          <Flex key={index} align={'center'} gap={20}>
            {generateComp(item)}
          </Flex>
        );
      } else {
        return <RenderItem
          style={{flex: 1}}
          key={item.id as React.Key}
          {...item}
          fieldProps={item.fieldProps}
        />;
      }
    });
  };

  return generateComp(options);
};

const FormScaffoldComponent = (props: FormScaffoldProps & FormScaffoldChild) => {
  const {form, options, layout, formLayout, formProps} = props;

  return (
    <div className={'form-scaffold-component'}>
      <Form form={form} layout={formLayout} {...(formProps || {})}>
        <RenderWrap options={options} layout={layout} />
      </Form>
    </div>
  );
};


export const useFormScaffold: UseFormScaffold = () => {
  const [form] = Form.useForm();

  const proxyForm = proxyFormHooks(form);

  const FormScaffold = (props: FormScaffoldProps  & FormScaffoldChild) => (
    <FormScaffoldComponent {...props} form={proxyForm} />
  );

  return [FormScaffold, {form: proxyForm, CHILD: componentNameEnum}];
};
