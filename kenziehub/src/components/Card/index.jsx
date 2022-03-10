import "./style.css";
const Card = ({ key, children, className, onClick }) => {
  return (
    <div onClick={onClick} className={className} key={key}>
      {children}
    </div>
  );
};

export default Card;
