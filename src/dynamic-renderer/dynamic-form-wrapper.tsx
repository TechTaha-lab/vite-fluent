import React, { type FC } from "react";
import { Formik, Form } from "formik";
import { CustomInputType, type FormInputData } from "./types";

export interface IDynamicFormWrapperProps {
  data: FormInputData[];
  children?: any;
  handleOnSubmitValues: (items: object) => any;
  enableReinitialize?: boolean;
  formName?: string;
  isArabic: boolean;
}

export const DynamicFormWrapper: FC<IDynamicFormWrapperProps> = ({
  data,
  children,
  handleOnSubmitValues,
  enableReinitialize = true,
  formName,
  isArabic,
}) => {
  return (
    <div id="dynamic-form-renderer" dir={isArabic ? "rtl" : "ltr"}>
      <DynamicFormContent
        data={data}
        children={children}
        formName={formName}
        handleOnSubmitValues={handleOnSubmitValues}
        enableReinitialize={enableReinitialize}
      />
    </div>
  );
};

const DynamicFormContent: FC<Omit<IDynamicFormWrapperProps, "isArabic">> = ({
  data,
  children,
  handleOnSubmitValues,
  enableReinitialize = true,
  formName,
}) => {
  const initialValues = data.reduce((acc, field) => {
    let value: any = field.value;

    if (field.type === CustomInputType.File) {
      if (Array.isArray(value)) {
      } else if (value != null && typeof value === "object") {
        value = [value];
      } else {
        value = [];
      }
    }

    return { ...acc, [field.name]: value };
  }, {} as Record<string, any>);

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) =>
        validateForm(data, values as Record<string, unknown>)
      }
      onSubmit={(values, { setTouched, validateForm }) => {
        const allTouched = data.reduce((acc, field) => {
          acc[field.name] = true;
          return acc;
        }, {} as Record<string, boolean>);

        setTouched(allTouched);

        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
          handleOnSubmitValues(values);
        }
      }}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => <Form id={formName}>{children && children(formikProps)}</Form>}
    </Formik>
  );
};

function validateForm(data: FormInputData[], values: Record<string, unknown>) {
  const errors: Record<string, string> = {};

  data.forEach((field) => {
    const value = values[field.name];
    const textValue = typeof value === "string" ? value.trim() : value;

    if (
      field.required &&
      (textValue === "" || textValue === undefined || textValue === null)
    ) {
      errors[field.name] = `${field.title} is required`;
      return;
    }

    if (!textValue) return;

    if (
      field.type === CustomInputType.Email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(textValue))
    ) {
      errors[field.name] = "Enter a valid email address";
    }

    if (field.minLength && String(textValue).length < field.minLength) {
      errors[field.name] = `${field.title} must be at least ${field.minLength} characters`;
    }

    if (field.maxLength && String(textValue).length > field.maxLength) {
      errors[field.name] = `${field.title} must be ${field.maxLength} characters or less`;
    }
  });

  return errors;
}