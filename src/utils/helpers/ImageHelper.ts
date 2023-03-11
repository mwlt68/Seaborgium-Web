export class ImageHelper {
  static Get(image: undefined | []) {
    return image != null && image.length > 0
      ? "data:image/png;base64," + image
      : undefined;
  }
}
