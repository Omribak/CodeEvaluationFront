import axios from "axios";

export const getCodeBlocks = async () => {
  try {
    const response = await axios.get(
      "https://code-evaluation-mentor-api.onrender.com/api/code-blocks"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCodeBlock = async (codeBlockId) => {
  try {
    const response = await axios.get(
      `https://code-evaluation-mentor-api.onrender.com/api/code-blocks/${codeBlockId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
