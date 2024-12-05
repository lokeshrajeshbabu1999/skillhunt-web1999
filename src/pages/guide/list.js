import { Container } from "@mui/material";
import { useRouter } from "next/router";
import Layout from "../../component/Layout";
import GuideList from "../../features/guides/component/GuideList";
import useUserGuides from "../../features/guides/hooks/useUserGuides";

const ListGuides = () => {
  const [userGuide, isLoading] = useUserGuides();
  const router = useRouter();

  const handleGuideClick = (source, guide_id) => {
    let pathGuide = `/guide/view?src=${source}&id=${guide_id}`;
    router.push(pathGuide);
  };

  return (
    <Layout>
      <Container>
        <GuideList
          guides={userGuide}
          isLoading={isLoading}
          handleGuideClick={(source, guide_id) =>
            handleGuideClick(source, guide_id)
          }
        />
      </Container>
    </Layout>
  );
};

export default ListGuides;
