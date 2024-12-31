import { string, number, date } from "yup";

export const battleFormValidationSchema = {
  battleType: string().matches(/40k|fantasy/, "Value should be 40k or fantasy"),
  pointSize: number().positive("Points should be a positive value").optional(),
  scenario: string().length(254, "Maximum character length is 254").optional(),
  date: date().required("Enter a date for the battle"),
  table: string().matches(
    /Table 0 | Table 1 | Table 2/,
    "Select from Table 0, 1, or 2"
  ),
  start: string().required("Enter a start date for the battle"),
  finish: string().optional(),
};
