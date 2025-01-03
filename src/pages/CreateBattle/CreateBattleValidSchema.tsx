import * as Yup from "yup";
const { string, number, date } = Yup;

export const battleFormValidationSchema = Yup.object().shape({
  battleType: string().matches(/40k|fantasy/, "Value should be 40k or fantasy"),
  pointSize: number()
    .required("Enter a point size")
    .positive("Points should be a positive value"),
  scenario: string().optional(),
  date: date().required("Enter a date for the battle"),
  table: string()
    .optional()
    .matches(/Table 1|Table 2|Table 3/, "Select from Table 1, 2, or 3"),

  start: string().required("Enter a start date for the battle"),
  finish: string().optional(),
  playerOne: Yup.array().min(1, "Add an army for player one"),
  playerTwo: Yup.array().min(1, "Add an army for player two"),
});
