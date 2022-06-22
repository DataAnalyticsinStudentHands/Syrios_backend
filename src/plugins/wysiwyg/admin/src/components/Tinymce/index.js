import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

const TinyEditor = ({
  disabled,
  editorRef,
  error,
  isPreviewMode,
  name,
  onChange,
  placeholder,
  textareaRef,
  value,
}) => {
  
  const onChangeRef = useRef(onChange);

  function onBlur(ev, editor){
    const content = editor.getContent();
    onChangeRef.current({ target: { name, value: content, type: 'wysiwyg' } });
  }

  return (
    <>
      <Editor        
        apiKey="rhlu8jxhebxwwzttp0963wcwthpbjemut62j8a8i4o62rtf5"
        onInit={(evt, editor) => editorRef.current = editor}
        onBlur={onBlur}
        initialValue={value}
        init={{
          height: 250,
          menubar: false,
          plugins:'link wordcount advlist lists',
          toolbar: 'customInsert | bold italic underline strikethrough superscript | numlist bullist link | undo redo',
          setup: function (editor) {
              /* Menu items are recreated when the menu is closed and opened, so we need
                 a variable to store the toggle menu item state. */
              // var toggleState = false;
          
              /* example, adding a toolbar menu button */
              editor.ui.registry.addMenuButton('customInsert', {
                text: 'Icons',
                icon:'template',
                fetch: function (callback) {
                  var items = [
                    {
                      type: 'menuitem',
                      text: 'References Text Icon (External Link)',
                      icon:'new-tab',
                      onAction: function () {
                        editor.insertContent(`<em class='story-text-external-link-icon'>&#xe818;</em>`);
                      }
                    },
                    {
                      type: 'menuitem',
                      text: 'Story Text Definition Icon (Glossery Link)',
                      icon:'info',
                      onAction: function () {
                        editor.insertContent(`<em class='story-text-definition-icon'>&#xe817;</em>`);
                      }
                    },
                  ];
                  callback(items);
                }
              });
          
            },
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:18px }',
        }}
      />

    </>
  );
}

TinyEditor.defaultProps = {
  disabled: false,
  error: undefined,
  isPreviewMode: false,
  placeholder: '',
  value: '',
};

TinyEditor.propTypes = {
  disabled: PropTypes.bool,
  editorRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  error: PropTypes.string,
  isPreviewMode: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  textareaRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  value: PropTypes.string,
};

export default TinyEditor;