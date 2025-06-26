import instance from "@/shared/api/axios/axiosInstance";

export default class ImageUploadAdapter {
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload(): Promise<{ default: string }> {
    return this.loader.file.then((file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      return instance
        .post("/file/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          return {
            default: response.data.data,
          };
        });
    });
  }
}
