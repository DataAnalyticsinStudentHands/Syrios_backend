import React from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
const TinyEditor = ({ onChange, name, value }) => {
  return (
    <Editor
      apiKey="API Key"
      value={value}
      tagName={name}
      onEditorChange={(editorContent) => {
        onChange({ target: { name, value: editorContent } });
      }}
      outputFormat="text"
      init={{}}
    />
  );
};
TinyEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};
export default TinyEditor;