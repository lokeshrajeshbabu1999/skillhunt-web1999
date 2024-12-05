import { mdiGoogleClassroom, mdiHumanMaleBoard } from "@mdi/js";
import Icon from "@mdi/react";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import GradeIcon from '@mui/icons-material/Grade';

import { Box, Tooltip, Typography } from "@mui/material";

const GuideLevel = ({ guide }) => {
    if (guide.level === "beginner") {
        return (
            <Box mx={1}>
                <Tooltip title={<p style={{
                    fontSize: "15px", margin: "0", padding: "0"
                }}>Beginner</p>}>
                    <Typography>
                        <GradeIcon sx={{ color: "gold" }} title="Beginner Level" />
                    </Typography>
                </Tooltip>
            </Box>
        );
    } else if (guide.level === "intermediate") {
        return (

            <Box mx={1}>
                <Tooltip title={<p style={{
                    fontSize: "15px", margin: "0", padding: "0"
                }}>Intermediate</p>}>
                    <Typography>

                        <GradeIcon sx={{ color: "gold" }} title="intermediate Level" />
                        <GradeIcon sx={{ color: "gold" }} title="intermediate Level" />
                    </Typography>
                </Tooltip>
            </Box>
        );
    } else if (guide.level === "advanced") {
        return (
            <Box mx={1}>
                <Tooltip title={<p style={{
                    fontSize: "15px", margin: "0", padding: "0"
                }}>Advanced</p>}>
                    <Typography>
                        <GradeIcon sx={{ color: "gold" }} title="Advanced Level" />
                        <GradeIcon sx={{ color: "gold" }} title="Advanced Level" />
                        <GradeIcon sx={{ color: "gold" }} title="Advanced Level" />
                    </Typography>
                </Tooltip>
            </Box>
        );
    }
    else {
        return null
    }
};

export default GuideLevel;
