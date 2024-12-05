import { Box, Container } from "@mui/material";
import { marked } from "marked";
import { useEffect, useState } from "react";
import Layout from "../../component/Layout";

const GuidePreview = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("/article.md")
      .then((response) => response.text())
      .then((html) => setHtmlContent(marked(html)))
      .catch((error) => console.error("Error loading HTML:", error));
  }, []);

  return (
    <Layout>
      <Container>
        <>
          <Box>
            <div
              class="guide-container"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </Box>
        </>
      </Container>
    </Layout>
  );
};

export default GuidePreview;
