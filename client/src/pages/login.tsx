import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import InputField from "../components/InputField";
import React from "react";
import Wrapper from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";

export default function Login() {
  const [_result, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });
          const errors = response.data?.login.errors;
          const user = response.data?.login.user;
          if (errors) {
            setErrors(toErrorMap(errors));
          } else if (user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="Username" />
            <Box mt={4}>
              <InputField type="password" name="password" label="Password" />
            </Box>
            <Button mt={4} type="submit" isLoading={isSubmitting}>
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
