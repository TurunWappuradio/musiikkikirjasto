import './button.scss';

const Button = ({ children, ...props }) => (
  <button {...props} className={`Button ${props.className}`}>
    {children}
  </button>
);

export default Button;
