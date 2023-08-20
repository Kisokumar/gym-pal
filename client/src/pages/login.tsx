import { Box, Button, useColorMode } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import CentrePageWrapper from "../components/Reusable/CentrePageWrapper";
import Head from "next/head";
import InputField from "../components/Reusable/InputField";
import Link from "next/link";
import React from "react";
import { Text } from "@chakra-ui/react";
import Wrapper from "../components/Reusable/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

function Login() {
  const [, login] = useLoginMutation();
  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <CentrePageWrapper>
      <>
        <Head>
          <title>Log In • Gympal</title>
          <meta
            name="description"
            content="GymPal - Your Ultimate Fitness Tracking Companion. Achieve your fitness goals with GymPal, the all-in-one platform to track and visualize your gym progress. Connect with friends, view their profiles, and compare workout statistics."
          />
        </Head>
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
            {({ values, isSubmitting }) => (
              <Form>
                <InputField name="username" label="Username" />
                <Box mt={4}>
                  <InputField
                    type="password"
                    name="password"
                    label="Password"
                  />
                </Box>
                <Box mt={4} display="flex">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    flex={1}
                    isDisabled={!values.password || !values.username}
                  >
                    Log In
                  </Button>
                </Box>
                <Box display="flex" gap={1}>
                  <Text>Don't have an account?</Text>
                  <Text
                    color={colorMode === "dark" ? "blue.400" : "blue.600"}
                    _hover={{ textDecoration: "underline" }}
                  >
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
      </>
    </CentrePageWrapper>
  );
}
export default withUrqlClient(createUrqlClient)(Login);
