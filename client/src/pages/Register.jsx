import React from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import axios from "axios";

const Register = () => {
  const initialValues = {
    email: "",
    password: "",
    passwordConfirmation: ""
  };
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(20).required(),
    passwordConfirmation: Yup.mixed().oneOf([Yup.ref('password'), null], "Password must match"),
  });
  const onSubmit = async (values) => {
    const filteredValues = {
        email: values.email,
        password: values.password
    } 
    await axios.post("http://localhost:3000/auth", filteredValues)
    console.log("Registered")
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {(formik) => (
        <Form className="flex items-center justify-center h-screen">
          <div className="p-20 bg-gray-100">
            <div className="flex flex-col">
                <h1 className="text-3xl font-semibold text-teal-500">Register</h1>
                <p className="pb-4 text-sm text-gray-500">BarrowIT Admin</p>
            </div>
            <div>
              <FormikControl
                control="input"
                type="text"
                label="Email"
                name="email"
                placeholder="Enter an email"
                className="block w-full px-4 py-2 border-gray-400 rounded input input-bordered focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="password"
                label="Password"
                name="password"
                placeholder="Enter a password"
                className="block w-full px-4 py-2 border-gray-400 rounded input input-bordered focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="password"
                label="Password Confirmation"
                name="passwordConfirmation"
                placeholder="Comfirm password"
                className="block w-full px-4 py-2 border-gray-400 rounded input input-bordered focus:outline-none focus:border-teal-500"
              />
            </div>
            <button type="submit" className="flex items-center w-full py-4 mx-auto mt-4 btn">Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
