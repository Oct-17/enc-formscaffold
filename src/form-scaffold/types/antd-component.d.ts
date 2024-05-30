import {
  InputProps,
  InputNumberProps,
  SelectProps,
  CascaderProps,
  DatePickerProps,
  TimePickerProps,
  TreeSelectProps,
  SwitchProps,
  SliderProps,
  RadioProps,
  RadioGroupProps,
  CheckboxProps,
  RateProps,
  TransferProps,
  MentionsProps,
  UploadProps,
  AutoCompleteProps,
  ColorPickerProps,
} from 'antd';
import {RangePickerProps} from "antd/es/date-picker";
import {RangePickerTimeProps} from "antd/es/time-picker";
import {GroupProps, PasswordProps, SearchProps, TextAreaProps} from "antd/es/input";
import {CheckboxGroupProps} from "antd/es/checkbox";
import {RadioButtonProps} from "antd/es/radio/radioButton";
import {FormScaffoldItem} from "../index";

export interface AntdComponentProps {
  Radio: RadioProps,
  Input: InputProps,
  AutoComplete: AutoCompleteProps,
  InputNumber: InputNumberProps,
  Select: SelectProps,
  Cascader: CascaderProps,
  Switch: SwitchProps,
  Slider: SliderProps,
  TimePicker: TimePickerProps,
  DatePicker: DatePickerProps,
  Rate: RateProps,
  ColorPicker: ColorPickerProps,
  Transfer: TransferProps,
  TreeSelect: TreeSelectProps,
  Mentions: MentionsProps,
  Upload: UploadProps,
  Checkbox: CheckboxProps,
  RangeDate: RangePickerProps,
  RangeTime: RangePickerTimeProps<any>,
  Search: SearchProps,
  TextArea: TextAreaProps,
  Password: PasswordProps,
  InputGroup: GroupProps,
  CheckboxGroup: CheckboxGroupProps,
  RadioGroup: RadioGroupProps,
  RadioButton: RadioButtonProps,
}

type FieldProps<T extends keyof AntdComponentProps> = AntdComponentProps[T];

export interface GenerateOption {
  (key: keyof AntdComponentProps, opt: Omit<FormScaffoldItem<T>, 'child'>): FormScaffoldItem<T>;
}
