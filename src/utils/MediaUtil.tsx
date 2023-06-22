// import { IMAGE_URL } from '@env';
import Global from './Global';

const VIDEO_URL = 'https://skill-hunt.s3.ap-south-1.amazonaws.com';
const IMAGE_URL = 'https://skill-hunt.s3.ap-south-1.amazonaws.com';
export function courseImage(image: string) {
  // FIXME - If the image is empty or null display a default image
  const imageUrl = image
    ? IMAGE_URL + '/' + image
    : IMAGE_URL + '/' + Global.Default.courseImage;
  return imageUrl;
}

export function videoUrl(video: string) {
  const mediaUrl = VIDEO_URL + '/' + video;
  return mediaUrl;
}
