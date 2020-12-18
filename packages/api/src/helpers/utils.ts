type ResponseObject = {
  message: string;
  error: boolean;
  data?: unknown;
};

export const responseOk = (data: Array<unknown>): ResponseObject => ({
  error: false,
  message: '',
  ...data,
});

export const responseError = (message: string): ResponseObject => ({
  error: true,
  message,
});
