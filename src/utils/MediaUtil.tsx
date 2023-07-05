// import { IMAGE_URL } from '@env';
import Config from 'react-native-config';
import Global from './Global';

const VIDEO_URL = Config.IMAGE_URL;
const IMAGE_URL = Config.IMAGE_URL;
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
