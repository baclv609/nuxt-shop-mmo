// utils/uploadToCloudinary.ts
export const uploadToCloudinary = async (file: File): Promise<string> => {
    const config = useRuntimeConfig();
    const CLOUD_NAME = config.public.CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = config.public.CLOUDINARY_UPLOAD_PRESET;

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      console.error('Missing Cloudinary config:', { CLOUD_NAME, UPLOAD_PRESET });
      throw new Error('Cloudinary configuration is missing');
    }

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
  
    try {
      console.log('Uploading to Cloudinary:', { url, upload_preset: UPLOAD_PRESET });
      
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      
      if (!res.ok) {
        console.error('Cloudinary upload error:', data);
        throw new Error(data.error?.message || "Không thể upload ảnh lên Cloudinary");
      }
  
      console.log('Upload successful:', data);
      return data.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
};
  