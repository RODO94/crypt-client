import { Input } from "../../utils/Interfaces";
import "./InputBox.scss";

export default function InputBox({ name, label, type, required }: Input) {
  let requiredBool = false;

  required === true ? (requiredBool = true) : false;
  return (
    <div className="field">
      <label htmlFor={name} className="field__label">
        {label}
      </label>
      <input
        placeholder={label}
        type={type}
        id={name}
        name={name}
        className="field__input"
        required={requiredBool}
      />
    </div>
  );
}
