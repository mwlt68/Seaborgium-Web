import { ProjectConsts } from "../consts/ProjectConsts";

export class ImageHelper {
  static Get(image: undefined | [], imageType: string | undefined) {
    return image != null && image.length > 0
      ? `data:${imageType ?? ProjectConsts.DefaultImageType};base64,${image}`
      : undefined;
  }
}
