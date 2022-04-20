// validator for number fields
export const numberValidator = (newValue, row, column) => {
  if (isNaN(newValue)) {
    return {
      valid: false,
      message: "This field should be numeric",
    };
  }
  return true;
};
