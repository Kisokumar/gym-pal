import { FieldError } from "@src/generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[String(field)] = String(message);
  });
  return errorMap;
};
