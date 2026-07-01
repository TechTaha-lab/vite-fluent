import { type FC } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInputType, Regex, type FormInputData } from "./types";
import { globalFormatDate, IBAN_VALIDATION } from "../input/helpers";

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
  void isArabic;

  return (
      <DynamicFormContent
        data={data}
        children={children}
        formName={formName}
        handleOnSubmitValues={handleOnSubmitValues}
        enableReinitialize={enableReinitialize}
      />
  );
};

// Internal component that contains the original logic
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
  }, {});
  const validationSchema = data.reduce((schema: any, field) => {
    let yupType;

    const getValidationMessage = (defaultMessage: string) => {
      return defaultMessage;
    };

    const isTextOrNumberInput =
      field.type === CustomInputType.Text ||
      field.type === CustomInputType.Textarea ||
      field.type === CustomInputType.Number;

    switch (field.type) {
      case CustomInputType.Email:
        yupType = Yup.string()
          .email(getValidationMessage("Invalid email address"))
          .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, getValidationMessage("Invalid email address"));
        break;

      case CustomInputType.Number:
        yupType = Yup.number();

        if (field.minNumber !== undefined && field.minNumber !== null) {
          yupType = yupType.min(
            field.minNumber,
            getValidationMessage(`Value must be at least ${field.minNumber}`),
          );
        }

        if (field.maxNumber !== undefined && field.maxNumber !== null) {
          yupType = yupType.max(
            field.maxNumber,
            getValidationMessage(`Value must be at most ${field.maxNumber}`),
          );
        }
        break;

      case CustomInputType.Date:
      case CustomInputType.DateTime:
        const MIN_ALLOWED_DATE = new Date("1860-01-01");
        const MAX_ALLOWED_DATE = new Date("4000-12-31");

        yupType = Yup.date()
          .typeError("Invalid date")
          .test(
            "valid-year-range",
            "Year must be between 1860 and 4000",
            (value: any) => {
              if (!value) return true;
              const year = value.getFullYear();
              return year >= 1860 && year <= 4000;
            },
          );

        const effectiveMin =
          field.minDate && new Date(field.minDate) > MIN_ALLOWED_DATE ? field.minDate : MIN_ALLOWED_DATE;

        const effectiveMax =
          field.maxDate && new Date(field.maxDate) < MAX_ALLOWED_DATE ? field.maxDate : MAX_ALLOWED_DATE;

        yupType = yupType
          .min(
            effectiveMin,
            getValidationMessage(
              `Date must be on or after ${globalFormatDate(effectiveMin as Date, "DD/MM/YYYY")}`,
            ),
          )
          .max(
            effectiveMax,
            getValidationMessage(
              `Date must be on or before ${globalFormatDate(effectiveMax as Date, "DD/MM/YYYY")}`,
            ),
          );
        break;

      case CustomInputType.Checkbox:
        yupType = Yup.boolean();
        break;

      case CustomInputType.Dropdown:
        if (field.isMulti) {
          yupType = Yup.array();
        } else if (field?.fieldType === CustomInputType.Number) {
          yupType = Yup.number();
        } else {
          yupType = Yup.string();
        }
        break;

      case CustomInputType.IBAN:
        yupType = Yup.string()
          .required(getValidationMessage("This field is required"))
          .test(
            "is-valid-iban",
            getValidationMessage("Invalid IBAN"),
            (value: string) => !value || IBAN_VALIDATION.test(value),
          );
        break;

      case CustomInputType.Text:
      case CustomInputType.Textarea:
        const regexType = field.regex || undefined;

        if (regexType === Regex.Arabic) {
          yupType = Yup.string().test(
            "is-valid-arabic",
            getValidationMessage("Arabic characters only"),
            (value): boolean => {
              if (!value) return true;
              if (value.trim().length === 0) return false;

              const noEnglishRegex = /^[^\u0000-\u007F]*$|^[^a-zA-Z]*$/;
              return noEnglishRegex.test(value);
            },
          );
        } else if (regexType === Regex.English) {
          yupType = Yup.string().test(
            "is-valid-english",
            getValidationMessage("English characters only"),
            (value): boolean => {
              if (!value) return true;
              if (value.trim().length === 0) return false;

              const noArabicRegex = /^[^\u0600-\u06FF]*$/;
              return noArabicRegex.test(value);
            },
          );
        } else if (regexType === Regex.AlphaNumberic) {
          yupType = Yup.string().test(
            "is-valid-alphanumeric",
            getValidationMessage("Alphanumeric characters only"),
            (value): boolean => {
              if (!value) return true;
              if (value.trim().length === 0) return false;

              const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
              return alphaNumericRegex.test(value);
            },
          );
        } else {
          yupType = Yup.string().test(
            "is-not-blank",
            getValidationMessage("This field cannot be empty"),
            (value): boolean => {
              if (field.required === false || !field.required) return true;
              return value !== undefined && value !== null && value.trim().length > 0;
            },
          );
        }
        break;

      case CustomInputType.File:
        yupType = Yup.array().of(Yup.mixed().nullable());
        if (field.required) {
          yupType = (yupType as any).min(
            1,
            getValidationMessage(`${field.title} is required`),
          );
        }
        break;

      default:
        yupType = Yup.string();
        break;
    }

    if (isTextOrNumberInput) {
      if (field.minLength !== undefined && field.minLength !== null && field.minLength > 1) {
        if (field.type === CustomInputType.Number) {
          yupType = (yupType as any).test(
            "min-digits",
            getValidationMessage(`Minimum of ${field.minLength} digits required`),
            (value: any) => {
              if (!value) return true;
              return value.toString().length >= field.minLength!;
            },
          );
        } else {
          yupType = (yupType as any).min(
            field.minLength,
            getValidationMessage(`Minimum length is ${field.minLength}`),
          );
        }
      }

      if (field.maxLength !== undefined && field.maxLength !== null && field.maxLength > 1) {
        if (field.type === CustomInputType.Number) {
          yupType = (yupType as any).test(
            "max-digits",
            getValidationMessage(`Maximum of ${field.maxLength} digits allowed`),
            (value: any) => {
              if (!value) return true;
              return value.toString().length <= field.maxLength!;
            },
          );
        } else {
          yupType = (yupType as any).max(
            field.maxLength,
            getValidationMessage(`Maximum length is ${field.maxLength}`),
          );
        }
      }
    }
    if (field.required === false || !field.required) {
      schema[field.name] = yupType.optional().nullable();
    } else {
      schema[field.name] = yupType.required(
        getValidationMessage(`${field.title} is required`),
      );
    }

    return schema;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={(values) => {
        handleOnSubmitValues(values);
      }}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => (
        <Form id={formName} name={formName}>
          {children && children(formikProps)}
        </Form>
      )}
    </Formik>
  );
};