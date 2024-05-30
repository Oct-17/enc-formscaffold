import React from "react";
import type {FormInstance} from "antd";
import type {ComponentNameEnum} from "../utils/components-map";
import {FormScaffoldChild, FormScaffoldProps} from "../index";
import {AntdComponentProps} from "./antd-component";

export type UseFormScaffold = () => [(props: FormScaffoldProps  & FormScaffoldChild) => React.JSX.Element, {
    form: FormInstance<any>;
    CHILD: ComponentNameEnum<keyof AntdComponentProps>;
}];


declare module 'form-scaffold' {
    export const useFormScaffold: UseFormScaffold;
}


