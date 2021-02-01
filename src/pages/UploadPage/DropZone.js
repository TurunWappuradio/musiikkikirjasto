import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import File from './File';

const Dropzone = ({ pushS3key }) => {
  const [files, setFiles] = useState([]);

  const onDrop = acceptedFiles => {
    setFiles([...files, ...acceptedFiles])
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="Box Dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {files.map((file, idx) => <File file={file} pushS3key={pushS3key} key={idx} />)}
      {
        isDragActive ?
          <p>Pudota tiedostot tähän ...</p> :
          <p>Raahaa ja pudota tiedostot tähän, tai klikkaa valitaksesi tiedostot</p>
      }
    </div>
  );
}

export default Dropzone;