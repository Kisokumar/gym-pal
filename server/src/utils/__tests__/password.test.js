const { isValidPassword } = require("../isValidPassword");

describe("isValidPassword", () => {
  it("should return null for valid password errors", () => {
    expect(isValidPassword("V3RyGooDPassWorD!")).toBeNull();
    expect(isValidPassword("Another1!")).toBeNull();
    expect(isValidPassword("SecurePW12@")).toBeNull();
    expect(isValidPassword("1234!qwe")).toBeNull();
    expect(isValidPassword("Complex@123")).toBeNull();
    expect(isValidPassword("SasdecurePW12@")).toBeNull();
  });

  it("should return false for invalid passwords", () => {
    expect(isValidPassword("badPassword").errors).not.toBeNull();
    expect(isValidPassword("short!").errors).not.toBeNull();
    expect(isValidPassword("noSpecialChars123").errors).not.toBeNull();
    expect(isValidPassword("OnlyLettersNoDigits!").errors).not.toBeNull();
    expect(isValidPassword("OnlyDigits12345").errors).not.toBeNull();
  });
});
