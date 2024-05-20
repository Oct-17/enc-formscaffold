import {
  AutoComplete,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker, type FormRule, GetProps,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from 'antd';
import React from "react";

const {RangePicker: RangeDate} = DatePicker;
const {RangePicker: RangeTime} = TimePicker;
const {Search, TextArea, Password, Group: InputGroup} = Input;
const {Group: CheckboxGroup} = Checkbox;
const {Group: RadioGroup} = Radio;


export interface ComponentPropsMap {
  // [key: string]: keyof componentArr>
  Radio: GetProps<typeof Radio>,
  Input: GetProps<typeof Input>,
  AutoComplete: GetProps<typeof AutoComplete>,
  InputNumber: GetProps<typeof InputNumber>,
  Select: GetProps<typeof Select>,
  Cascader: GetProps<typeof Cascader>,
  Switch: GetProps<typeof Switch>,
  Slider: GetProps<typeof Slider>,
  TimePicker: GetProps<typeof TimePicker>,
  DatePicker: GetProps<typeof DatePicker>,
  Rate: GetProps<typeof Rate>,
  ColorPicker: GetProps<typeof ColorPicker>,
  Transfer: GetProps<typeof Transfer>,
  TreeSelect: GetProps<typeof TreeSelect>,
  Mentions: GetProps<typeof Mentions>,
  Upload: GetProps<typeof Upload>,
  Checkbox: GetProps<typeof Checkbox>,
  RangeDate: GetProps<typeof RangeDate>,
  RangeTime: GetProps<typeof RangeTime>,
  Search: GetProps<typeof Search>,
  TextArea: GetProps<typeof TextArea>,
  Password: GetProps<typeof Password>,
  InputGroup: GetProps<typeof InputGroup>,
  CheckboxGroup: GetProps<typeof CheckboxGroup>,
  RadioGroup: GetProps<typeof RadioGroup>,
}

export type ComponentMap = {
  [K in keyof ComponentPropsMap]: React.ComponentType<ComponentPropsMap[K]>;
}


export const componentsMap: ComponentMap = {
  Radio,
  Input,
  AutoComplete,
  InputNumber,
  Select,
  Cascader,
  Switch,
  Slider,
  TimePicker,
  DatePicker,
  Rate,
  ColorPicker,
  Transfer,
  TreeSelect,
  Mentions,
  Upload,
  Checkbox,
  RangeDate,
  RangeTime,
  Search,
  TextArea,
  Password,
  InputGroup,
  CheckboxGroup,
  RadioGroup,
};



type SnakeCase<S extends string, FirstPart extends boolean = true> =
    S extends `${infer First}${infer Rest}`
        ? `${FirstPart extends true ? ''
            : First extends Lowercase<First>
                ? ''
                : '_'}${Uppercase<First>}${SnakeCase<Rest, false>}`
        : S;

export type ComponentNameEnum = Record<SnakeCase<keyof ComponentPropsMap>, keyof ComponentPropsMap>;

export const componentNameEnum: ComponentNameEnum = {
  INPUT: 'Input',
  AUTO_COMPLETE: 'AutoComplete',
  SELECT: 'Select',
  CASCADER: 'Cascader',
  SWITCH: 'Switch',
  SLIDER: 'Slider',
  TIME_PICKER: 'TimePicker',
  DATE_PICKER: 'DatePicker',
  RATE: 'Rate',
  COLOR_PICKER: 'ColorPicker',
  TRANSFER: 'Transfer',
  TREE_SELECT: 'TreeSelect',
  UPLOAD: 'Upload',
  MENTIONS: 'Mentions',
  CHECKBOX: 'Checkbox',
  INPUT_NUMBER: 'InputNumber',
  RANGE_DATE: 'RangeDate',
  RANGE_TIME: 'RangeTime',
  SEARCH: 'Search',
  TEXT_AREA: 'TextArea',
  PASSWORD: 'Password',
  INPUT_GROUP: 'InputGroup',
  CHECKBOX_GROUP: 'CheckboxGroup',
  RADIO: 'Radio',
  RADIO_GROUP: 'RadioGroup',
};
