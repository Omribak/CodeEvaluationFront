import { useState } from "react";
import { title, webInfo } from "../../constants/strings/HomePage";
import { FaCode } from "react-icons/fa";
import "./home.css";
import CodeBlocksContainer from "../../Components/CodeBlocksContainer";
import Footer from "../../Components/Footer/Footer";

function Home() {
  const [hoverLogo, setHoverLogo] = useState(false);

  const handleLogoHover = () => {
    setHoverLogo(!hoverLogo);
  };

  return (
    <div className="home-container">
      <div className="home-container__logo">
        <img
          src="/logo.png"
          className="web-logo"
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoHover}
        />
        {hoverLogo && (
          <div className="app-info-container">
            <p className="app-information">{webInfo}</p>
          </div>
        )}
      </div>
      <div className="main-section__header">
        <FaCode size={35} className="code-icon" />
        <h1 className="main-section__title">{title}</h1>
      </div>
      <div className="main-section__codeblocks">
        <CodeBlocksContainer />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
