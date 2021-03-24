import React, { useState, useEffect } from "react";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";

export default function UploadButton({ fileName, onChange }) {
  const [message, setMessage] = useState("Drag and drop a csv file here");
  const [open, setOpen] = React.useState(false);

  const uploadHandler = (files) => {
    let file = files[0];
    if (file) {
      const uploadedFile = new FormData();

      uploadedFile.append("file", file);

      axios.post("https://datavizualisaton.herokuapp.com/uploadFile", uploadedFile).then((response) => {
        if (response.data.message === "upload was a success") {
          onChange(file.name);
        }

        setMessage(file.name);
      });
    }
  };

  return (
    <div className="uploadData">
      <DropzoneArea
        dropzoneText={message}
        onChange={uploadHandler}
        filesLimit={1}
        Icon={null}
      />
    </div>
  );
}
