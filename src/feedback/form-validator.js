const formValidator = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name Required";
  }

  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.comments) {
    errors.comments = "Comments Required";
  }

  if (!values.rating) {
    errors.rating = "Rating Required";
  }

  return errors;
};

export default formValidator;
