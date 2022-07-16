
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { prefixFileUrlWithBackendUrl, useLibrary } from '@strapi/helper-plugin';
import { IconButtonGroup, IconButton } from '@strapi/design-system/IconButton';
import Image from '@strapi/icons/Picture';
import {LoadingIndicatorPage} from "@strapi/helper-plugin";

import TinyEditor from '../Tinymce';
import Reference from '../Reference';
import Glossary from '../Glossary';

import wysiwygRequests from '../../api/wysiwug';
import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';
import { Select, Option } from '@strapi/design-system/Select';


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
  
  // if (isLoading) return <LoadingIndicatorPage />
  return (
    <>
      <Stack spacing={1}>
        <Stack horizontal spacing={1}>
          <Typography variant="pi" fontWeight="bold" textColor="neutral800">
            {label}
          </Typography>
          {labelAction && <LabelAction paddingLeft={1}>{labelAction}</LabelAction>}

        </Stack>


      <Stack>
      <Glossary
          disabled={disabled}
          editorRef={editorRef}
          name={name}
        />
        <Reference
          disabled={disabled}
          editorRef={editorRef}
          name={name}
        />
      </Stack>

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

      </Stack>

      {errorMessage && (
        <Box paddingTop={1}>
          <Typography variant="pi" textColor="danger600" data-strapi-field-error>
            {errorMessage}
          </Typography>
        </Box>
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