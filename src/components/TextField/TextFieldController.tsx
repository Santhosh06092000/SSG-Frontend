import { TextField, TextFieldProps } from "@mui/material";
import { FunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";

const TextFieldController: FunctionComponent<TextFieldProps> = (props) => {
  const { name, ...rest } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <TextField
            {...rest}
            {...field}
            error={!!errors[name!]}
            helperText={errors[name!] ? String(errors[name!]?.message) : ""}
            size="small"
          />
        )}
      />
    </>
  );
};

export default TextFieldController;
