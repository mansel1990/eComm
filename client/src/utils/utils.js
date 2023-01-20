import IconButton from "@mui/material/IconButton";
import Done from "@mui/icons-material/Done";
import Close from "@mui/icons-material/Close";

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

export const trueFalseFormatter = (val, row) => {
  if (val === null) {
    return (
      <div className="sameline-cls">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => doneHandler(val, row)}
        >
          <Done />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => rejectHandler(val, row)}
        >
          <Close />
        </IconButton>
      </div>
    );
  }
  if (val) {
    return (
      <div className="center-div-hor">
        <i className="fas fa-check" style={{ color: "green" }}></i>
      </div>
    );
  }
  return <i className="fas fa-times" style={{ color: "red" }}></i>;
};

const doneHandler = (val, row) => {
  console.log("Done clicked");
};

const rejectHandler = (val, row) => {
  console.log("Reject clicked", val, row);
};
