export interface Thing {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface UploadedImage {
  id: number;
  url: string;
  format: string;
  bytes: number;
  fileName: string;
  height: number;
  width: number;
}
