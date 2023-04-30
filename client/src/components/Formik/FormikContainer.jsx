import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import TextError from "./TextError";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";

const FormikContainer = () => {
  const navigate = useNavigate();
  const dropdownOptions = [
    { key: "Select an option", value: "" },
    { key: "Item", value: "item" },
    { key: "Vehicle", value: "vehicle" },
    { key: "Utility", value: "utility" },
    { key: "Gadgets", value: "gadgets" },
    { key: "Others", value: "others" },
  ];

  const radioOptions = [
    { key: "Out of Stock", value: 0 },
    { key: "Available", value: 1 },
  ];
  const initialValues = {
    image: "",
    name: "",
    description: "",
    stock: "",
    category: "",
    status: "",
  };
  const validationSchema = Yup.object({
    image: Yup.mixed().required(),
    name: Yup.string().max(20).required(),
    description: Yup.string().max(225).required(),
    stock: Yup.number().min(1).max(10000).required(),
    category: Yup.string()
      .required("Select an option")
      .notOneOf(["default"], "Select an option"),
    status: Yup.number().required(),
  });
  const onSubmit = async (values) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    await axios.post("http://localhost:3000/equipment", formData);
    navigate("/");
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
            <div className="flex space-x-72">
              <h1 className="text-3xl font-semibold">Add the equipment</h1>
              <button type="button" onClick={() => navigate("/")}>
                <IoIosArrowBack className="text-3xl" />
              </button>
            </div>
            <div>
              <label className="block">Image Upload</label>
              <Field name="image">
                {(props) => {
                  const { field } = props;
                  return (
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={(e) =>
                        formik.setFieldValue("image", e.target.files[0])
                      }
                      className="w-full rounded file-input file-input-bordered"
                    />
                  );
                }}
              </Field>
              <ErrorMessage name="image" component={TextError} />
            </div>
            <FormikControl
              control="input"
              type="text"
              label="Name"
              name="name"
              placeholder="Equipment Name"
              className="block w-full px-4 py-2 border-gray-400 rounded input input-bordered focus:outline-none focus:border-teal-500"
            />
            <FormikControl
              control="textarea"
              type="text"
              label="Description"
              name="description"
              placeholder="Description..."
              className="block w-full px-4 py-2 border-gray-400 rounded input input-bordered focus:outline-none focus:border-teal-500"
            />
            <div className="flex space-x-4">
              <div className="w-1/2">
                <FormikControl
                  control="input"
                  type="number"
                  label="Stocks"
                  name="stock"
                  placeholder="Stock(s)"
                  className="block w-full px-4 py-2 border-gray-400 rounded input input-bordered focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="w-1/2">
                <FormikControl
                  control="select"
                  label="Category"
                  name="category"
                  options={dropdownOptions}
                  className="block w-full px-4 py-2 border-gray-400 rounded input input-bordered focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
            <FormikControl
              control="radio"
              label="Status"
              name="status"
              options={radioOptions}
            />
            <button
              type="submit"
              className="flex items-center w-full mx-auto btn"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
