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
          <p>Name</p>
          <Field type="text" name="name" />
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </label>
        <label>
          <p>Email</p>
          <Field type="email" name="email" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </label>
        <label>
          <p>Password</p>
          <Field type="password" name="password" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </label>
        <label>
          <p>Terms of Serivce</p>
          <Field type="checkbox" name="terms" />
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
    email: Yup.string().required("Enter Your Email"),
    password: Yup.string()
      .min(5, "Password is too Short")
      .required("Enter Your Password"),
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
