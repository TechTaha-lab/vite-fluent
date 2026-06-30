export default class Validator {
  static required(value: string): string | null {
    if (!value.trim()) {
      return "This field is required.";
    }

    return null;
  }

  static email(value: string): string | null {
    if (!value.trim()) {
      return "Email is required.";
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(value)) {
      return "Please enter a valid email address.";
    }

    return null;
  }

  static minLength(value: string, length: number): string | null {
    if (value.trim().length < length) {
      return `Must be at least ${length} characters.`;
    }

    return null;
  }

  static maxLength(value: string, length: number): string | null {
    if (value.trim().length > length) {
      return `Must be no more than ${length} characters.`;
    }

    return null;
  }

  static phone(value: string): string | null {
    const regex = /^[0-9]{8,15}$/;

    if (!regex.test(value)) {
      return "Invalid phone number.";
    }

    return null;
  }

  static password(value: string): string | null {
    if (value.length < 8) {
      return "Password must be at least 8 characters.";
    }

    if (!/[A-Z]/.test(value)) {
      return "Password must contain an uppercase letter.";
    }

    if (!/[a-z]/.test(value)) {
      return "Password must contain a lowercase letter.";
    }

    if (!/[0-9]/.test(value)) {
      return "Password must contain a number.";
    }

    return null;
  }
}