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
          plugins:'link wordcount advlist lists code',
          valid_elements : '*[*]',
          toolbar: 'customInsert| bold italic underline | numlist bullist link | code',
          setup: function (editor) {
              /* Menu items are recreated when the menu is closed and opened, so we need
                 a variable to store the toggle menu item state. */
              // var toggleState = false;
          
              /* example, adding a toolbar menu button */

              editor.ui.registry.addMenuButton('customInsert', {
                text: 'Custom links with icon',
                icon:'template',
                fetch: function (callback) {
                  var items = [
                    {
                      type: 'menuitem',
                      text: 'External Link',
                      icon:'new-tab',
                      onAction: function () {
                        editor.insertContent(`<a href="" title='' target="_blank" rel="noopener noreferrer" class="external-tag"><span class='story-icon'>&#xe818;</span></a>`);
                      }
                    },
                    // {
                    //   type: 'menuitem',
                    //   text: 'Glossary link',
                    //   icon:'info',
                    //   onAction: function () {
                    //     editor.insertContent(`
                    //     <a href="" title="">
                    //       <em><strong>Glossary</strong></em>
                    //       <sup><small class='story-icon'>&#xe817;</small></sup>
                    //     </a>
                    //   `);
                    //   }
                    // },
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