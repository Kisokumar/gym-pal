import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";

import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export default function InputField({
  label,
  size: _,
  ...props
}: InputFieldProps) {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...props} {...field} id={field.name} placeholder={label} />
      {meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
}
