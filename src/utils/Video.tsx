import Global from "./Global";

const VIDEO_URL = 'https://skill-hunt.s3.ap-south-1.amazonaws.com';
const IMAGE_URL = 'https://skill-hunt.s3.ap-south-1.amazonaws.com';

export function courseVideo(video: string) {
  const videoUrl = video
    ? VIDEO_URL + '/' + video
    : VIDEO_URL + '/' + Global.Default.courseVideo;
  return videoUrl;
}