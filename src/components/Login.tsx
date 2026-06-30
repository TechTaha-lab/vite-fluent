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
import { DynamicFormWrapper } from "../dynamic-renderer/dynamic-form-wrapper";
import { DynamicFormRenderer } from "../dynamic-renderer/dynamic-form-renderer";
import { useNavigate } from "react-router-dom";

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
    maxWidth: "450px",
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

export const Login = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const formData: FormInputData[] = useMemo(
    () => [
      {
        name: "email",
        title: "Email",
        type: "Email",
        placeholder: "Enter your email",
        value: "",
        required: true,
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
    ],
    []
  );

  const handleSubmit = (values: any) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u: any) =>
        u.email === values.email &&
        u.password === values.password
    );

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={styles.page}>
      <Card className={styles.card}>

        <CardHeader
          header={
            <div className={styles.header}>
              <Text className={styles.title}>Welcome Back</Text>

              <Text block className={styles.subtitle}>
                Sign in to continue to your account
              </Text>
            </div>
          }
        />

        <DynamicFormWrapper
          data={formData}
          handleOnSubmitValues={handleSubmit}
          isArabic={false}
          formName="login-form"
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
                Login
              </Button>
            </>
          )}
        </DynamicFormWrapper>

      </Card>
    </div>
  );
};

export default Login;