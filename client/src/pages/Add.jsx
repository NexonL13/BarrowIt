import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  const {handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue} = useFormik({
    initialValues: {
      image: "",
      name: "",
      description: "",
      stock: "",
      category: "",
      isAvailable: "0",
    },

    validationSchema: Yup.object({
      image: Yup.mixed().required(),
      name: Yup.string().max(20).required(),
      description: Yup.string().max(225).required(),
      stock: Yup.number().min(1).max(10000).required(),
      category: Yup.string()
        .required("Select an option")
        .notOneOf(["default"], "Select an option"),
      isAvailable: Yup.number().nullable(true),
    }),
    //Submit Form
    onSubmit: async (values) => {
      const formData = new FormData()
      for(let value in values) {
        formData.append(value, values[value])
      }
      const res = await axios.post("http://localhost:3000/equipment", formData)
      navigate('/')
    },
  });

  const categoryOption = [
    { id: 0, label: "Select Category", value: "default" },
    { id: 1, label: "Item", value: "item" },
    { id: 2, label: "Vehicle", value: "vehicle" },
    { id: 3, label: "Utility", value: "utility" },
    { id: 4, label: "Gadgets", value: "gadgets" },
    { id: 5, label: "Others", value: "others" },
  ];

  return (
    <div className="h-screen w-auto">
      <main className="flex items-center justify-center">
        
        <form
          onSubmit={handleSubmit}
          className="bg-grey-100 flex items-center justify-center"
          encType="multipart/form-data"
        >
          <div className="flex-1 text-gray-700 p-20">
            <h1 className="text-3xl pb-3 font-latoBold">Add New Equipment</h1>
            <p className="text-lg text-gray-500">Barangay's Public Equipment</p>
            {/* Upload Image */}
            <div className="mt-6">
              <div className="pb-4">
                <label
                  className="pb-2 font-latoBold text-sm block"
                  htmlFor="name"
                >
                  Upload Image
                </label>
                {touched.image && errors.image && (
                  <p className="text-red-500 text-latoBold text-sm capitalize">
                    *{errors.image}
                  </p>
                )}
                <div className="flex align-middle justify-center">
                  <input
                    type="file"
                    id="file-upload"
                    name="image"
                    className="file-input file-input-bordered file-input-accent w-full"
                    accept="image/*"
                    onChange={e => setFieldValue("image",e.currentTarget.files[0])}
                  />
                </div>
              </div>
            </div>
            {/* Equipment Name */}
            <div className="mt-1">
              <div className="pb-4">
                <label
                  className="pb-2 font-latoBold text-sm block"
                  htmlFor="name"
                >
                  Equipment Name
                </label>
                {touched.name && errors.name && (
                  <p className="text-red-500 text-latoBold text-sm capitalize">
                    *{errors.name}
                  </p>
                )}
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-600"
                  type="text"
                  name="name"
                  placeholder="Enter equipment name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {/* Description */}
            <div className="mt-6">
              <div className="pb-4">
                <label
                  className="pb-2 font-latoBold text-sm block"
                  htmlFor="description"
                >
                  Description
                </label>
                {touched.description && errors.description && (
                  <p className="text-red-500 text-latoBold text-sm capitalize">
                    *{errors.description}
                  </p>
                )}
                <textarea
                  className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-600"
                  name="description"
                  rows="3"
                  cols="50"
                  placeholder="Description here..."
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
              </div>
            </div>
            {/* Stocks */}
            <div className="mt-6">
              <div className="pb-4">
                <label
                  className="pb-2 font-latoBold text-sm block"
                  htmlFor="stock"
                >
                  Stock
                </label>
                {touched.stock && errors.stock && (
                  <p className="text-red-500 text-latoBold text-sm capitalize">
                    *{errors.stock}
                  </p>
                )}
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-600"
                  type="text"
                  name="stock"
                  placeholder="Enter quantity"
                  value={values.stock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {/* Category */}
            <div className="mt-6">
              <div className="pb-4">
                <label
                  className="pb-2 font-latoBold text-sm block"
                  htmlFor="category"
                >
                  Category
                </label>
                {touched.category && errors.category && (
                  <p className="text-red-500 text-latoBold text-sm capitalize">
                    *{errors.category}
                  </p>
                )}
                <select
                  className="bg-white border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-600"
                  name="category"
                  placeholder="Select Category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {categoryOption.map((category) => (
                    <option value={category.value} key={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Terms of Services */}
            <div>
              <label
                className="pb-2 font-latoBold text-sm block"
                htmlFor="isAvailable"
              >
                Status (Uncheck When Out of Stock)
              </label>
              <div className="flex item-center gap-2">
                <input
                  className="h-5 w-5 accent-teal-600"
                  type="checkbox"
                  name="isAvailable"
                  value={1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="text-sm font-latoBold text-grey-500">Available</p>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Add;
