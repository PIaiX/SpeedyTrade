import React, { useEffect, useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import swal from "sweetalert";

export default function InputFile(props) {
  const [files, setFiles] = useState(0);

  useEffect(() => {
    if (props.isFileSent) {
      setFiles(0);
      props.setIsFileSent(false);
    }
  }, [props.isFileSent]);

  return (
    <label className={"input-file " + props.className}>
      {props?.multiple ? (
        <input
          type="file"
          multiple
          {...props.register}
          onChange={(e) => {
            const file = e.target.files[0];
            if (
              e.target.files.length &&
              !(file.type === "image/jpeg" || file.type === "image/png")
            ) {
              document.querySelector("input[type=file]").value = "";
              swal("Только изображения формата JPEG или PNG");
            }
            setFiles(e.target.files.length);
          }}
          disabled={props.disabled}
        />
      ) : (
        <input
          type="file"
          {...props.register}
          onChange={(e) => {
            const file = e.target.files[0];
            if (
              e.target.files.length &&
              !(file.type === "image/jpeg" || file.type === "image/png")
            ) {
              document.querySelector("input[type=file]").value = "";
              swal("Только изображения формата JPEG или PNG");
            }
            setFiles(e.target.files.length);
          }}
          disabled={props.disabled}
        />
      )}
      <FiPaperclip />
      {props?.withText && <span>Прикрепить файлы</span>}
      <div className="ind">{files > 0 && files}</div>
    </label>
  );
}
