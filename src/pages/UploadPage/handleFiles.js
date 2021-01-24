const uploadApiURL = process.env.REACT_APP_UPLOAD_API_URL;
const metadataApi = process.env.REACT_APP_METADATA_API_URL;

const uploadFile = async (file) => {
  const prefix = file.name.split('.').pop();

  const uploadLinkResponse = await fetch(uploadApiURL, {
    method: 'POST',
    body: JSON.stringify({ prefix })
  });

  const { uploadURL, filename } = await uploadLinkResponse.json();

  await fetch(uploadURL, {
    method: 'PUT',
    body: file
  });

  return filename;
}

const getMetadata = async (filename) => {
  const metadataResponse = await fetch(metadataApi, {
    method: 'POST',
    body: JSON.stringify({ filename })
  });

  return metadataResponse.json();
}

export { uploadFile, getMetadata };