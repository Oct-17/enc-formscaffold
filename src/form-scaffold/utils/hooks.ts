import type {FormInstance} from "antd";

const proxyFormHooks = (form: FormInstance): FormInstance<any> => {
  const originalValidateFields = form.validateFields;
  form.validateFields = (...args) => {
    return new Promise((resolve, reject) => {
      originalValidateFields(...args as any)
        .then((values) => {
          const result = { ...values };
          Object.keys(values).forEach((key) => {
            if (typeof values[key] === "object") {
              const innerKeys = Object.keys(values[key]);
              if (innerKeys.length === 1) {
                const innerKey = innerKeys[0];
                const value = values?.[key]?.[innerKey];
                if (Array.isArray(value) && value.length === 2) {
                  result[innerKey] = values[key][innerKey][1];
                  result[key] = values[key][innerKey][0];
                }
              }
            }
          });
          resolve(result);
        })
        .catch(reject);
    });
  };

  // const instance = new Proxy(form, {
  //   apply(target: FormInstance<any>, thisArg: any, argArray: any[]): any {
  //     return Reflect.apply(target.validateFields, thisArg, argArray);
  //   }
  // });

  return form;
};

export default proxyFormHooks;
