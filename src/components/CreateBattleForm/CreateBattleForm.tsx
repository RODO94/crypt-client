import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import "./CreateBattleForm.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormikProps } from "formik";
import { BattleInformation } from "../../pages/CreateBattle/CreateBattle";

export default function CreateBattleForm({ formik }:{formik: FormikProps<BattleInformation>}) {
  return (
    <section>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="create-battle__form-section">
          <div className="create-battle__battletype">
            <div id="battletype" className="create-battle__select-wrap">
              <label htmlFor="battletype" className="create-battle__label">
                {" "}
                Battle Type*
              </label>
              <select
                name="battletype"
                onChange={(event) => {
                  formik.setFieldValue("battleType", event.target.value);
                }}
                className="create-battle__select"
              >
                <option hidden value={formik.values.battleType}>
                  {formik.values.battleType}
                </option>
                <option
                  hidden={formik.values.battleType === "fantasy"}
                  value="fantasy"
                >
                  Fantasy
                </option>
                <option hidden={formik.values.battleType === "40k"} value="40k">
                  40k
                </option>
              </select>
            </div>
          </div>
          <div className="create-battle__pointsize">
            <label htmlFor="pointsize" className="create-battle__label">
              Point Size*
              <input
                type="number"
                className={
                  pointSizeError
                    ? "create-battle__input create-battle__input--error"
                    : "create-battle__input"
                }
                name="pointsize"
                value={formik.values.pointSize}
                onChange={(event) => {
                  formik.setFieldValue("pointSize", event.target.value);
                }}
              />
              <p
                className={
                  pointSizeError
                    ? "create-battle__error"
                    : "create-battle__error--hide"
                }
              >
                Please add a point size
              </p>
            </label>
          </div>
          <div className="create-battle__scenario">
            <label htmlFor="scenario" className="create-battle__label">
              Scenario
              <input
                type="text"
                className="create-battle__input"
                name="scenario"
                value={formik.values.scenario}
                onChange={(event) => {
                  formik.setFieldValue("scenario", event.target.value);
                }}
              />
            </label>
          </div>
          <div className="create-battle__date">
            <label
              htmlFor="date"
              className="create-battle__label create-battle__label--date"
            >
              Date*
              <DatePicker
                name="date"
                value={formik.values.date}
                format="DD-MM-YYYY"
                onChange={(value) => {
                  value && formik.setFieldValue("date", value);
                }}
              />
            </label>
            <label
              htmlFor="date"
              className="create-battle__label create-battle__label--date"
            >
              Table
              <select
                value={table}
                name="table"
                className="create-battle__select"
                onChange={(event) => {
                  setTable(event.target.value);
                }}
              >
                <option hidden>{table}</option>
                <option value="Table 1">Table 1</option>
                <option value="Table 2">Table 2</option>
                <option value="Table 3">Table 3</option>
              </select>
            </label>
            <label
              htmlFor="start"
              className="create-battle__label create-battle__label--date"
            >
              Start
              <MobileTimePicker
                name="start
                "
                ampm={false}
                value={start}
                onChange={(newValue: any) => {
                  setStart(newValue);
                }}
              />
            </label>
            <label
              htmlFor="finish"
              className="create-battle__label create-battle__label--date"
            >
              Finish
              <MobileTimePicker
                name="finish"
                ampm={false}
                value={finish}
                minTime={start}
                onChange={(newValue: any) => {
                  setFinish(newValue);
                }}
              />
            </label>
          </div>
        </div>
      </LocalizationProvider>
    </section>
  );
}
