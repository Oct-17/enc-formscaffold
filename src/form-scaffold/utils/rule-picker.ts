import type {FormItemProps} from "antd";
import type {FormRule} from "antd";

const ruleMap: Record<string, (msg: string) => FormRule> = {
  req: (msg: string) => ({ required: true, message: msg || "请输入" }),
  phone: (msg: any) => ({
    pattern: /^1[3-9]\d{9}$/,
    message: msg || "请输入正确的手机号",
    trigger: "change",
  }),
  email: (msg: any) => ({
    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: msg || "请输入正确的邮箱",
    trigger: "change",
  }),
  password: (msg: any) => ({
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
    message: msg || "密码由8-16位字母、数字、符号组成",
    trigger: "change",
  }),
  number: (msg: any) => ({
    pattern: /^[0-9]*$/,
    message: msg || "请输入数字",
    trigger: "change",
  }),
  money: (msg: any) => ({
    pattern: /^[0-9]+(.[0-9]{1,2})?$/,
    message: msg || "请输入正确的金额",
    trigger: "change",
  }),
};

const rulePicker = (rule: string, msg: string) => {
  if (ruleMap[rule]) {
    return ruleMap[rule](msg);
  }
  return {};
};

export const ruleHelper = (rules: string[] | FormRule[] = [], msg: any) => {
  const result: FormItemProps['rules'] = [];
  rules.forEach((rule) => {
    if (typeof rule === 'string') {
      result.push(rulePicker(rule, msg));
    } else {
      result.push(rule);
    }
  });

  return result;
};

export default rulePicker;
