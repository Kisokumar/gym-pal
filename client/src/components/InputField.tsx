import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";

import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  placeholder?: string;
};

export default function InputField({
  label,
  placeholder,
  size: _,
  ...props
}: InputFieldProps) {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      {/* <FormLabel htmlFor={field.name}>{label}</FormLabel> */}
      <Input
        {...props}
        {...field}
        id={field.name}
        placeholder={placeholder || label}
      />
      {meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
}
