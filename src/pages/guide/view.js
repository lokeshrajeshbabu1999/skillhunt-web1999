import { Box, CircularProgress, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../component/Layout";
import useArticle from "../../features/guides/hooks/useArticle";
import useUserGuides from "../../features/guides/hooks/useUserGuides";

const GuideView = () => {
  const router = useRouter();
  const { src, id } = router.query;
  const [userGuides, isLoading] = useUserGuides();
  const [userArticle] = useArticle(src);
  const [userGuide, setUserGuide] = useState(null);

  useEffect(() => {
    if (id && userGuides.length > 0) {
      const guideDetail = userGuides.find((guide) => guide.guide_id === id);
      setUserGuide(guideDetail);
    }
  }, [id, userGuides]);

  return (
    <Layout>
      <Container>
        <Helmet>
          <title>{userGuide ? userGuide.title : "guideTitle"}</title>
        </Helmet>
        {isLoading ? (
          <Typography display="flex" justifyContent="flex-end">
            <CircularProgress />
          </Typography>
        ) : (
          <>
            <Link href="/guide/list" className="nextLink">
              <Typography
                display="flex"
                justifyContent="flex-end"
                component="subtitle"
                sx={{
                  color: "guideLink.primary",
                  maxWidth: "90%",
                }}
              >
                Back To Guide List
              </Typography>
            </Link>

            <Box mt={4}>
              {/* <div>{userGuide ? JSON.stringify(userGuide.title) : "Guide not found"}</div> */}
              <div
                className="guide-container"
                dangerouslySetInnerHTML={{ __html: userArticle }}
              />
            </Box>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default GuideView;
