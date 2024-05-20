import React from "react";
import type {FormInstance} from "antd";
import type {ComponentNameEnum} from "../utils/components-map";
import type {FormScaffoldProps} from "../index";

export type UseFormScaffold = () => [(props: FormScaffoldProps) => React.JSX.Element, {
    form: FormInstance<any>;
    CHILD: ComponentNameEnum;
}];


declare module 'form-scaffold' {
    export const useFormScaffold: UseFormScaffold;
}


