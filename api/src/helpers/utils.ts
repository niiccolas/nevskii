export const responseOk = (data: any) => ({
  error: false,
  message: '',
  ...data,
});

export const responseError = (message: string) => ({
  error: true,
  message,
});
