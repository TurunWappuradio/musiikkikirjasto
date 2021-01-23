const uploadApiURL = process.env.REACT_APP_UPLOAD_API_URL;

const uploadFile = async (file) => {
  const prefix = file.name.split('.').pop();

  const uploadLinkResponse = await fetch(uploadApiURL, {
    method: 'POST',
    body: JSON.stringify({ prefix })
  });

  const { uploadURL } = await uploadLinkResponse.json();

  await fetch(uploadURL, {
    method: 'PUT',
    body: file
  });
}

export { uploadFile };