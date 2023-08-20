import { Box, Button, Checkbox, useColorMode } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import Head from "next/head";
import InputField from "../components/Reusable/InputField";
import Link from "next/link";
import React from "react";
import { Text } from "@chakra-ui/react";
import Wrapper from "../components/Reusable/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

function SignUp() {
  const [, register] = useRegisterMutation();
  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <Box mt="23vh" justifyContent="center" alignItems="center">
      <Head>
        <title>Sign up • GymPal</title>
        <meta
          name="description"
          content="GymPal - Your Ultimate Fitness Tracking Companion. Achieve your fitness goals with GymPal, the all-in-one platform to track and visualize your gym progress. Connect with friends, view their profiles, and compare workout statistics."
        />
      </Head>
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "", privateAccount: true }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              options: values,
            });
            const errors = response.data?.register.errors;
            const user = response.data?.register.user;
            if (errors) {
              setErrors(toErrorMap(errors));
            } else if (user) {
              router.push("/");
            }
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <InputField name="username" label="Username" />
              <Box mt={4}>
                <InputField type="password" name="password" label="Password" />
              </Box>
              <Box gap={2} mt={4} flexDirection="column" display="flex">
                <Checkbox
                  name="privateAccount"
                  defaultChecked={true}
                  checked={values.privateAccount}
                  onChange={(e) => {
                    setFieldValue("privateAccount", e.target.checked);
                  }}
                >
                  Private Account
                </Checkbox>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={!values.password || !values.username}
                >
                  Sign Up
                </Button>
                <Box display="flex" gap={1}>
                  <Text>Already have an account? </Text>
                  <Text
                    color={colorMode === "dark" ? "blue.400" : "blue.600"}
                    _hover={{ textDecoration: "underline" }}
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
    </Box>
  );
}

export default withUrqlClient(createUrqlClient)(SignUp);
