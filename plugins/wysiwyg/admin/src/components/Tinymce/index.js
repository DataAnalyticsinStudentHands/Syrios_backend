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

      outputFormat='html'

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
            // text: 'customInsert',
            icon:'plus',
            fetch: function (callback) {
              var items = [
                {
                  type: 'menuitem',
                  text: 'Example',
                  icon:'link',
                  onAction: function () {
                    editor.insertContent('&nbsp;You clicked this examle');
                  }
                },
                // {
                //   type: 'nestedmenuitem',
                //   text: 'Menu item 2',
                //   // icon: 'user',
                //   getSubmenuItems: function () {
                //     return [
                //       {
                //         type: 'menuitem',
                //         text: 'Sub menu item 1',
                //         // icon: 'unlock',
                //         onAction: function () {
                //           editor.insertContent('&nbsp;<em>You clicked Sub menu item 1!</em>');
                //         }
                //       },
                //       {
                //         type: 'menuitem',
                //         text: 'Sub menu item 2',
                //         // icon: 'lock',
                //         onAction: function () {
                //           editor.insertContent('&nbsp;<em>You clicked Sub menu item 2!</em>');
                //         }
                //       }
                //     ];
                //   }
                // },
                // {
                //   type: 'togglemenuitem',
                //   text: 'Toggle menu item',
                //   onAction: function () {
                //     toggleState = !toggleState;
                //     editor.insertContent('&nbsp;<em>You toggled a menuitem ' + (toggleState ? 'on' : 'off') + '</em>');
                //   },
                //   onSetup: function (api) {
                //     api.setActive(toggleState);
                //     return function() {};
                //   }
                // }
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