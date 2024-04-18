import {
  FieldName,
  RegisterDataProps,
} from "../InterfacesTypesEnums/RegisterTypes";

const validateForm = (dataForm: RegisterDataProps) => {
  const regularExpression = /^[a-zA-Z0-9]{6}$/;
  const errors: { field: FieldName; message: string }[] = [];

  if (!dataForm.username.trim()) {
    errors.push({ field: "username", message: "This field is required." });
  }

  if (!dataForm.password.trim().length) {
    errors.push({ field: "password", message: "This field is required." });
  } else if (
    dataForm.password.trim().length < 6 ||
    !regularExpression.test(dataForm.password.trim())
  ) {
    errors.push({
      field: "password",
      message:
        "Invalid password! Must be at least 6 symbols, only letters and numbers!",
    });
  }

  if (dataForm.repeat && !dataForm.repeat.trim()) {
    errors.push({ field: "repeat", message: "This field is required." });
  } else if (dataForm.repeat.trim() !== dataForm.password.trim()) {
    errors.push({ field: "repeat", message: "Passwords do not match" });
  }

  return errors;
};

export default validateForm;
