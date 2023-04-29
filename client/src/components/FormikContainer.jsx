import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import TextError from "./TextError";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        <Form>
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
                />
              );
            }}
          </Field>
          <ErrorMessage name="image" component={TextError} />
          <FormikControl
            control="input"
            type="text"
            label="Name"
            name="name"
            placeholder="Placeholder"
          />
          <FormikControl
            control="textarea"
            type="text"
            label="Description"
            name="description"
            placeholder="Placeholder"
          />
          <FormikControl
            control="input"
            type="text"
            label="Stock"
            name="stock"
            placeholder="Placeholder"
          />
          <FormikControl
            control="select"
            label="Category"
            name="category"
            options={dropdownOptions}
          />
          <FormikControl
            control="radio"
            label="Status"
            name="status"
            options={radioOptions}
          />
          {/* <div id="my-radio-group">Status</div>
          <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" id="avail" name="status" value="1" />
              Available
            </label>
            <label>
              <Field type="radio" id="out" name="status" value="0" />
              Out of Stock
            </label>
          </div> */}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
