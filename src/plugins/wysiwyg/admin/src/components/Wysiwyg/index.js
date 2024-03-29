import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography } from "@strapi/design-system/Typography";
import { Box } from "@strapi/design-system/Box";
import { Stack } from "@strapi/design-system/Stack";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import TinyEditor from "../Tinymce";
import Reference from "../Reference";
import { InsertButton } from "../InsertButton";

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
    : "";

  const errorMessage = error
    ? formatMessage({ id: error, defaultMessage: error })
    : "";
  const label = intlLabel.id
    ? formatMessage(
        { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
        { ...intlLabel.values }
      )
    : name;

  return (
    <>
      <Stack spacing={1}>
        <Box>
          <Typography variant="pi" fontWeight="bold">
            {formatMessage(intlLabel)}
          </Typography>
          {required && (
            <Typography variant="pi" fontWeight="bold" textColor="danger600">
              *
            </Typography>
          )}
        </Box>
        <Grid gap={3}>
          {window.location.href.split("api::")[1].substring(0, 5) ===
            "story" && (
            <GridItem col={6} s={12}>
              <Reference
                disabled={disabled}
                editorRef={editorRef}
                name={name}
              />
            </GridItem>
          )}
          <GridItem col={6} s={12}>
            <InsertButton
              disabled={disabled}
              editorRef={editorRef}
              name={name}
            />
          </GridItem>
        </Grid>

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
          <Typography
            variant="pi"
            textColor="danger600"
            data-strapi-field-error
          >
            {errorMessage}
          </Typography>
        </Box>
      )}
    </>
  );
};

Wysiwyg.defaultProps = {
  description: null,
  disabled: true,
  error: "",
  labelAction: undefined,
  placeholder: null,
  required: false,
  value: "",
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