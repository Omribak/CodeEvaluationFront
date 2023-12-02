import { useQuery } from "@tanstack/react-query";
import { getCodeBlocks } from "../apiCodeBlocks/apiCodeBlocks";
import { useEffect, useState } from "react";
import CodeBlockCard from "./CodeBlockCard/CodeBlockCard";

function CodeBlocksContainer() {
  const [codeBlocks, setCodeBlocks] = useState([]);

  const {
    isLoading,
    data: codeBlocksData,
    status,
  } = useQuery({
    queryKey: ["code-blocks"],
    queryFn: getCodeBlocks,
  });

  useEffect(() => {
    if (status === "success") {
      setCodeBlocks(codeBlocksData.data.codeblocks);
    }
  }, [status, codeBlocksData, codeBlocks]);

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="code-block-cards">
          {codeBlocks.map((block) => (
            <CodeBlockCard key={block._id} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CodeBlocksContainer;
