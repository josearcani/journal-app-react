export const fileUpload = async (file) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/jarh-workplace/upload";
  // CREATE FORM-DATA
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    })

    // resp: {body, bodyUsed, headers, ok, status, redirected, status, statusText, type, url}
    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error
  }
}
