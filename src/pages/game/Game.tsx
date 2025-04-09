import "./Game.scss";
import { FunctionComponent } from "react";
import FileUpload from "../../components/fileUpload/FileUpload";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@mui/material";
import { game } from "./IGame";
import { useMutation } from "@tanstack/react-query";
import { generateGame } from "../../api/game";
import AcUnitIcon from "@mui/icons-material/AcUnit";

interface GameProps {}

const Game: FunctionComponent<GameProps> = () => {
  // generate game
  const generateGameMutation = useMutation({
    mutationFn: generateGame,
    onSuccess: (response) => {
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      console.log("Download URL:", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "SSG.xlsx";
      a.click();

      window.URL.revokeObjectURL(url);
    },
    onError: () => {
      alert("Error generating game. Please try again with valid File.");
    },
  });

  // schema
  const signIn = z.object({
    employee_details: z
      .instanceof(File, { message: "Please upload a valid file" })
      .refine(
        (file) =>
          [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
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
            "text/csv",
          ].includes(file.type),
        { message: "Invalid document file type" }
      )
      .optional(),
  });

  // form
  const methods = useForm<game>({
    resolver: zodResolver(signIn),
  });

  // form submit
  const onSubmit: SubmitHandler<game> = (val) => {
    const formData = new FormData();
    for (const key in val) {
      if (val[key as keyof game]) {
        formData.append(key, val[key as keyof game] as File);
      }
    }
    generateGameMutation.mutate(formData);
    console.log(val);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="game-container"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FileUpload name="employee_details" label="Employee Details" />
        <FileUpload name="previous_year_ssa" label="Previous Year Data" />

        <Button
          sx={{ height: "fit-content", bgcolor: "#D3AF37" }}
          type="submit"
          variant="contained"
          disabled={generateGameMutation.isPending}
        >
          {generateGameMutation.isPending ? (
            <AcUnitIcon className="rotate-anim" />
          ) : (
            "Generate"
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default Game;
