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
          height: 300,
          menubar: false,
          valid_elements : '*[*]',
          style_formats : [
            // {title : 'Bold text', inline : 'strong'},
            // {title : 'Red text', inline : 'span', styles : {color : '#ff0000'}},
            // {title : 'Example 1', inline : 'span', classes : 'example1'},
            {title : 'H1', block : 'h1', styles : {color : '#486678'}, classes : 'story-h1'},
            {title : 'H2', block : 'h2', styles : {color : '#a85828'}, classes : 'story-h2'},
            {title : 'H3', block : 'h3', styles : {color : '#737271'}, classes : 'story-h3'},
            {title : 'H3-blue', block : 'h3', styles : {color : '#486678'}, classes : 'story-h3-blue'},
            {title : 'H4', block : 'h4', styles : {color : '#a86818'}, classes : 'story-h4'},
            {title : 'Paragraph', block : 'p', classes : 'story-text'},
          ],
          plugins:'link wordcount advlist lists code',
          toolbar: 'styles | bold italic underline | numlist bullist link | code',
          paste_as_text: true,
          toolbar_mode: 'floating',

          // setup: function (editor) {
          //     /* Menu items are recreated when the menu is closed and opened, so we need
          //        a variable to store the toggle menu item state. */
          //     // var toggleState = false;
          
          //     /* example, adding a toolbar menu button */

          //     editor.ui.registry.addMenuButton('customInsert', {
          //       text: 'Icons',
          //       icon:'template',
          //       fetch: function (callback) {
          //         var items = [
          //           {
          //             type: 'menuitem',
          //             text: 'External Icon',
          //             icon:'new-tab',
          //             onAction: function () {editor.insertContent(`<span class='story-icon'>&nbsp;&#xe818;</span>`);}
          //           },
          //           // {
          //           //   type: 'menuitem',
          //           //   text: 'Glossary link',
          //           //   icon:'info',
          //           //   onAction: function () {
          //           //     editor.insertContent(`
          //           //     <a href="" title="">
          //           //       <em><strong>Glossary</strong></em>
          //           //       <sup><small class='story-icon'>&#xe817;</small></sup>
          //           //     </a>
          //           //   `);
          //           //   }
          //           // },
          //         ]; 
          //         callback(items);
          //       }
          //     });
          
          //   },
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