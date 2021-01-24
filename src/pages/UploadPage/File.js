import { useState, useEffect } from 'react';
import { TiNotesOutline as Note, TiDocument as Document } from 'react-icons/ti';
import { AiOutlineLoading as Loading, AiOutlineCheck as Check } from 'react-icons/ai';
import { uploadFile, getMetadata } from './handleFiles';


const File = ({ file }) => {
  const [status, setStatus] = useState('loading');
  const [metadata, setMetadata] = useState({ title: file.name });

  useEffect(() =>
    uploadFile(file)
      .then(async (filename) => {
        if (isAudioFile(filename)) {
          const metadata = await getMetadata(filename);
          setMetadata(metadata);
        }
        setStatus('ready');
      })
      .catch(err => console.log('error', err)),
    [file]);

  return (
    <div className="Dropzone-file">
      {isAudioFile(file.name)
        ? <Note />
        : <Document />}
      <Meta metadata={metadata} />
      {status === 'loading' 
        ? <Loading className="Dropzone-loading" />
        : <Check className="Dropzone-check" />}
    </div>
  );
}

const isAudioFile = (fname) =>
  fname.endsWith('.mp3')
  || fname.endsWith('.flac');

const Meta = ({ metadata }) => (
  <div className="File-metadata">
    <h1>{metadata.title}</h1>
    <p>{metadata.artist}</p>
    <p>{metadata.album}</p>
  </div>
);

export default File;