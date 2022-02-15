import s from "./Button.module.css";

interface ButtonProps {
  title: string;
  textColor: string;
  backgroundColor: string;
  action: Function;
}
const Button = ({title, textColor, backgroundColor, action}: ButtonProps) => {
  const handleButtonPress = () => {
    action();
  };

  return (
    <div
      className={s.container}
      style={{ color: textColor, backgroundColor: backgroundColor }}
      onClick={handleButtonPress}
    >
      <span>{title}</span>
    </div>
  );
};

export default Button;
