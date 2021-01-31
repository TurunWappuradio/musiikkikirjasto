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

// read and validate song metadata
const validateSong = async (filename) => {
  const url = metadataApi + '/validate-song';

  const metadataResponse = await fetch(url, {
    method: 'POST',
    headers: {
      Origin: 'https://musiikki.turunwappuradio.com'
    },
    body: JSON.stringify({ filename })
  });

  return metadataResponse.json();
}

export { uploadFile, validateSong };