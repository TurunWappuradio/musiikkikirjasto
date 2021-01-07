import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { TiNotesOutline as Note, TiDocument as Document } from 'react-icons/ti';

const Dropzone = () => {
  const [files, setFiles] = useState([]);

  const onDrop = acceptedFiles => setFiles([...files, ...acceptedFiles]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="Box">
      {files.map((file, idx) => <File file={file} key={idx} />)}
      <div className="Box-dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Pudota tiedostot tähän ...</p> :
            <p>Raahaa ja pudota tiedostot tähän, tai klikkaa valitaksesi tiedostot</p>
        }
      </div>
    </div>
  );
}

const File = ({ file }) => {
  return (
    <div className="Dropzone-file">
      {file.type.startsWith('audio')
        ? <Note />
        : <Document />}
      {file.name}
    </div>
  );
}

export default Dropzone;