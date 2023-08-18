import { Box, Button, Link, useColorMode } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { FiExternalLink } from "react-icons/fi";
import InputField from "../components/InputField";
import React from "react";
import { Text } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";

export default function Login() {
  const [_result, login] = useLoginMutation();
  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <Box mt="23vh" justifyContent="center" alignItems="center">
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
              <Box mt={2} display="flex">
                <Button type="submit" isLoading={isSubmitting} flex={1}>
                  Log In
                </Button>
              </Box>
              <Box mt={2} display="flex">
                <Text>
                  Don't have an account?{" "}
                  <Link
                    color={colorMode === "dark" ? "blue.400" : "blue.600"}
                    href="/signup"
                  >
                    Sign up
                  </Link>
                </Text>
              </Box>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Box>
  );
}
