const { isValidUsername } = require("../isValidUsername");

describe("isValidUsername", () => {
  it("should return true for valid usernames", () => {
    expect(isValidUsername("valid_username").result).toBe(true);
    expect(isValidUsername("user_123").result).toBe(true);
    expect(isValidUsername("dot.dot").result).toBe(true);
    expect(isValidUsername("do.t.dot").result).toBe(true);
    expect(isValidUsername("us_ername").result).toBe(true);
    expect(isValidUsername("username_").result).toBe(true);
    expect(isValidUsername("username7_").result).toBe(true);
    expect(isValidUsername("us_er_name").result).toBe(true);
  });

  it("should return false for invalid usernames", () => {
    expect(isValidUsername("__username").result).toBe(false);
    expect(isValidUsername("s").result).toBe(false);
    expect(
      isValidUsername("areallylongusernamethatshouldnotbeallowedtoregistertodb")
        .result
    ).toBe(false);
    expect(isValidUsername("_us__ername").result).toBe(false);
    expect(isValidUsername("invalid username").result).toBe(false);
    expect(isValidUsername("invalid__username").result).toBe(false);
    expect(isValidUsername("invalid..username").result).toBe(false);
    expect(isValidUsername(".invalid..username_").result).toBe(false);
    expect(isValidUsername("invalidusername.").result).toBe(false);
    expect(isValidUsername("user@name").result).toBe(false);
    expect(isValidUsername("!username").result).toBe(false);
    expect(isValidUsername(".underscore").result).toBe(false);
    expect(isValidUsername("use2rname.").result).toBe(false);
    expect(isValidUsername("_username_").result).toBe(false);
    expect(isValidUsername("..double..dot").result).toBe(false);
  });
});
