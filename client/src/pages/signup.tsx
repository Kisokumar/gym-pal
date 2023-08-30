import { Box, Button, Checkbox, useColorMode } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  useRegisterMutation,
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

function SignUp() {
  const [, register] = useRegisterMutation();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [{ error: serverError }] = useServerConnectionQuery();

  if (serverError) {
    return <NotConnected pageProps={undefined} />;
  }

  return (
    <CentrePageWrapper>
      <>
        <Head>
          <title>Sign up • GymPal</title>
          <meta
            content="GymPal - Your Ultimate Fitness Tracking Companion. Achieve your fitness goals with GymPal, the all-in-one platform to track and visualize your gym progress. Connect with friends, view their profiles, and compare workout statistics."
            name="description"
          />
        </Head>
        <Wrapper variant="small">
          <Formik
            initialValues={{
              email: "",
              password: "",
              privateAccount: false,
              username: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                options: values,
              });
              const errors = response.data?.register.errors;
              const user = response.data?.register.user;
              if (errors) {
                setErrors(toErrorMap(errors));
              } else if (user) {
                await router.push("/");
              }
            }}
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form>
                <InputField label="Email" name="email" type="email" />
                <Box mt={4}>
                  <InputField label="Username" name="username" />
                </Box>
                <Box mt={4}>
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                  />
                </Box>
                <Box display="flex" flexDirection="column" gap={2} mt={4}>
                  <Checkbox
                    checked={values.privateAccount}
                    defaultChecked={false}
                    name="privateAccount"
                    onChange={(e) => {
                      setFieldValue("privateAccount", e.target.checked);
                    }}
                  >
                    Private Account
                  </Checkbox>
                  <Button
                    isDisabled={!values.password || !values.username}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                  <Box display="flex" gap={1}>
                    <Text>Already have an account? </Text>
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      color={colorMode === "dark" ? "blue.400" : "blue.600"}
                    >
                      <Link
                        color={colorMode === "dark" ? "blue.400" : "blue.600"}
                        href="/login"
                      >
                        Log in
                      </Link>
                    </Text>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </>
    </CentrePageWrapper>
  );
}

export default withUrqlClient(createUrqlClient)(SignUp);
