import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Обязательное поле")
        .matches(/^(?:\+7)?\d{11}$/, "Некорректный номер телефона"),
      password: Yup.string().required("Обязательное поле"),
    }),
    async onSubmit(values) {
      await axios
        .post("/api/auth/login", {
          phone_number: values.phone,
          password: values.password,
        })
        .then((resp) => {
          localStorage.setItem("token", resp.data.token);
          navigate("/");
        })
        .catch((err) => {
          formik.errors.password = err.response.data.error;
        });
    },
  });

  // Функция для определения класса инпута
  const getInputClassName = (name) => {
    return formik.touched[name] && formik.errors[name]
      ? "form-input error-border"
      : "form-input";
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-field">
        <label htmlFor="login-phone">Номер телефона</label>
        <input
          type="tel"
          id="login-phone"
          className={getInputClassName("phone")}
          placeholder="7 999 999 99 99"
          {...formik.getFieldProps("phone")}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="error">{formik.errors.phone}</div>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="login-password">Пароль</label>
        <input
          type="password"
          id="login-password"
          className={getInputClassName("password")}
          placeholder="Введите пароль"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}
      </div>
      <button type="submit" className="btn">
        Войти
      </button>
    </form>
  );
};

export default Login;
