import {
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  Text,
  Textarea,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Send24Regular } from "@fluentui/react-icons";
import { useState } from "react";
import Validator from "../auth/Validator";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "80px 20px",
    backgroundColor: tokens.colorNeutralBackground2,
  },

  card: {
    width: "100%",
    maxWidth: "650px",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
  },

  title: {
    textAlign: "center",
    marginBottom: "8px",
  },

  subtitle: {
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    marginBottom: "16px",
  },

  button: {
    marginTop: "10px",
    alignSelf: "flex-end",
  },
});

interface ContactForm {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactErrors {
  fullName: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
}

const initialForm: ContactForm = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

const initialErrors: ContactErrors = {
  fullName: null,
  email: null,
  subject: null,
  message: null,
};

export default function Contact() {
  const styles = useStyles();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (
    field: keyof ContactForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const validationErrors: ContactErrors = {
      fullName: Validator.required(form.fullName),
      email: Validator.email(form.email),
      subject: Validator.required(form.subject),
      message:
        Validator.required(form.message) ??
        Validator.minLength(form.message, 10),
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== null)) {
      return;
    }

    const messages: ContactForm[] = JSON.parse(
      localStorage.getItem("contactMessages") || "[]"
    );

    messages.push(form);

    localStorage.setItem(
      "contactMessages",
      JSON.stringify(messages)
    );

    alert("Message sent successfully!");

    setForm(initialForm);
    setErrors(initialErrors);
  };

  return (
    <section className={styles.container}>
      <Card className={styles.card}>
        <CardHeader
          header={
            <Text weight="semibold" size={700} className={styles.title}>
              Contact Us
            </Text>
          }
          description={
            <Text className={styles.subtitle}>
              Have a question or want to work together? We'd love to hear from you.
            </Text>
          }
        />

        <Field
          label="Full Name"
          required
          validationState={errors.fullName ? "error" : "none"}
          validationMessage={errors.fullName}
        >
          <Input
            placeholder="John Doe"
            value={form.fullName}
            onChange={(_, data) =>
              handleChange("fullName", data.value)
            }
          />
        </Field>

        <Field
          label="Email Address"
          required
          validationState={errors.email ? "error" : "none"}
          validationMessage={errors.email}
        >
          <Input
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(_, data) =>
              handleChange("email", data.value)
            }
          />
        </Field>

        <Field
          label="Subject"
          required
          validationState={errors.subject ? "error" : "none"}
          validationMessage={errors.subject}
        >
          <Input
            placeholder="How can we help?"
            value={form.subject}
            onChange={(_, data) =>
              handleChange("subject", data.value)
            }
          />
        </Field>

        <Field
          label="Message"
          required
          validationState={errors.message ? "error" : "none"}
          validationMessage={errors.message}
        >
          <Textarea
            placeholder="Write your message here..."
            resize="vertical"
            rows={6}
            value={form.message}
            onChange={(_, data) =>
              handleChange("message", data.value)
            }
          />
        </Field>

        <Button
          appearance="primary"
          icon={<Send24Regular />}
          className={styles.button}
          onClick={handleSubmit}
        >
          Send Message
        </Button>
      </Card>
    </section>
  );
}