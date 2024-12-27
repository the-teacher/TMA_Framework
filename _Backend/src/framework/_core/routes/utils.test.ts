import { parseControllerString } from "./utils";

describe("parseControllerString", () => {
  test("should correctly parse a valid controller action string", () => {
    const input = "user#create";
    const expected = { controller: "user", action: "create" };
    const result = parseControllerString(input);

    expect(result).toEqual(expected);
  });

  test("should throw an error for an invalid format (missing action)", () => {
    const input = "user#";

    expect(() => {
      parseControllerString(input);
    }).toThrow(
      "Invalid format for controller action: user#. Expected format is 'controller#action'."
    );
  });

  test("should throw an error for an invalid format (missing controller)", () => {
    const input = "#create";

    expect(() => {
      parseControllerString(input);
    }).toThrow(
      "Invalid format for controller action: #create. Expected format is 'controller#action'."
    );
  });

  test("should throw an error for an empty string", () => {
    const input = "";

    expect(() => {
      parseControllerString(input);
    }).toThrow(
      "Invalid format for controller action: . Expected format is 'controller#action'."
    );
  });

  test('should throw an error for a string without a "#" separator', () => {
    const input = "usercreate";

    expect(() => {
      parseControllerString(input);
    }).toThrow(
      "Invalid format for controller action: usercreate. Expected format is 'controller#action'."
    );
  });
});
