import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { DarkModeSwitch } from "../components/DarkModeSwitch";
import InputField from "../components/InputField";
import React from "react";
import Wrapper from "../components/Wrapper";
import { useMutation } from "urql";

interface RegisterProps {}

const REGISTER_MUT = `mutation Register($username: String!, $password: String!) {
  register(options: { username: $username, password: $password }) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
} `;

export default function Register(props: RegisterProps) {
  const [result, register] = useMutation(REGISTER_MUT);

  return (
    <Wrapper variant="small">
      <>
        <DarkModeSwitch />
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register(values);
            if (response.data?.register.errors) {
              setErrors({ username: "taken!", password: "incorrect" });
            }
            return response;
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="username" label="Username" />
              <Box mt={4}>
                <InputField type="password" name="password" label="Password" />
              </Box>
              <Button mt={4} type="submit" isLoading={isSubmitting}>
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </>
    </Wrapper>
  );
}
