import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import File from './File';
import { uploadFile, validateSong } from './handleFiles';

const Dropzone = ({ pushS3key, setIsLoading }) => {
  const [files, setFiles] = useState({});

  useEffect(() => {
    const isLoading = !!Object.values(files).find(f => f.isLoading);
    setIsLoading(isLoading)
  }, [files, setIsLoading]);

  const onDrop = acceptedFiles => handleFiles(acceptedFiles, setFiles, pushS3key);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="Box Box-dropzone">
      <h2>Tiedostot</h2>
      <div className="Dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {Object.values(files).map(({ file, metadata, isLoading, isValidFile }) => {
          const audioFile = isAudioFile(file.name)
          const meta = !isLoading && audioFile
            ? metadata
            : { title: file.name };
          return (
            <File isAudioFile={audioFile} metadata={meta} isLoading={isLoading} isValidFile={isValidFile} key={file.name}/>
          )
        })}
        {
          isDragActive ?
            <p>Pudota tiedostot tähän ...</p> :
            <p>Raahaa ja pudota tiedostot tähän, tai klikkaa valitaksesi tiedostot</p>
        }
      </div>
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
    const isValidFile = !!filename;

    if (isValidFile && isAudioFile(filename)) {
      const metadata = await validateSong(filename);
      setFiles(prevFiles => ({
        ...prevFiles,
        [file.name]: { file, metadata, isLoading: false, isValidFile }
      }));
    } else {
      setFiles(prevFiles => ({
        ...prevFiles,
        [file.name]: { file, isLoading: false, isValidFile }
      }));
    }

    pushS3key(filename);
  });
}

const isAudioFile = (fname) =>
  fname.endsWith('.mp3')
  || fname.endsWith('.flac')
  || fname.endsWith('.wav');

export default Dropzone;