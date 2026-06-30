import React from "react";
import {
  Checkbox,
  Field,
  Input,
  Radio,
  RadioGroup,
  Select,
  Textarea,
} from "@fluentui/react-components";
import { CustomInputType, type DropdownOption, type RadioOption } from "./types";

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
  onChange?: (e: React.ChangeEvent<any>) => void;
  minDate?: string | Date;
  maxDate?: string | Date;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  options?: RadioOption[];
  dropdownOptions?: DropdownOption[];
  multiple?: boolean;
  accept?: string;
  hintText?: string;
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
  options = [],
  dropdownOptions = [],
  multiple,
  accept,
  hintText,
  maxLength,
  minLength,
}: RendererInputProps) {
  const validationState = errorMessage ? "error" : "none";
  const inputProps = {
    id: name,
    name,
    value: value ?? "",
    placeholder,
    disabled: isDisabled,
    required,
    className,
    onChange,
  };

  return (
    <Field
      label={label}
      required={required}
      validationState={validationState}
      validationMessage={errorMessage}
      hint={hintText}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {renderControl({
        type,
        inputProps,
        minDate,
        maxDate,
        min,
        max,
        minLength,
        maxLength,
        options,
        dropdownOptions,
        multiple,
        accept,
        checked: Boolean(value),
        value,
        onChange,
        isDisabled,
      })}
    </Field>
  );
}

function renderControl({
  type,
  inputProps,
  minDate,
  maxDate,
  min,
  max,
  minLength,
  maxLength,
  options,
  dropdownOptions,
  multiple,
  accept,
  checked,
  value,
  onChange,
  isDisabled,
}: {
  type: CustomInputType;
  inputProps: React.ComponentProps<typeof Input>;
  minDate?: string | Date;
  maxDate?: string | Date;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  options: RadioOption[];
  dropdownOptions: DropdownOption[];
  multiple?: boolean;
  accept?: string;
  checked: boolean;
  value?: any;
  onChange?: (e: React.ChangeEvent<any>) => void;
  isDisabled?: boolean;
}) {
  switch (type) {
    case CustomInputType.Email:
      return <Input {...inputProps} type="email" />;
    case CustomInputType.Password:
      return <Input {...inputProps} type="password" minLength={minLength} maxLength={maxLength} />;
    case CustomInputType.Number:
      return <Input {...inputProps} type="number" min={min} max={max} />;
    case CustomInputType.Date:
      return <Input {...inputProps} type="date" min={formatDateLimit(minDate)} max={formatDateLimit(maxDate)} />;
    case CustomInputType.DateTime:
      return (
        <Input
          {...inputProps}
          type="datetime-local"
          min={formatDateLimit(minDate)}
          max={formatDateLimit(maxDate)}
        />
      );
    case CustomInputType.Time:
      return <Input {...inputProps} type="time" />;
    case CustomInputType.Textarea:
      return (
        <Textarea
          id={inputProps.id}
          name={inputProps.name}
          value={String(inputProps.value ?? "")}
          placeholder={inputProps.placeholder}
          disabled={inputProps.disabled}
          required={inputProps.required}
          className={inputProps.className}
          onChange={onChange}
          maxLength={maxLength}
        />
      );
    case CustomInputType.Checkbox:
      return (
        <Checkbox
          name={inputProps.name}
          checked={checked}
          disabled={isDisabled}
          onChange={onChange as any}
        />
      );
    case CustomInputType.Radio:
      return (
        <RadioGroup name={String(inputProps.name)} value={String(value ?? "")} onChange={onChange as any}>
          {options.map((option) => (
            <Radio key={option.value} value={String(option.value)} label={option.label} disabled={isDisabled} />
          ))}
        </RadioGroup>
      );
    case CustomInputType.Dropdown:
      return (
        <Select
          id={inputProps.id}
          name={inputProps.name}
          value={String(value ?? "")}
          disabled={inputProps.disabled}
          required={inputProps.required}
          className={inputProps.className}
          onChange={onChange as any}
          multiple={multiple}
        >
          <option value="">{inputProps.placeholder || "Select an option"}</option>
          {dropdownOptions.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    case CustomInputType.File:
      return <Input id={inputProps.id} name={inputProps.name} type="file" accept={accept} onChange={onChange} />;
    case CustomInputType.Text:
    case CustomInputType.TextOnly:
    case CustomInputType.IBAN:
    default:
      return <Input {...inputProps} type="text" minLength={minLength} maxLength={maxLength} />;
  }
}

function formatDateLimit(value?: string | Date) {
  if (!value) {
    return undefined;
  }

  return value instanceof Date ? value.toISOString().slice(0, 10) : value;
}
