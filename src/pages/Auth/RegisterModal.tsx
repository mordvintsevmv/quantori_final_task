import React, { FC, Fragment, useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { createUserAsync } from "../../api/firebase.ts"
import { getErrorMessage } from "../../utils/getErrorMessage.ts"

interface FormValues {
  email: string
  password: string
  confirmPassword: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .matches(
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please enter an valid email address",
    ),
  password: Yup.string()
    .required("Password is a required field")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      "Password must contain at least 1 lower case letter, 1 upper case letter and a number",
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
})

interface RegisterModalProps {
  handleSetLogin: () => void
}

const RegisterModal: FC<RegisterModalProps> = ({ handleSetLogin }) => {
  const [authError, setAuthError] = useState<string | null>(null)

  const handleRegisterSubmitAsync = async (values: FormValues) => {
    try {
      await createUserAsync(values.email, values.password)
    } catch (error) {
      setAuthError(getErrorMessage(error))
    }
  }

  const handleResetAuthError = () => {
    setAuthError(null)
  }

  useEffect(() => {
    document.title = "Sign up to Q-1 Search"
  }, [])

  return (
    <Fragment>
      <h2 className="auth__title">{"Sign up"}</h2>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={handleRegisterSubmitAsync}
        validationSchema={validationSchema}
      >
        {({ errors, touched, isValid, isSubmitting, dirty, handleChange }) => (
          <Form>
            <div className="auth__form-element">
              <label htmlFor="auth-email">{"Email"}</label>
              <Field
                id="auth-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  handleChange(e)
                  handleResetAuthError()
                }}
                className={
                  (touched.email && errors.email) || authError
                    ? "auth__input--error"
                    : "auth__input--valid"
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="auth__valid-error"
              />
            </div>

            <div className="auth__form-element">
              <label htmlFor="auth-password">{"Password"}</label>
              <Field
                id="auth-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  handleChange(e)
                  handleResetAuthError()
                }}
                className={
                  (touched.password && errors.password) || authError
                    ? "auth__input--error"
                    : "auth__input--valid"
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="auth__valid-error"
              />
            </div>

            <div className="auth__form-element">
              <label htmlFor="auth-password">{"Repeat Password"}</label>
              <Field
                id="auth-confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter your password again"
                onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  handleChange(e)
                  handleResetAuthError()
                }}
                className={
                  (touched.confirmPassword && errors.confirmPassword) ||
                  authError
                    ? "auth__input--error"
                    : "auth__input--valid"
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="auth__valid-error"
              />
            </div>

            {authError ? (
              <div className="auth__auth-error">{authError}</div>
            ) : null}

            <button
              type="submit"
              className="button auth__button"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              {"Create Account"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="auth__auth-type">{"Already have an account? "}</p>
      <p
        className="auth__auth-type auth__auth-type--link"
        onClick={handleSetLogin}
      >
        {"Login"}
      </p>
    </Fragment>
  )
}

export default RegisterModal
