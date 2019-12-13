import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import UserCard from "./UserCard";
import "./UserForm.css";

const UserForm = ({ values, errors, touched, status }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    status && setUser(user => [...user, status]);
  }, [status]);

  return (
    <div>
      <Form className="user-form">
        <label>
          Name
          <Field type="text" name="name" />
          {touched.name && errors.name && <p>{errors.name}</p>}
        </label>
        <label>
          Email
          <Field type="email" name="email" />
          {touched.email && errors.email && <p>{errors.email}</p>}
        </label>
        <label>
          Password
          <Field type="password" name="password" />
          {touched.password && errors.password && <p>{errors.password}</p>}
        </label>
        <label>
          <Field type="checkbox" name="terms" />
          Agree to Terms of Service
        </label>
        <button type="submit">Submit</button>
      </Form>
      <UserCard user={user} />
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      terms: props.terms || false,
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Enter Your Name"),
    email: Yup.string()
      .min(5, "Password is too Short")
      .required(),
    password: Yup.string().required("Enter a Password"),
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => {
        console.log(err);
      });
  },
})(UserForm);

export default FormikUserForm;
