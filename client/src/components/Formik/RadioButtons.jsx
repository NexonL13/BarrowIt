import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const RadioButtons = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <>
      <label htmlFor={name} className="block">{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <div className="pe-5 inline-flex space-x-5 items-center">
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value == option.value}
                  className="radio"
                />
                <label htmlFor={option.value}>{option.key}</label>
                </div>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </>
  );
};

export default RadioButtons;
