# enc-formscaffold

[![NPM version](https://img.shields.io/npm/v/ect-rc-form-scaffold.svg?style=flat)](https://npmjs.com/package/ect-rc-form-scaffold)
[![NPM downloads](http://img.shields.io/npm/dm/ect-rc-form-scaffold.svg?style=flat)](https://npmjs.com/package/ect-rc-form-scaffold)

## Install

```bash
$ npm install enc-formscaffold
```

## Usage

```jsx
import useFormscaffold from 'enc-formscaffold';
import {Button} from "antd";

const Demo = () => {
  const [FormScaffold, {form, CHILD}] = useFormscaffold();

  return (<FormScaffold
    formProps={{
      // antd form props
    }}
    options={[
      {
        id: 'user',
        label: 'username',
        rules: ['req'],
        fieldProps: {
          // antd input props..
        }
      },
      {
        containerRender: (form) => <Button onClick={() => {
          /* form.xxx() */
        }}>click</Button>
      },
      {
        id: 'password',
        label: 'password',
        child: CHILD.PASSWORD,
        rules: ['req'],
        render: (props, form) => <input {...props} />
      },
    ]}
  />);
}
```

## LICENSE

MIT
