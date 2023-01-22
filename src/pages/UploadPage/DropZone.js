import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import File from './File';
import { uploadFile, validateSong } from './handleFiles';

const INVALID_FILES = "Kiellettyjä tiedostotyyppejä.";
const MISMATCHED_ALBUM = "Kaikki raidat eivät ole samalta albumilta. Syötä korkeintaan yhden levyn tiedostot kerralla.";
const MISSING_FILES = "Lähetys vaatii vähintään yhden audiotiedoston ja yhden todistetiedoston.";

const Dropzone = ({ files, setFiles, pushS3key, setIsLoading, fileValidationError, setFileValidationError,
                    isProfessional, addFiles }) => {
  useEffect(() => {
    const isLoading = !!Object.values(files).find(f => f.isLoading);
    setIsLoading(isLoading)
  }, [files, setIsLoading]);

  useEffect(() => {
    setFileValidationError(null);
    // Make sure all files are valid.
    const isInvalidFiletype = !!Object.values(files)
      .find(({ isLoading, isValidFile }) => !isLoading && !isValidFile);

    if (isInvalidFiletype) setFileValidationError(INVALID_FILES);

    // make sure all songs are from the same album.
    const audioFiles = Object.values(files)
      .filter(f => isAudioFile(f.file.name));

    if (audioFiles.length >= 1 && audioFiles.every(af => !af.isLoading)) {
      const album = audioFiles[0].metadata.album;
      const isSameAlbum = audioFiles.every(af => af.metadata && af.metadata.album === album);
      if (!isSameAlbum) setFileValidationError(MISMATCHED_ALBUM);
    }

    // Make sure there's atleast one audiofile and one non-audiofile.
    const isNonAudiofile = Object.values(files).find(f => !isAudioFile(f.file.name));
    if (Object.keys(files).length > 0 && (audioFiles.length === 0 || !isNonAudiofile)) setFileValidationError(MISSING_FILES);
  }, [files, setFileValidationError]);

  const onDrop = isProfessional
    ? addFiles
    : acceptedFiles => handleFiles(acceptedFiles, setFiles, pushS3key);

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
        {fileValidationError && (
          <p className="Dropzone-error">
            {fileValidationError}
          </p>
        )}
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
  || fname.endsWith('.wav')
  || fname.endsWith('.m4a');

export default Dropzone;