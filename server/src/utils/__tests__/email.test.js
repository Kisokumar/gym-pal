const { isValidEmail } = require("../isValidEmail");

describe("isValidEmail", () => {
  it("should return true for valid email addresses", () => {
    expect(isValidEmail("email@gmail.com")).toBe(true);
    expect(isValidEmail("user123@example.co.uk")).toBe(true);
    expect(isValidEmail("first.last@example.com")).toBe(true);
  });

  it("should return false for invalid email addresses", () => {
    expect(isValidEmail("invalidEmail")).toBe(false);
    expect(isValidEmail("user@domain")).toBe(false);
    expect(isValidEmail("missing@domain.")).toBe(false);
  });
});
