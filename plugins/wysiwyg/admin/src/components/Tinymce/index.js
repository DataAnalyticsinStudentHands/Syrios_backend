import React from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";

const TinyEditor = ({ onChange, name, value }) => {  
  return (
    <Editor
      apiKey= {process.env.Tiny_API}
      value={value}
      tagName={name}
      onEditorChange={(editorContent) => {
        onChange({ target: { name, value: editorContent } });
      }}
      // outputFormat="text"
      outputFormat="html"
      
      init={{
        selector: 'textarea#custom-toolbar-menu-button',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'customInsert | undo redo | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright | bullist numlist| ' +
        'removeformat | help',
        
        setup: function (editor) {
          /* Menu items are recreated when the menu is closed and opened, so we need
             a variable to store the toggle menu item state. */
          var toggleState = false;
      
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
                    editor.insertContent(`&nbsp;
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
                    editor.insertContent(`&nbsp;
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
                    editor.insertContent(`&nbsp;
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
                    editor.insertContent(`&nbsp;
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
  );
};

TinyEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};
export default TinyEditor;