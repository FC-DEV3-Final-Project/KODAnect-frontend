import ImageUploadAdapter from "./ImageUploadAdapter";

export default function CustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new ImageUploadAdapter(loader);
  };
}
