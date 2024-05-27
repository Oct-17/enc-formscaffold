import React from "react";
import type {FormInstance} from "antd";
import type {ComponentNameEnum, ComponentPropsMap} from "../utils/components-map";
import type {FormScaffoldProps} from "../index";

export type UseFormScaffold = () => [(props: FormScaffoldProps) => React.JSX.Element, {
    form: FormInstance<any>;
    CHILD: ComponentNameEnum<keyof ComponentPropsMap>;
}];


declare module 'form-scaffold' {
    export const useFormScaffold: UseFormScaffold;
}


