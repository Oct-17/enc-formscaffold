import './style.less';
import React from 'react';
import {Flex, Form, GetProps} from 'antd';
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

export interface FormScaffoldItem<K extends keyof ComponentPropsMap> {
  id: string | string[];
  label: string | React.ReactNode;
  rules?: string[] | FormRule[];
  child: K;
  render?: (props: FormScaffoldItem<K>, form: FormInstance) => React.ReactNode;
  fieldProps?: ComponentPropsMap[K];
  containerRender?: (form: FormInstance) => React.ReactNode;
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
    return props.containerRender(form);
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
      rootClassName={props.rootClassName}
      style={{...props.style, width: props.weight || 'auto',}}
      name={props.id}
      // @ts-ignore
      rules={ruleHelper(props.rules, childProps.placeholder)}
      label={props.label}
    >
      {customRender ? (
        customRender(props, form)
      ) : (
          // @ts-ignore
        <Comp {...childProps} />
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
          <Flex key={index} align={'center'} gap={20}>
            {generateComp(item)}
          </Flex>
        );
      } else {
        return <RenderItem<typeof item.child>
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
