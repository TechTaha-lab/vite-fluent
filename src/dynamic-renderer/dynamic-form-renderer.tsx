import React, { type FC } from "react";
import { FormikConsumer } from "formik";
import { CustomInputType, type FormInputData } from "./types";
import { RendererInput } from "./renderer-input";

const cx = (...classes: Array<string | undefined | false>) => classes.filter(Boolean).join(" ");

export interface IDynamicFormRendererProps {
  data: FormInputData[];
  values: object;
  handleChange: (e: React.ChangeEvent<any>) => void;
  isArabic: boolean;
  className?: string;
}

/**
 * DynamicFormRenderer Component
 *
 * A component that dynamically renders form inputs based on the provided `data` prop, which includes the configuration of the form fields.
 * Each field is rendered according to its `type`, and the `handleChange` function is used to update the form's values.
 * Additionally, fields may support features like removing files or handling validation based on `FormInputData`.
 *
 * @component
 * @param {FormInputData[]} data - An array containing configuration for the form inputs. Each object in the array represents one form field.
 * @param {object} values - The current values of the form fields, used for binding the inputs to the state.
 * @param {(e: React.ChangeEvent<any>) => void} handleChange - Function that handles the change event for form fields, updating the `values` object.
 * @param {(startIndex: number, dividerIndex: number) => void} [handleRemoveFields] - Optional function for removing specific fields from the form.
 * @param {string} [className] - Optional CSS class to style the wrapper of the form.
 * @param {boolean} isArabic - Boolean flag indicating whether the form should be rendered in Arabic (affects layout direction).
 * @returns {JSX.Element} The rendered dynamic form based on the `data` prop and `values` state.
 */

export const DynamicFormRenderer: FC<IDynamicFormRendererProps> = ({
  data,
  values,
  handleChange,
  className,
  isArabic,

}) => {


  return (
    <div className={cx("dynamic-form-grid", className)}>
      {data?.map(
        (field, index) =>
          !field?.hidden && (
            <React.Fragment key={index}>
              <div key={index} className={field?.width || "dynamic-form-field"}>
                <FormikConsumer>
                  {({ errors, touched }) => (
                    <>
                      <RendererInput
                        isDropdownSearchable={field?.isDropdownSearchable}
                        searchPlaceholder={field?.searchPlaceholder}
                        accept={field?.accept}
                        maxFileSize={field.maxFileSize}
                        maxFilesCount={field.maxFilesCount}
                        label={field.title}
                        value={(values as any)[field.name]}
                        name={field.name}
                        options={field.options || []}
                        multiple={field.isMulti}
                        dropdownOptions={field.dropdownOptions || []}
                        type={field.type as CustomInputType}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        isDisabled={field.isDisabled}
                        required={field.required}
                        minDate={field?.minDate}
                        maxDate={field?.maxDate}
                        max={field?.maxNumber}
                        min={field?.minNumber}
                        maxLength={field?.maxLength}
                        minLength={field?.minLength}
                        hintText={field?.hintText}
                        className={field.inputClassName}
                        errorMessage={touched[field.name] ? (errors[field?.name] as string) : ""}
                        isArabic={field?.isArabic || isArabic}
                        onDownload={field?.onDownload}
                        filesOnRead={field?.filesOnRead}
                        regex={field.regex}
                      />

                    </>
                  )}
                </FormikConsumer>
              </div>
            </React.Fragment>
          )
      )}
    </div>
  );
};
