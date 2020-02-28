
import React from 'react';

interface FormField {
    key: string | number,
    component: [React.Component, {
        [name: string]: any
    }] | React.Component,
    decorator?: {
        [name: string]: any
    }
}

interface ErrorMessage {
    message?: string,
    field: string
}

export interface DynamicFormProps {
    onFieldsChange?: (fields: any, allFields: any) => void
    onValuesChange?: (changedValues: any, allValues: any) => void,
    fields?: {
        [name: string]: {
            value?: any,
            name?: string,
            touched?: boolean,
            dirty?: boolean,
            error?: ErrorMessage[],
            validating?: boolean
        }
    },
    settings?: {
        props?: {
            [name: string]: any
        },
        fields?: FormField[]
    }
}
