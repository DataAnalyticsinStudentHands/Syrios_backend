import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stack } from "@strapi/design-system/Stack";
import { Radio, RadioGroup } from "@strapi/design-system/Radio";
import { Button } from "@strapi/design-system/Button";
// import wysiwygRequests from '../../api/wysiwug';
import axios from "axios";
import qs from "qs";

const Reference = ({ disabled, editorRef, name, onChange }) => {
  const [jsonReference, setJsonference] = useState({});
  const [selectRadio, setSelectRadio] = useState("");

  const handleGetData = async (e) => {
    e.preventDefault();

    let baseURI = e.target.baseURI.split("/");

    let storyID = baseURI.pop();

    try {
      const query = qs.stringify(
        {
          fields: ["name"],
          populate: ["references"],
        },
        { encodeValuesOnly: true }
      );

      const { data } = await axios.get(
        `${process.env.STRAPI_ADMIN_BACKEND_URL}/api/stories/${storyID}?${query}`
      );
      const options = data.data.attributes.references.data.map((reference) => {
        return reference.attributes.authorLastName;
      });

      let sortedOptions = {};
      options.sort().forEach((option, index) => {
        sortedOptions[option] = index + 1;
      });
      setJsonference(sortedOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInsert = () => {
    insertReference(editorRef);
  };
  const insertReference = (editor) => {
    let referenceContent = `<button class='reference-tag'><sup>${jsonReference[selectRadio]}</sup></button>`;

    editor.current.insertContent(referenceContent);
    setTimeout(() => editor.current.focus(), 0);
    setSelectRadio("");
  };

  return (
    <Stack>
      <Button variant="secondary" onClick={handleGetData}>
        Reference
      </Button>
      {jsonReference.length !== 0 && (
        <RadioGroup
          onChange={(e) => setSelectRadio(e.target.value)}
          value={selectRadio}
        >
          {Object.entries(jsonReference).map(([key, value]) => {
            return (
              <Radio key={value} value={key}>
                {key}
              </Radio>
            );
          })}
        </RadioGroup>
      )}

      {selectRadio.length !== 0 && jsonReference.length !== 0 && (
        <Stack horizontal spacing={3} justifyContent="center">
          <Button
            size="S"
            onClick={() => {
              handleInsert();
            }}
          >
            Insert
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

Reference.defaultProps = {
  disabled: true,
  value: "",
};
Reference.propTypes = {
  disabled: PropTypes.bool,
  editorRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};
export default Reference;
