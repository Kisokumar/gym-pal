export function isValidUsername(username: string) {
  // min 2, max 30
  const lengthLimit = /^(.{0,1}|.{31,})$/;

  const special = /["!"#\$%&'\(\)\*\+,\-\/:;<=>\?@\[\]\^`{\|}~"]/;

  const consecutivePeriods = /\.{2,}/;
  const consecutiveUnderscores = /_{2,}/;

  // no underscore at beginning
  // no period at start or end
  // underscore at end allowed
  const beginEnd = /^_|^\.|\.$/;

  const whiteSpace = /\s/;

  if (lengthLimit.test(username)) {
    return {
      result: false,
      errors: [
        {
          field: "username",
          message: "Username must be between 2 and 30 characters",
        },
      ],
    };
  }

  if (special.test(username)) {
    return {
      result: false,
      errors: [
        {
          field: "username",
          message:
            "Username must not contain special characters except periods(.) and underscores(_).",
        },
      ],
    };
  }

  if (consecutivePeriods.test(username)) {
    return {
      result: false,
      errors: [
        {
          field: "username",
          message: "Username cannot have consecutive periods.",
        },
      ],
    };
  }

  if (beginEnd.test(username)) {
    return {
      result: false,
      errors: [
        {
          field: "username",
          message:
            "Username cannot start with period or underscore and cannot end with period.",
        },
      ],
    };
  }

  if (whiteSpace.test(username)) {
    return {
      result: false,
      errors: [
        {
          field: "username",
          message: "Username must not have any blank spaces.",
        },
      ],
    };
  }

  if (consecutiveUnderscores.test(username)) {
    return {
      result: false,
      errors: [
        {
          field: "username",
          message: "Username cannot have consecutive underscores.",
        },
      ],
    };
  }

  return {
    result: true,
    errors: [],
  };
}
