
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { prefixFileUrlWithBackendUrl, useLibrary } from '@strapi/helper-plugin';
import { IconButtonGroup, IconButton } from '@strapi/design-system/IconButton';
import Image from '@strapi/icons/Picture';

import TinyEditor from '../Tinymce';

export const insertFile = (editor, files) => {

  files.forEach((file, i) => {

    let img = `<img src="${file.url}" />`
    console.log('IMG', img)
    editor.current.insertContent(img)

  });

  setTimeout(() => editor.current.focus(), 0);
};

const Wysiwyg = ({
  description,
  disabled,
  error,
  intlLabel,
  labelAction,
  name,
  onChange,
  placeholder,
  value,
  required,
}) => {

  const { formatMessage } = useIntl();
  const textareaRef = useRef(null);
  const editorRef = useRef(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [mediaLibVisible, setMediaLibVisible] = useState(false);
  const [isExpandMode, setIsExpandMode] = useState(false);
  const { components } = useLibrary();

  const MediaLibraryDialog = components['media-library'];
  const handleTogglePopover = () => setVisiblePopover(prev => !prev);

  const [visiblePopover, setVisiblePopover] = useState(false);

  const handleToggleMediaLib = () => setMediaLibVisible(prev => !prev);
  const handleTogglePreviewMode = () => setIsPreviewMode(prev => !prev);
  const handleToggleExpand = () => setIsExpandMode(prev => !prev);

  const handleSelectAssets = files => {
    const formattedFiles = files.map(f => ({
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      mime: f.mime,
    }));

    insertFile(editorRef, formattedFiles);
    setMediaLibVisible(false);
  };

  const formattedPlaceholder = placeholder
    ? formatMessage(
        { id: placeholder.id, defaultMessage: placeholder.defaultMessage },
        { ...placeholder.values }
      )
    : '';

  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : '';
  const label = intlLabel.id
    ? formatMessage(
      { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
      { ...intlLabel.values }
    )
    : name;

  return (
    <>
      <Stack spacing={1}>
        <Stack horizontal spacing={1}>
          <Typography variant="pi" fontWeight="bold" textColor="neutral800">
            {label}
            {/* {required && <TypographyAsterisk textColor="danger600">*</TypographyAsterisk>} */}
          </Typography>
          {/* {labelAction && <LabelAction paddingLeft={1}>{labelAction}</LabelAction>} */}

        </Stack>

        <IconButton
                    onClick={() => {
                      handleTogglePopover();
                      handleToggleMediaLib();
                    }}
                    id="Image"
                    label="Image"
                    name="Image"
                    icon={<Image />}
                  />

        <TinyEditor
          disabled={disabled}
          editorRef={editorRef}
          error={errorMessage}
          isPreviewMode={isPreviewMode}
          name={name}
          onChange={onChange}
          placeholder={formattedPlaceholder}
          textareaRef={textareaRef}
          value={value}
        />

        {/* <Hint description={description} name={name} error={error} /> */}
      </Stack>

      {errorMessage && (
        <Box paddingTop={1}>
          <Typography variant="pi" textColor="danger600" data-strapi-field-error>
            {errorMessage}
          </Typography>
        </Box>
      )}

      {mediaLibVisible && (
        <MediaLibraryDialog onClose={handleToggleMediaLib} onSelectAssets={handleSelectAssets} />
      )}
    </>
  )


};

Wysiwyg.defaultProps = {
  description: null,
  disabled: true,
  error: '',
  labelAction: undefined,
  placeholder: null,
  required: false,
  value: '',
};

Wysiwyg.propTypes = {
  description: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }).isRequired,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }),
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default Wysiwyg;