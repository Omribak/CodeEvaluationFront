import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCodeBlock } from "../../apiCodeBlocks/apiCodeBlocks";
import "./code-block-page.css";
import Editor from "../../Components/Editor/Editor";
import { BackBtn, SubmitBtn } from "../../constants/strings/CodeBlockPage";
import { HiCursorClick } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";
import io from "socket.io-client";
import UsersIndicator from "../../Components/UsersIndicator/UsersIndicator";

const socket = io.connect("https://code-evaluation-mentor-api.onrender.com/");

function CodeBlockPage() {
  const { blockId } = useParams();
  const [codeBlock, setCodeBlock] = useState({});
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const backButtonClicked = () => {
    navigate("/home");
  };

  const {
    isLoading,
    data: codeBlockData,
    status,
  } = useQuery({
    queryKey: ["code-block", blockId],
    queryFn: () => getCodeBlock(blockId),
  });

  useEffect(() => {
    if (status === "success") {
      setCodeBlock(codeBlockData.codeblock);
      console.log(codeBlockData.codeblock);
    }
  }, [status, codeBlockData]);

  useEffect(() => {
    socket.emit("givePermission");
    socket.on("roleChanged", (role) => {
      if (role === "admin") {
        localStorage.setItem("AdminRole", true);
        setIsAdmin(true);
      } else {
        localStorage.setItem("AdminRole", false);
        setIsAdmin(false);
      }
    });

    return () => {
      socket.emit("leave-page");
      socket.off("givePermission");
      socket.off("roleChanged");
    };
  }, [isAdmin]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="code-block-container">
      <h1 className="code-block-header">{codeBlock.title} </h1>
      <div className="code-block-page-main-section">
        <UsersIndicator isAdmin={isAdmin} />
        <Editor isAdmin={isAdmin} CodeValue={codeBlock.code} />
      </div>
      <div className="code-block-btns">
        <button className="code-block-back-btn" onClick={backButtonClicked}>
          <FaArrowLeft className="back-btn-arrow-left" />
          {BackBtn}
        </button>
        <button className="code-block-submit-btn">
          {SubmitBtn}
          <HiCursorClick size={20} />
        </button>
      </div>
    </div>
  );
}

export default CodeBlockPage;
