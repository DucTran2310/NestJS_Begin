export function baseResponse(
  data: any,
  message = 'Thành công',
  statusCode = 200,
  success = true,
) {
  return {
    statusCode,
    success,
    message,
    data,
  };
}