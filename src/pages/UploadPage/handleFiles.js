const uploadApiURL = process.env.REACT_APP_UPLOAD_API_URL;
const metadataApi = process.env.REACT_APP_METADATA_API_URL;

const uploadFile = async (file) => {
  const fileExt = file.name.split('.').pop();

  const uploadLinkResponse = await fetch(uploadApiURL, {
    method: 'POST',
    body: JSON.stringify({ fileExt })
  });

  if (uploadLinkResponse.status !== 200) {
    return null;
  }

  const { uploadURL, filename } = await uploadLinkResponse.json();

  await fetch(uploadURL, {
    method: 'PUT',
    body: file
  });

  return filename;
}

// read and validate song metadata
const validateSong = async (filename) => {
  const res = await fetch(metadataApi, {
    method: 'POST',
    body: JSON.stringify({
      operation: 'validate-song',
      filename
    })
  });

  if (res.status !== 200) {
    return {
      title: await res.json()
    }
  }

  return res.json()
}

// submit songs 
const submitSongs = async (filenames, ripper_name, ripper_email, music_source, source_description, password) => {
  try {
    const res = await fetch(metadataApi, {
      method: 'POST',
      body: JSON.stringify({
        operation: 'submit-songs',
        filenames,
        ripper_name,
        ripper_email,
        music_source,
        source_description,
        password
      })
    });
  
    if (res.status !== 200) {
      return res.json();
    }
  
    const json = await res.json();
    return `Albumi ${json.album} lähetetty musiikkikirjastoon.`;
  } catch (err) {
    return err.message;
  }
}

export { uploadFile, validateSong, submitSongs };