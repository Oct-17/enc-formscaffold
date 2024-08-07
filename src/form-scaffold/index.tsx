import './style.less';
import React from 'react';
import {Flex, Form, FormItemProps} from 'antd';
import type {FormProps, FormInstance, FormRule} from 'antd';
import {componentNameEnum, componentsMap} from './utils/components-map';
import {ruleHelper} from './utils/rule-picker'
import {generatePlaceholder} from './utils/component-help.js';
import proxyFormHooks from './utils/hooks';
import {omit} from "./utils/tools";
import type {ComponentPropsMap, ComponentMap} from './utils/components-map';
import {UseFormScaffold} from "./types";

export interface FormScaffoldProps {
  form?: FormInstance;
  options: FormScaffoldItem<keyof ComponentPropsMap>[];
  layout?: string;
  formLayout?: FormProps['layout'];
  formProps?: FormProps;
  className?: string;
  rootClassName?: string;
}

export interface FormScaffoldChild {
  options: FormScaffoldItem<keyof ComponentPropsMap>[];
  layout?: string;
}

export interface FormScaffoldItem<K extends keyof ComponentPropsMap>
  extends Omit<FormItemProps, 'id' | 'rules'>
{
  id: string | string[];
  label: string | React.ReactNode;
  _label?: string;
  rules?: string[] | FormRule[];
  child: K;
  render?: (props: FormScaffoldItem<K>, form: FormInstance) => React.ReactNode;
  initialValue?: any;
  fieldProps?: ComponentPropsMap[K];
  containerRender?: ((form: FormInstance) => React.ReactNode) | React.ReactNode;
  weight?: string | number;
  rootClassName?: string;
  placeholder?: string;
  style?: React.CSSProperties;
}

const idRegistration = {}; // id注册表

const RenderItem = <T extends keyof ComponentPropsMap>(_props: FormScaffoldItem<T>) => {
  const props = {..._props};
  const form = Form.useFormInstance();
  if (props.containerRender) {
    const Comp = props.containerRender;
    // @ts-ignore
    return typeof Comp === 'function' ? props.containerRender(form) : props.containerRender;
  }

  const Comp: ComponentMap[T] = componentsMap[props.child || componentNameEnum.INPUT];

  const customRender = props.render || null;


  // @ts-ignore
  const childProps: ComponentPropsMap[T] = {
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
        <Comp {...childProps as any} />
      )}
    </Form.Item>
  );
};

const RenderWrap = (props: FormScaffoldChild) => {
  const {options, layout} = props;

  const generateComp = (list: FormScaffoldItem<keyof ComponentPropsMap>[]) => {
    return (list || []).map((item, index) => {
      if (Array.isArray(item)) {
        return (
          <Flex align={'center'} gap={20} key={`wrap-${item.id}`}>
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

const FormScaffoldComponent = (props: FormScaffoldProps) => {
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

  const FormScaffold = (props: FormScaffoldProps) => (
    <FormScaffoldComponent {...props} form={proxyForm} />
  );

  return [FormScaffold, {form: proxyForm, CHILD: componentNameEnum}];
};

interface FormScaffold {
  (props: FormScaffoldProps): React.JSX.Element;
  form?: FormInstance;
}

export const FormScaffold: FormScaffold = (props) => {
  const [form] = Form.useForm();
  FormScaffold.form = proxyFormHooks(form);

  return <FormScaffoldComponent {...props} form={form} />;
};
