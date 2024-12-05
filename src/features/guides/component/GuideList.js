import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import GuideLevel from "../../../component/GuideLevel";
import { Spinner } from "../../../styles/Course.module";
import useFilteredGuides from "../hooks/useFilteredGuides";

const GuideList = ({ guides, handleGuideClick, isLoading }) => {
  // const [filteredGuides, setFilteredGuides] = useState(guides);
  const [selectedLevel, setSelectedLevel] = useState("");
  const filteredGuides = useFilteredGuides(guides, selectedLevel);


  // FIXME - Move this hook to a seperate fle
  // useEffect(() => {
  //   let activeGuides = guides.filter((guide) => guide.active === true);
  //   if (selectedLevel) {
  //     activeGuides = activeGuides.filter(
  //       (guide) => guide.level === selectedLevel
  //     );
  //   }
  //   setFilteredGuides(activeGuides);
  // }, [selectedLevel, guides]);

  // const levelMap = [
  //   { key: "beginner", value: "Beginner" },
  //   { key: "intermediate", value: "Intermediate" },
  //   { key: "advanced", value: "Advanced" },
  // ];

  // const onLevelSelection = (level) => {
  //   setSelectedLevel(level);
  // };

  const displayResult = () => {
    return (
      <Grid container spacing={1} sx={{ marginTop: 1 }}>
        {filteredGuides.map((guide) => (
          <Grid item md={4} key={guide.guide_id}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  component="span"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginLeft: "auto",
                  }}
                >
                  <GuideLevel guide={guide} />
                </Typography>
                <Box
                  component="div"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Link
                    href={{
                      pathname: "/guide/view",
                      query: { src: guide.source, id: guide.guide_id },
                    }}
                    style={{ textDecoration: "none" }}
                    color="tertiary"
                    component="div"
                    sx={{ flexGrow: 1, textAlign: "left" }}
                  >
                    <Typography component="span"
                      sx={{ fontWeight: "bold", color:"guideLink.primary"}}>
                      {guide.title}
                    </Typography>
                  </Link>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="span"
                >
                  {guide.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };
  const loadSpinner = () => {
    return (
      <Spinner>
        <TailSpin />
      </Spinner>
    );
  };

  return (
    <Typography component="span">
      {isLoading ? loadSpinner() : displayResult()}
    </Typography>
  );
};

export default GuideList;
