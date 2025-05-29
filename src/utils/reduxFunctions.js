export function createErrorObject(error) {
  if (error && error.response) {
    return {
      statusText: error.response.statusText,
      status: error.response.status,
      message:
        error.response.data?.message || error.response.data?.error?.message,
    };
  }
  return {
    message: error.message,
  };
}
