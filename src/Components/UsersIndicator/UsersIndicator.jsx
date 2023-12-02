import { FaWifi } from "react-icons/fa";
import PropTypes from "prop-types";
import "./users-indicator.css";

function UsersIndicator({ isAdmin }) {
  return (
    <div className="indicator-container">
      {isAdmin && (
        <div className="user-indicator">
          <FaWifi size={25} className="connected-icon" />
          <p>Admin Connected</p>
        </div>
      )}
      {!isAdmin && (
        <div className="user-indicator">
          <FaWifi size={25} className="connected-icon" />
          <p>User Connected</p>
        </div>
      )}
    </div>
  );
}

UsersIndicator.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
export default UsersIndicator;
