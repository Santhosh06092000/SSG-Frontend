import { Button, FormHelperText } from "@mui/material";
import { FunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface FileUploadProps {
  name: string;
  label?: string;
  required?: boolean;
}

const FileUpload: FunctionComponent<FileUploadProps> = (props) => {
  const { name, required, label } = props;
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? "CSV file is required" : false,
          validate: {
            isCsv: (fileList) => {
              const file = fileList?.[0];
              return (
                file?.type === "text/csv" ||
                file?.name.endsWith(".csv") ||
                "Only CSV files are allowed"
              );
            },
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <input
              type="file"
              accept=".csv,.xlsx"
              hidden
              id={`csv-upload-${name}`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(file);
                }
              }}
            />
            <label htmlFor={`csv-upload-${name}`}>
              <Button
                variant="contained"
                component="span"
                endIcon={<UploadFileIcon />}
                color={error ? "error" : value ? "success" : "primary"}
              >
                {label}
              </Button>
            </label>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
            {!error && value && (
              <FormHelperText>{(value as File).name}</FormHelperText>
            )}
          </div>
        )}
      />
    </>
  );
};

export default FileUpload;
