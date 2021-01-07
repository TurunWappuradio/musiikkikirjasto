import './button.scss';

const Button = ({ children, ...props }) => (
  <button className="Button" {...props}>
    {children}
  </button>
);

export default Button;