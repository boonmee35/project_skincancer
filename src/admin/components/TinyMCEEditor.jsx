import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

export default function TinyMCEEditor({ value, onChange, type = "article" }) {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
      value={value}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | image media | link | removeformat | help',
        image_title: true,
        automatic_uploads: true,
        images_upload_credentials: true,
        convert_urls: false,
        remove_script_host: false,
        relative_urls: false,

        images_upload_handler: (blobInfo, progress) => {
          return new Promise(async (resolve, reject) => {
            try {
              const formData = new FormData();
              formData.append("image", blobInfo.blob(), blobInfo.filename());

              const uploadUrl =
                type === "post"
                  ? "http://localhost:5000/api/post/upload"
                  : "http://localhost:5000/api/article/upload";

              const res = await axios.post(uploadUrl, formData);
              const imageUrl = res.data.imageUrl;

              if (typeof imageUrl === "string") resolve(imageUrl);
              else reject({ message: "Invalid URL", remove: true });
            } catch (err) {
              reject({ message: "Upload failed", remove: true });
            }
          });
        },

      }}
      onEditorChange={(newValue) => onChange(newValue)}
    />
  );
}