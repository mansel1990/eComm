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

export const dateFormatter = (val, row) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = new Date(Date.parse(val));
  const res = date.toLocaleDateString("en-US", options);
  return res;
};
