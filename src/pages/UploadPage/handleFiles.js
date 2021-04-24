const uploadApiURL = process.env.REACT_APP_UPLOAD_API_URL;
const metadataApi = process.env.REACT_APP_METADATA_API_URL;

const ping = () => {
  fetch(metadataApi, {
    method: 'POST',
    body: JSON.stringify({ operation: 'ping' })
  });
}

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
const submitSongs = async (filenames, ripper_name, ripper_email, music_source, source_description, message) => {
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
        message
      })
    });
  
    if (res.status !== 200) {
      return {
        "status": "error",
        "response": await res.json()
      };
    }
  
    return res.json();
  } catch (err) {
    console.error("Error submitting songs: ", err);
    return { error: err.message };
  }
}

// submit multiple discs at once
const professionalSubmitSongs = async (discs, ripper_name, ripper_email, music_source, source_description, message) => {
  const discPromises = discs.map(async ({ files }) => {
    // upload to S3
    const filenamesPromise = Object.values(files)
      .map(async (file) => await uploadFile(file.file));

    const filenames = await Promise.all(filenamesPromise);

    // call submit song
    return submitSongs(filenames, ripper_name, ripper_email, music_source, source_description, message)
  });

  return Promise.all(discPromises);
}

export { ping, uploadFile, validateSong, submitSongs, professionalSubmitSongs };