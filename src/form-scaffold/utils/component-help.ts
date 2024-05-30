import {componentNameEnum} from "./components-map.js";
import type {FormScaffoldItem} from "../index";
import type {SelectProps} from "antd";
import {AntdComponentProps} from "../types/antd-component";

const selectMap = [
  componentNameEnum.SELECT,
  componentNameEnum.DATE_PICKER,
  componentNameEnum.CASCADER,
];

export const generatePlaceholder = <K extends keyof AntdComponentProps>(item: FormScaffoldItem<K>): string => {
  if (selectMap.includes(item.child)) {
    return `请选择${item.label}`;
  }

  return `请输入${item.label}`;
};

export const formatDate = (format: string) => {};

const childPropsHelper = {
  [componentNameEnum.SELECT]: (props: SelectProps) => {},
};

export const childHelps = {
  // [componentNameEnum.RANGE_DATE]: {
  //   getValueFromEvent: (value, props) => {
  //     const format = props.format || "YYYY-MM-DD";
  //     console.log(format);
  //     // return value.map((val) => {
  //     //   console.log(val.format);
  //     //   return val?.format(format);
  //     // });
  //
  //     return ["2012-12-12", "2012-12-12"];
  //   },
  // },
  // [componentNameEnum.RANGE_TIME]: {
  //   getValueFromEvent: (value, props) => {
  //     const format = props.format || "HH:mm:ss";
  //     return value.map((val) => val.format(format));
  //   },
  // },
};
