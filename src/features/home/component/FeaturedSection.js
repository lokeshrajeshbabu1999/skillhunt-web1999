import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import CourseFrequency from "../../../component/CourseFrequency";
import CourseMode from "../../../component/CourseMode";
import CoursePrice from "../../../component/CoursePrice";
import { courseImage } from "../../../util/Media";

const FeaturedSection = ({ section }) => {
  const router = useRouter();

  const onEventSelect = (course) => {
    let path = "/course/" + course.course_id;
    router.push(path);
  };

  return (
    <Box
      sx={{
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      <Stack direction="row" spacing={2}>
        {section.courses &&
          section.courses.map((course) => (
            <CardActionArea
              key={course.course_id}
              onClick={() => onEventSelect(course)}
            >
              <Card sx={{ width: 350, height: "100%", padding: "8px" }}>
                <CardMedia
                  component="img"
                  image={courseImage(course.image)}
                  sx={{ width: "100%", maxHeight: 300 }}
                />
                <CardContent>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ fontWeight: "bold" }}
                  >
                    {course.title}
                  </Typography>
                  <Typography component="div" sx={{ display: "flex", alignItems: "center" }}>
                    <CourseMode course={course} />
                    <Stack>
                      <Typography component="span">{course.author}</Typography>
                      <CourseFrequency course={course} />
                    </Stack>
                    <Typography component="span" sx={{ marginLeft: "auto" }}>
                      <CoursePrice course={course} />
                    </Typography>
                  </Typography>
                  <Typography
                    component="span"
                    variant="body1"
                    color="text.primary"
                    sx={{ marginTop: "8px" }}
                  >
                    {course.desc}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          ))}
      </Stack>
    </Box>
  );
};

export default FeaturedSection;
