import React, { FC, Fragment, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { loginUserAsync } from "../../api/firebase.ts"
import { getErrorMessage } from "../../utils/getErrorMessage.ts"

interface FormValues {
  email: string
  password: string
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
    .min(6, "Password must be at least 6 characters"),
})

interface LoginModalProps {
  handleSetRegister: () => void
}

const LoginModal: FC<LoginModalProps> = ({ handleSetRegister }) => {
  const [authError, setAuthError] = useState<string | null>(null)

  const handleLoginSubmitAsync = async (values: FormValues) => {
    try {
      await loginUserAsync(values.email, values.password)
    } catch (error) {
      setAuthError(getErrorMessage(error))
    }
  }

  const handleResetAuthError = () => {
    setAuthError(null)
  }

  return (
    <Fragment>
      <h2 className="auth__title">{"Login"}</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLoginSubmitAsync}
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

            {authError ? (
              <div className="auth__auth-error">{authError}</div>
            ) : null}
            <button
              type="submit"
              className="button auth__button"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              {"Login"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="auth__auth-type">{"Don’t have an account? "}</p>
      <p
        className="auth__auth-type auth__auth-type--link"
        onClick={handleSetRegister}
      >
        {"Sign up"}
      </p>
    </Fragment>
  )
}

export default LoginModal
