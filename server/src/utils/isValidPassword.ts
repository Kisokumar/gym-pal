export function isValidPassword(password: string) {
  if (password.length < 6) {
    return {
      errors: [
        {
          field: "password",
          message: "Password must be at least 6 characters long.",
        },
      ],
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      errors: [
        {
          field: "password",
          message: "Password must contain at least one number.",
        },
      ],
    };
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return {
      errors: [
        {
          field: "password",
          message: "Password must contain at least one special character.",
        },
      ],
    };
  }

  return null;
}
