import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const initialFormState = {
    email: {
      isValid: false,
      value: "",
    },
    password: {
      isValid: false,
      value: "",
    },
    isFormValid: false,
  };
  const formReducer = (state, action) => {
    switch (action.type) {
      case "EMAIL_VALUE_CHANGE":
        return { ...state, email: { ...state.email, value: action.payload } };
      case "PASSWORD_VALUE_CHANGE":
        return {
          ...state,
          password: { ...state.password, value: action.payload },
        };
      case "FORM_VALIDITY_CHANGE":
        return { ...state, isFormValid: action.payload };
      case "EMAIL_VALIDITY_CHANGE":
        return {
          ...state,
          email: {
            ...state.email,
            isValid: action.payload,
          },
        };
      case "PASSWORD_VALIDITY_CHANGE":
        return {
          ...state,
          password: {
            ...state.password,
            isValid: action.payload,
          },
        };
      default:
        return state;
    }
  };
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialFormState
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchFormState({
        type: "FORM_VALIDITY_CHANGE",
        payload:
          formState.email.value.includes("@") &&
          formState.password.value.trim().length > 6,
      });
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [formState.email.value, formState.password.value]);

  const emailChangeHandler = (event) => {
    dispatchFormState({
      type: "EMAIL_VALUE_CHANGE",
      payload: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchFormState({
      type: "PASSWORD_VALUE_CHANGE",
      payload: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchFormState({
      type: "EMAIL_VALIDITY_CHANGE",
      payload: formState.email.value.includes("@"),
    });
  };

  const validatePasswordHandler = () => {
    dispatchFormState({
      type: "PASSWORD_VALIDITY_CHANGE",
      payload: formState.password.value.trim().length > 6,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formState.email.value, formState.password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.email.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.password.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formState.isFormValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
