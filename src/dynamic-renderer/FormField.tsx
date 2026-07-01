import type { ReactNode } from "react";
import { Field, FieldDescription, FieldLabel } from  "../ui/field"
import type { BaseInputProps } from "./types";

interface FormFieldProps
  extends Pick<
    BaseInputProps,
    "label" | "description" | "required" | "errorMessage" | "labelStyle" | "isArabic"
  > {
  inputId: string;
  errorId: string;
  children: ReactNode;
}

/**
 * Shared wrapper used by every input component.
 *
 * Structure (shadcn):
 *   <Field data-invalid?>
 *     <FieldLabel>   label + optional tag   </FieldLabel>
 *     {children}     ← the actual <input>
 *     <FieldDescription>   description   </FieldDescription>
 *     <p role="alert">     error           </p>
 *   </Field>
 */
export function FormField({
  inputId,
  errorId,
  label,
  description,
  required,
  errorMessage,
  labelStyle,
  isArabic,
  children,
}: FormFieldProps) {
  return (
    // data-invalid drives shadcn's error styling on the field
    <Field
      dir={isArabic ? "rtl" : "ltr"}
      data-invalid={!!errorMessage || undefined}>
      {label && (
        <FieldLabel htmlFor={inputId} style={labelStyle}>
          <span className={`flex items-center gap-1 `}>
            {label}
            {!required && (
              <span className="text-aered-600 text-xs">
                {isArabic ? "(اختياري)" : "(Optional)"}
              </span>
            )}
          </span>
        </FieldLabel>
      )}

      {children}

      {description && !errorMessage && (
        <FieldDescription
          className={`text-sm m-0! ${isArabic ? "text-right" : "text-left"}`}
        >{description}</FieldDescription>
      )}

      {errorMessage && (
        <p id={errorId} className="text-sm m-0!" role="alert">
          {errorMessage}
        </p>
      )}
    </Field>
  );
}