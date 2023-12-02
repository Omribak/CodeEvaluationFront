import { useNavigate } from "react-router-dom";
import "./code-block-card.css";
import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";
import { startCode } from "../../constants/strings/HomePage";

function CodeBlockCard({ block }) {
  const navigate = useNavigate();

  const goToBlockPage = () => {
    navigate(`/code-blocks/${block._id}`);
  };

  return (
    <div className="code-block-card-container">
      <img src="js-logo.png" className="card-image" />
      <h2 className="card-title">{block.title}</h2>
      <button className="card-start-btn" onClick={goToBlockPage}>
        <p>{startCode}</p>
        <FaArrowRight size={23} className="card-arrow-btn" />
      </button>
    </div>
  );
}
CodeBlockCard.propTypes = {
  block: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
export default CodeBlockCard;
