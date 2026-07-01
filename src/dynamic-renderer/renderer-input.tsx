import React from "react";
import { CustomInputType, Regex, type DropdownOption, type IAttachment } from "./types";
import {
  Input,
  Textarea,
  Checkbox,
  RadioGroup,
  Radio,
  Dropdown,
  Option,
  Field,
  type SelectionEvents,
  type OptionOnSelectData,
} from "@fluentui/react-components";
 

export interface RadioOption {
  label: string;
  value: string | number;
}

export interface RendererInputProps {
  type: CustomInputType;
  name: string;
  label?: string;
  value?: any;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  className?: string;
  isArabic?: boolean;
  regex?: Regex;
  onChange?: (e: React.ChangeEvent<any>) => void;
  // date
  minDate?: string | Date;
  maxDate?: string | Date;
  // number
  min?: number;
  max?: number;
  // text / textarea
  minLength?: number;
  maxLength?: number;
  maxFileSize?: number;
  maxFilesCount?: number;
  accept?: string;
  hintText?: string;
  onDownload?: (attachmentId: string) => void | Promise<void>;
  // radio
  options?: RadioOption[];
  // dropdown
  dropdownOptions?: DropdownOption[];
  multiple?: boolean;
  values?: Array<string | number>;
  searchPlaceholder?: string;
  isDropdownSearchable?: boolean;
  filesOnRead?: IAttachment[] | IAttachment | null;
}

export function RendererInput({
  type,
  name,
  label,
  value,
  placeholder,
  required,
  isDisabled,
  errorMessage,
  className,
  isArabic,
  onChange,
  minDate,
  maxDate,
  min,
  max,
  hintText,
  options = [],
  dropdownOptions = [],
  multiple,
  values,
  accept,
  maxFileSize,
  maxFilesCount,
  onDownload,
  filesOnRead,
  maxLength,
  minLength,
  regex,
}: RendererInputProps) {
  void values;
  void maxFileSize;
  void maxFilesCount;
  void onDownload;
  void filesOnRead;
  void regex;

  const dir = isArabic ? "rtl" : "ltr";

  // Shared Field wrapper props
  const fieldProps = {
    label,
    required,
    hint: hintText,
    validationState: errorMessage ? ("error" as const) : undefined,
    validationMessage: errorMessage,
    className,
  };

  switch (type) {
    case CustomInputType.Text:
    case CustomInputType.TextOnly:
      return (
        <Field {...fieldProps}>
          <Input
            name={name}
            type="text"
            dir={dir}
            placeholder={placeholder}
            disabled={isDisabled}
            value={value ?? ""}
            maxLength={maxLength}
            minLength={minLength}
            onChange={onChange}
          />
        </Field>
      );

    case CustomInputType.Number:
      return (
        <Field {...fieldProps}>
          <Input
            name={name}
            type="number"
            dir={dir}
            placeholder={placeholder}
            disabled={isDisabled}
            value={value ?? ""}
            min={min}
            max={max}
            onChange={onChange}
          />
        </Field>
      );

    case CustomInputType.Email:
      return (
        <Field {...fieldProps}>
          <Input
            name={name}
            type="email"
            dir={dir}
            placeholder={placeholder}
            disabled={isDisabled}
            value={value ?? ""}
            onChange={onChange}
          />
        </Field>
      );

    case CustomInputType.Password:
      return (
        <Field {...fieldProps}>
          <Input
            name={name}
            type="password"
            dir={dir}
            placeholder={placeholder}
            disabled={isDisabled}
            value={value ?? ""}
            onChange={onChange}
          />
        </Field>
      );

    case CustomInputType.Date:
      return (
        <Field {...fieldProps}>
          <Input
            name={name}
            type="date"
            dir={dir}
            disabled={isDisabled}
            value={value ?? ""}
            min={minDate ? String(minDate) : undefined}
            max={maxDate ? String(maxDate) : undefined}
            onChange={onChange}
          />
        </Field>
      );

    case CustomInputType.DateTime:
      return (
        <Field {...fieldProps}>
          <Input
            name={name}
            type="datetime-local"
            dir={dir}
            disabled={isDisabled}
            value={value ?? ""}
            min={minDate ? String(minDate) : undefined}
            max={maxDate ? String(maxDate) : undefined}
            onChange={onChange}
          />
        </Field>
      );

    case CustomInputType.Time:
      return (
        <Field {...fieldProps}>
          <Input
            name={name}
            type="time"
            dir={dir}
            disabled={isDisabled}
            value={value ?? ""}
            onChange={onChange}
          />
        </Field>
      );

    case CustomInputType.Textarea:
      return (
        <Field {...fieldProps}>
          <Textarea
            name={name}
            dir={dir}
            placeholder={placeholder}
            disabled={isDisabled}
            value={value ?? ""}
            maxLength={maxLength}
            minLength={minLength}
            onChange={onChange}
          />
        </Field>
      );

    case CustomInputType.Checkbox:
      return (
        <Field validationState={errorMessage ? "error" : undefined} validationMessage={errorMessage} className={className}>
          <Checkbox
            name={name}
            label={label}
            disabled={isDisabled}
            checked={!!value}
            required={required}
            onChange={onChange}
          />
        </Field>
      );

    case CustomInputType.Radio:
      return (
        <Field {...fieldProps}>
          <RadioGroup
            name={name}
            value={value ?? ""}
            disabled={isDisabled}
            onChange={onChange}
          >
            {options.map((opt) => (
              <Radio key={opt.value} value={String(opt.value)} label={opt.label} />
            ))}
          </RadioGroup>
        </Field>
      );

    case CustomInputType.File:
      return (
        <Field {...fieldProps}>
          <input
            name={name}
            type="file"
            dir={dir}
            disabled={isDisabled}
            multiple={multiple}
            accept={accept}
            onChange={onChange}
          />
        </Field>
      );

    case CustomInputType.IBAN:
      return (
        <Field {...fieldProps}>
          <Input
            name={name}
            type="text"
            dir={dir}
            placeholder={placeholder}
            disabled={isDisabled}
            value={value ?? ""}
            onChange={onChange}
          />
        </Field>
      );

    case CustomInputType.Dropdown: {
      const selectedOptions = multiple
        ? (Array.isArray(value) ? value.map(String) : [])
        : value != null
        ? [String(value)]
        : [];

      const displayValue = dropdownOptions
        .filter((opt) => selectedOptions.includes(String(opt.value)))
        .map((opt) => opt.label)
        .join(", ");

      const handleOptionSelect = (
        _event: SelectionEvents,
        data: OptionOnSelectData,
      ) => {
        if (!onChange) return;
        const syntheticEvent = {
          target: {
            name,
            value: multiple ? data.selectedOptions : data.optionValue,
          },
        } as unknown as React.ChangeEvent<any>;
        onChange(syntheticEvent);
      };

      return (
        <Field {...fieldProps}>
          <Dropdown
            name={name}
            placeholder={placeholder}
            disabled={isDisabled}
            multiselect={multiple}
            selectedOptions={selectedOptions}
            value={displayValue}
            onOptionSelect={handleOptionSelect}
          >
            {dropdownOptions.map((opt) => (
              <Option key={opt.value} value={String(opt.value)} text={opt.label}>
                {opt.label}
              </Option>
            ))}
          </Dropdown>
        </Field>
      );
    }

    default:
      return null;
  }
}