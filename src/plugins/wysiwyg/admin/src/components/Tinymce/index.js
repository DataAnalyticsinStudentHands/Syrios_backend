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
          toolbar: 'customInsert | undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help link',
            
            setup: function (editor) {
              /* Menu items are recreated when the menu is closed and opened, so we need
                 a variable to store the toggle menu item state. */
              // var toggleState = false;
          
              /* example, adding a toolbar menu button */
              editor.ui.registry.addMenuButton('customInsert', {
                text: 'customLinks',
                icon:'plus',
                fetch: function (callback) {
                  var items = [
                    {
                      type: 'menuitem',
                      text: 'External Link',
                      icon:'link',
                      onAction: function () {
                        editor.insertContent(`
                                              <a class='Link ExternalLink' href='#'>
                                                External link
                                                <em class='demo-icon icon-coin-scale Icon ExternalIcon'>&#xe818;</em>
                                              </a>&nbsp;`);
                      }
                    },
                    {
                      type: 'menuitem',
                      text: 'NOMISMA',
                      icon:'link',
                      onAction: function () {
                        editor.insertContent(`
                                              <a class='Link NomisamaLink' href='#'>
                                                NOMISMA link 
                                                <em class='demo-icon icon-coin-scale Icon NomisamaIcon'>&#xe814;</em>
                                              </a>&nbsp;`);
                      }
                    },
                    {
                      type: 'menuitem',
                      text: 'Glossery Link',
                      icon:'link',
                      onAction: function () {
                        editor.insertContent(`
                                              <a class='Link GlossaryLink' href='#'>
                                                Glossery link 
                                                <sup>
                                                  <em class='demo-icon icon-coin-scale Icon GlosseryIcon'>
                                                    &#xe817;
                                                  </em>
                                                </sup>
                                              </a>&nbsp;`);
                      }
                    },
                    {
                      type: 'menuitem',
                      text: 'Internal Link',
                      icon:'link',
                      onAction: function () {
                        editor.insertContent(`
                                              <a class='Link InternalLink' href='#'>
                                                Internal link
                                                <sup class='InternalNumber'>
                                                  [1]
                                                </sup>
                                              </a>&nbsp;`);
                      }
                    },
                  ];
                  callback(items);
                }
              });
          
            },
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
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