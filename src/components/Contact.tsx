import {
  Button,
  Card,
  CardHeader,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Send24Regular } from "@fluentui/react-icons";
import { useMemo } from "react";
import { DynamicFormRenderer } from "../dynamic-renderer/dynamic-form-renderer";
import { DynamicFormWrapper } from "../dynamic-renderer/dynamic-form-wrapper";
import { CustomInputType, type FormInputData } from "../dynamic-renderer/types";

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

export default function Contact() {
  const styles = useStyles();

  const formData: FormInputData[] = useMemo(
    () => [
      {
        name: "fullName",
        title: "Full Name",
        type: CustomInputType.Text,
        placeholder: "John Doe",
        value: "",
        required: true,
        isDisabled: false,
        width: "100%",
      },
      {
        name: "email",
        title: "Email Address",
        type: CustomInputType.Email,
        placeholder: "john@example.com",
        value: "",
        required: true,
        isDisabled: false,
        width: "100%",
      },
      {
        name: "subject",
        title: "Subject",
        type: CustomInputType.Text,
        placeholder: "How can we help?",
        value: "",
        required: true,
        isDisabled: false,
        width: "100%",
      },
      {
        name: "message",
        title: "Message",
        type: CustomInputType.Textarea,
        placeholder: "Write your message here...",
        value: "",
        required: true,
        isDisabled: false,
        width: "100%",
      },
    ],
    []
  );

  const handleSubmit = (values: any) => {
    const messages = JSON.parse(localStorage.getItem("contactMessages") || "[]");

    messages.push(values);

    localStorage.setItem("contactMessages", JSON.stringify(messages));

    alert("Message sent successfully!");
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

        <DynamicFormWrapper
          data={formData}
          handleOnSubmitValues={handleSubmit}
          isArabic={false}
          formName="contact-form"
        >
          {({ values, handleChange }: any) => (
            <>
              <DynamicFormRenderer
                data={formData}
                values={values}
                handleChange={handleChange}
                isArabic={false}
              />

              <Button
                appearance="primary"
                icon={<Send24Regular />}
                className={styles.button}
                type="submit"
              >
                Send Message
              </Button>
            </>
          )}
        </DynamicFormWrapper>
      </Card>
    </section>
  );
}