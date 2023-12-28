import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Обязательное поле"),
      phone: Yup.string()
        .required("Обязательное поле")
        .matches(/^(?:\+7)?\d{11}$/, "Некорректный номер телефона"),
      password: Yup.string()
        .required("Обязательное поле")
        .min(8, "Пароль должен быть не менее 8 символов"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
        .required("Обязательное поле"),
    }),
    async onSubmit(values) {
      const response = await axios
        .post("/api/auth/register", {
          name: values.name,
          phone_number: values.phone,
          password: values.password,
          password_confirmation: values.confirmPassword,
        })
        .then((resp) => {
          localStorage.setItem("token", resp.data.token);
          navigate("/");
        });
    },
  });

  const getInputClassName = (name) => {
    return formik.touched[name] && formik.errors[name] ? " error-border" : "";
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Имя</label>
        <input
          type="text"
          id="name"
          className={`${getInputClassName("name")} form-input`}
          placeholder="Введите имя"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="phone">Номер телефона</label>
        <input
          type="tel"
          id="phone"
          className={`${getInputClassName("phone")} form-input`}
          placeholder="7 999 999 99 99"
          {...formik.getFieldProps("phone")}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="error">{formik.errors.phone}</div>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          className={`${getInputClassName("password")} form-input`}
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="confirm_password">Подтверждения пароля</label>
        <input
          type="password"
          id="confirm_password"
          className={`${getInputClassName("confirmPassword")} form-input`}
          {...formik.getFieldProps("confirmPassword")}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="error">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <button type="submit" className="btn">
        Создать аккаунт
      </button>
    </form>
  );
};

export default Register;
