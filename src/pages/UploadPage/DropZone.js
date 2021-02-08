import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import File from './File';
import { uploadFile, validateSong } from './handleFiles';

const Dropzone = ({ pushS3key }) => {
  const [files, setFiles] = useState({});

  const onDrop = acceptedFiles => handleFiles(acceptedFiles, setFiles, pushS3key);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="Box Dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {Object.values(files).map(({ file, metadata, isLoading }, idx) => {
        const audioFile = isAudioFile(file.name)
        const meta = !isLoading && audioFile
          ? metadata
          : { title: file.name };
        return (
          <File isAudioFile={audioFile} metadata={meta} isLoading={isLoading} />
        )
      })}
      {
        isDragActive ?
          <p>Pudota tiedostot tähän ...</p> :
          <p>Raahaa ja pudota tiedostot tähän, tai klikkaa valitaksesi tiedostot</p>
      }
    </div>
  );
}

// upload and validate dropped files.
const handleFiles = (files, setFiles, pushS3key) => {
  const newFiles = files.reduce((acc, file) => ({
    ...acc,
    [file.name]: { file, isLoading: true }
  }), {});

  setFiles(prevFiles => ({ ...prevFiles, ...newFiles }));

  files.forEach(async (file) => {
    const filename = await uploadFile(file);


    if (isAudioFile(filename)) {
      const metadata = await validateSong(filename);
      setFiles(prevFiles => ({
        ...prevFiles,
        [file.name]: { file, metadata, isLoading: false }
      }));
    } else {
      setFiles(prevFiles => ({
        ...prevFiles,
        [file.name]: { file, isLoading: false }
      }));
    }

    pushS3key(filename);
  });
}

const isAudioFile = (fname) =>
  fname.endsWith('.mp3')
  || fname.endsWith('.flac');

export default Dropzone;