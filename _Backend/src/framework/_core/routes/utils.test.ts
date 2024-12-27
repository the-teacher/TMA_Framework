import { parseControllerString } from "./utils";
import path from "path";
import { buildControllerPath, loadController } from "./utils";
import { setRouterCotrollersPath } from "./routerCore";

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

describe("buildControllerPath", () => {
  beforeEach(() => {
    setRouterCotrollersPath(path.join(__dirname, "."));
  });

  test("should build correct controller path", () => {
    const controllerName = "test";
    const expectedPath = path.join(__dirname, ".", "testController");

    const result = buildControllerPath(controllerName);
    expect(result).toBe(expectedPath);
  });
});

describe("loadController", () => {
  beforeEach(() => {
    setRouterCotrollersPath(path.join(__dirname, "."));
  });

  test("should load existing controller action", () => {
    const controllerName = "test";
    const action = "indexAction";

    const controller = loadController(controllerName, action);
    expect(typeof controller).toBe("function");
  });

  test("should throw error when action doesn't exist", () => {
    const controllerName = "test";
    const action = "nonExistentAction";

    expect(() => {
      loadController(controllerName, action);
    }).toThrow(`Action ${action} not found in controller ${controllerName}`);
  });

  test("should throw error when controller doesn't exist", () => {
    const controllerName = "nonExistent";
    const action = "indexAction";

    expect(() => {
      loadController(controllerName, action);
    }).toThrow(/Cannot find module/);
  });
});
