import "./Game.scss";
import { FunctionComponent } from "react";
import FileUpload from "../../components/fileUpload/FileUpload";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import { Button } from "@mui/material";

interface GameProps {}

const Game: FunctionComponent<GameProps> = () => {
  // schema
  const signIn = z.object({
    employee_details: z
      .instanceof(File, { message: "Please upload a valid file" })
      .refine(
        (file) =>
          [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ].includes(file.type),
        { message: "Invalid document file type" }
      ),
    previous_year_ssa: z
      .instanceof(File, { message: "Please upload a valid file" })
      .refine(
        (file) =>
          [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ].includes(file.type),
        { message: "Invalid document file type" }
      ),
  });

  // form
  const methods = useForm<any>({
    resolver: zodResolver(signIn),
  });

  // form submit
  const onSubmit: SubmitHandler<any> = (val) => {
    console.log(val);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="game-container"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <DevTool control={methods.control} />

        <FileUpload name="employee_details" label="Employee Details" />
        <FileUpload name="previous_year_ssa" label="Previous Year Data" />

        <Button
          sx={{ height: "fit-content" }}
          type="submit"
          variant="contained"
        >
          Match
        </Button>
      </form>
    </FormProvider>
  );
};

export default Game;
