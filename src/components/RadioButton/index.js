import './RadioButton.scss';

const RadioButton = ({ name, text, value, checked }) => (
  <label className="RadioButton">
    {text}
    <span className="RadioButton-checkmark">
      {checked && <span className="RadioButton-checked" />}
    </span>
    <input type="radio" name={name} value={value} checked={checked} />
  </label>
);

export default RadioButton;
