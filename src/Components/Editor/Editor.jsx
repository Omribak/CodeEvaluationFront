import PropTypes from "prop-types";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import "./editor.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3000");

function Editor({ isAdmin, CodeValue }) {
  const [code, setCode] = useState("");

  const handleChange = (value) => {
    socket.emit("send-text", value);
  };

  useEffect(() => {
    socket.on("get-text", (text) => {
      setCode(text);
    });

    return () => {
      socket.off("get-text");
    };
  }, []);

  useEffect(() => {
    setCode(CodeValue);
  }, [CodeValue]);

  return (
    <div className="editor-container">
      <CodeMirror
        value={code}
        theme={tokyoNight}
        extensions={[javascript()]}
        height="345px"
        className="code-mirror-window"
        readOnly={isAdmin}
        onChange={handleChange}
      />
    </div>
  );
}

Editor.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  CodeValue: PropTypes.string.isRequired,
};

export default Editor;
