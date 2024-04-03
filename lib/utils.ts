export const parseErrorObject = (error: any) => {
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.errors) {
        if (error.response.data.errors[0].message) {
          return error.response.data.errors[0].message;
        }
      } else if (error.response.data.message) {
        return error.response.data.message;
      }
    }
  } else if (error.message) {
    return error.message;
  }
  return "";
};
