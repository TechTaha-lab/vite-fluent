import React, { useMemo } from "react";
import {
  Button,
  Card,
  CardHeader,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import type { FormInputData } from "../dynamic-renderer";
import { DynamicFormRenderer } from "../dynamic-renderer/dynamic-form-renderer";
import { DynamicFormWrapper } from "../dynamic-renderer/dynamic-form-wrapper";

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "32px",
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: {
    textAlign: "center",
  },
  title: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
    marginTop: "8px",
  },
  button: {
    width: "100%",
    marginTop: "24px",
  },
});

export const Register = () => {
  const styles = useStyles();

  const formData: FormInputData[] = useMemo(
    () => [
      {
        name: "firstName",
        title: "First Name",
        type: "Text",
        placeholder: "Enter your first name",
        value: "",
        required: true,
      },
      {
        name: "lastName",
        title: "Last Name",
        type: "Text",
        placeholder: "Enter your last name",
        value: "",
        required: true,
      },
      {
        name: "email",
        title: "Email",
        type: "Email",
        placeholder: "Enter your email",
        value: "",
        required: true,
      },
      {
        name: "phone",
        title: "Phone Number",
        type: "Text",
        placeholder: "Enter your phone number",
        value: "",
      },
      {
        name: "password",
        title: "Password",
        type: "Password",
        placeholder: "Enter your password",
        value: "",
        required: true,
        minLength: 8,
      },
      {
        name: "confirmPassword",
        title: "Confirm Password",
        type: "Password",
        placeholder: "Confirm your password",
        value: "",
        required: true,
        minLength: 8,
      },
    ],
    []
  );

  const handleSubmit = (values: any) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    users.push(values);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
  };

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <CardHeader
          header={
            <div className={styles.header}>
              <Text className={styles.title}>Create Account</Text>
              <Text block className={styles.subtitle}>
                Fill in your details to register
              </Text>
            </div>
          }
        />

        <DynamicFormWrapper
          data={formData}
          handleOnSubmitValues={handleSubmit}
          isArabic={false}
          formName="register-form"
        >
          {({ values, handleChange }) => (
            <>
              <DynamicFormRenderer
                data={formData}
                values={values}
                handleChange={handleChange}
                isArabic={false}
              />

              <Button
                appearance="primary"
                size="large"
                type="submit"
                className={styles.button}
              >
                Register
              </Button>
            </>
          )}
        </DynamicFormWrapper>
      </Card>
    </div>
  );
};

export default Register;