import './InputStyle.scss';

const Input = ({ children, ...props }) => {
  return (
    <div className="Input">
      {children}
      <input type="text" {...props} />
    </div>
  );
};

export default Input;
