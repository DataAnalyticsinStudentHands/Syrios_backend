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
                  text: 'NOMISMA Link',
                  icon:'link',
                  onAction: function () {
                    editor.insertContent("&nbsp;<a class='NOMISMALink' href='#'>NOMISMA link</a><sup><em class='demo-icon icon-coin-scale NOMISMAIcon'>&#xe817;</em></sup>&nbsp;");
                  }
                },
                {
                  type: 'menuitem',
                  text: 'Glossery Link',
                  icon:'link',
                  onAction: function () {
                    editor.insertContent("&nbsp;<a class='GlosseryLink' href='#'>Glossery link</a><em class='demo-icon icon-coin-scale GlosseryIcon'>&#xe818;</em>&nbsp;");
                  }
                },
                {
                  type: 'menuitem',
                  text: 'external Link',
                  icon:'link',
                  onAction: function () {
                    editor.insertContent("&nbsp;<a class='externalLink' href='#'>External link</a>&nbsp;");
                  }
                },
                {
                  type: 'menuitem',
                  text: 'internal Link',
                  icon:'link',
                  onAction: function () {
                    editor.insertContent("&nbsp;<a class='internalLink' href='#'>Internal link</a>&nbsp;");
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