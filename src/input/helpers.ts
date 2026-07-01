export const aria = (errorMessage: string | undefined, errorId: string, required?: boolean) => ({
  "aria-invalid":      !!errorMessage || undefined,
  "aria-required":     !!required     || undefined,
  "aria-describedby":  errorMessage ? errorId : undefined,
});

export const globalFormatDate = (date: Date | undefined, formatType: string, locale = "en"): string => {
  if (!date) return "";

  // Parse string to Date object if needed
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  // Check if the parsedDate is valid
  if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
    return "";
  }

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    "DD/MM/YYYY": { day: "2-digit", month: "2-digit", year: "numeric" },
    DD: { day: "2-digit" },
    "MMM YYYY": { month: "short", year: "numeric" },
    "HH:MM A": { hour: "2-digit", minute: "2-digit", hour12: true },
    "HH:mm": { hour: "2-digit", minute: "2-digit", hour12: false },
    "h A": { hour: "numeric", hour12: true },
    "MMM D, YYYY": { day: "numeric", month: "short", year: "numeric" },
    MMM: { month: "short" },
    YYYY: { year: "numeric" },
  };

  // Fallback to default format if formatType doesn't exist in the map
  const options = formatOptions[formatType] || {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  // Use Intl.DateTimeFormat for locale-aware formatting
  try {
    const formatter = new Intl.DateTimeFormat(locale, options);

    // Handle Arabic locale-specific behavior
    if (locale.trim().includes("ar")) {
      return formatter
        .format(parsedDate)
        .normalize("NFKD") // Normalize Arabic script
        .replace(/\u200E|\u200F/g, ""); // Remove unwanted LTR/RTL markers
    }

    // Default for non-Arabic locales
    return formatter.format(parsedDate);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
};

export const EMIRAT_PHONE_NUMBER_VALIDATION = /^(?:[\u200E\u200F])?\+(\d{3})\s?(\d{2})\s?(\d{3})\s?(\d{4})(?:[\u200E\u200F])?$/;
export const IBAN_VALIDATION = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;
export const IDENTITY_VALIDATION = /^\d{15}$/;

export const isFileReadable = (file: File): Promise<boolean> => {
  return new Promise(async (resolve) => {
    if (!file || file.size < 100) {
      console.warn("❌ File is empty or too small to be valid");
      return resolve(false);
    }

    try {
      const headerChunk = file.slice(0, 512);
      const buffer = await headerChunk.arrayBuffer();
      const byteArray = new Uint8Array(buffer);

      const hex = (bytes: number[]) =>
        bytes
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(" ")
          .toLowerCase();

      const headerHex = hex(Array.from(byteArray.slice(0, 8)));

      // Format magic number detection
      const isPDF = headerHex.startsWith("25 50 44 46"); // %PDF
      const isDOC = headerHex.startsWith("d0 cf 11 e0 a1 b1 1a e1"); // Legacy DOC, XLS, PPT
      const isDOCX = headerHex.startsWith("50 4b 03 04"); // DOCX/XLSX/PPTX are all ZIP files
      const isRTF = headerHex.startsWith("7b 5c 72 74 66"); // {\rtf
      const isODT = headerHex.startsWith("50 4b 03 04"); // ODT is also ZIP-based

      if (isPDF || isDOC || isDOCX || isRTF || isODT) {
        return resolve(true);
      }

      console.warn("❌ Unknown or corrupted file header:", headerHex);
      return resolve(false);
    } catch (err) {
      console.error("❌ Exception during document validation:", err);
      return resolve(false);
    }
  });
};

export function sanitizeTextInput(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
) {
  // Allow: Unicode letters, digits, whitespace, and common punctuation
  const sanitized = e.target.value.replace(
    /[^\p{L}\p{N}\p{Z}\p{P}\p{M}]/gu,
    ""
  );

  if (sanitized !== e.target.value) {
    e.target.value = sanitized;
    // Create a synthetic event with the sanitized value
    const syntheticEvent = {
      ...e,
      target: { ...e.target, value: sanitized },
    } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    onChange?.(syntheticEvent);
  } else {
    onChange?.(e);
  }
}

export function sanitizeNumberInput(
  e: React.ChangeEvent<HTMLInputElement>,
  onChange?: React.ChangeEventHandler<HTMLInputElement>
) {
  // Strip minus, e, +, and anything that isn't a digit or decimal point
  const sanitized = e.target.value.replace(/[^0-9.]/g, "");

  if (sanitized !== e.target.value) {
    e.target.value = sanitized;
    const syntheticEvent = {
      ...e,
      target: { ...e.target, value: sanitized },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
  } else {
    onChange?.(e);
  }
}
export function blockNumberInvalidKeys(e: React.KeyboardEvent<HTMLInputElement>) {
  if (["-", "e", "E", "+"].includes(e.key)) {
    e.preventDefault();
  }
}