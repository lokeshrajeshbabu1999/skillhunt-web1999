import Global from './Global';

const VIDEO_URL = 'https://skill-hunt.s3.ap-south-1.amazonaws.com';
export function courseVideo(video: string) {
  // FIXME - If the image is empty or null display a default image
  const videoUrl = video
    ? VIDEO_URL + '/' + video
    : VIDEO_URL + '/' + Global.Default.courseVideo;
  return videoUrl;
}