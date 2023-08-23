import { Box, Button, useColorMode } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  useLoginMutation,
  useServerConnectionQuery,
} from "@src/generated/graphql";

import CentrePageWrapper from "@src/components/Reusable/CentrePageWrapper";
import Head from "next/head";
import InputField from "@src/components/Reusable/InputField";
import Link from "next/link";
import NotConnected from "@src/components/StatePages/NotConnected";
import { Text } from "@chakra-ui/react";
import Wrapper from "@src/components/Reusable/Wrapper";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import { toErrorMap } from "@src/utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import React from "react";

function Login() {
  const [, login] = useLoginMutation();
  const [{ error: serverError }] = useServerConnectionQuery();
  const { colorMode } = useColorMode();
  const router = useRouter();

  if (serverError) {
    return <NotConnected pageProps={undefined} />;
  }

  return (
    <CentrePageWrapper>
      <>
        <Head>
          <title>Log In • Gympal</title>
          <meta
            content="GymPal - Your Ultimate Fitness Tracking Companion. Achieve your fitness goals with GymPal, the all-in-one platform to track and visualize your gym progress. Connect with friends, view their profiles, and compare workout statistics."
            name="description"
          />
        </Head>
        <Wrapper variant="small">
          <Formik
            initialValues={{ password: "", username: "" }}
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
                <InputField label="Username" name="username" />
                <Box mt={4}>
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                  />
                </Box>
                <Box display="flex" mt={4}>
                  <Button
                    flex={1}
                    isDisabled={!values.password || !values.username}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Log In
                  </Button>
                </Box>
                <Box display="flex" gap={1}>
                  <Text>Don't have an account?</Text>
                  <Text
                    _hover={{ textDecoration: "underline" }}
                    color={colorMode === "dark" ? "blue.400" : "blue.600"}
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
