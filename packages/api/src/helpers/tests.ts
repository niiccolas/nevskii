/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace jest {
    interface Expect {
      toBeNullOrType: (
        // received: string,
        dataType: 'string' | 'number' | 'boolean',
      ) => CustomMatcherResult;
      toBeWithinRange(a: number, b: number): boolean;
    }

    interface Matchers<R> {
      toBeWithinRange(a: number, b: number): R;
    }
  }
}

/**
 * Custom matcher for 'null' or a given data type
 */
expect.extend({
  toBeNullOrType(received: string, dataType: 'string' | 'number' | 'boolean') {
    const pass = typeof received === dataType || received === null;

    return pass
      ? {
          message: () => `expected ${received} is of type ${dataType} or null`,
          pass: true,
        }
      : {
          message: () =>
            `expected ${received} to be of type ${dataType} or null`,
          pass: false,
        };
  },
});

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

// No export so that the file can be imported only
export default undefined;
