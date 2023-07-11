import React, { useState } from "react";
import { Button } from "@strapi/design-system/Button";
import { Stack } from "@strapi/design-system";
import Link from "@strapi/icons/Link";
import Plus from "@strapi/icons/Plus";
import { InsertModal } from "../InsertModal";
export const InsertButton = ({
  fullWidth = false,
  disabled,
  editorRef,
  name,
  onChange,
}) => {
  const [importVisible, setImportVisible] = useState(false);

  const [linkValue, setLinkValue] = useState("");

  const openImportModal = () => {
    setImportVisible(true);
  };

  const closeImportModal = () => {
    setImportVisible(false);
  };

  const handleInsert = () => {
    insertURL(editorRef);
  };
  const insertURL = (editor) => {
    editor.current.insertContent(linkValue);
    setTimeout(() => editor.current.focus(), 0);
    setLinkValue("");
  };
  return (
    <Stack spacing={2} horizontal>
      <Button
        startIcon={<Link />}
        onClick={openImportModal}
        fullWidth={fullWidth}
      >
        Link
      </Button>

      {linkValue && (
        <Button startIcon={<Plus />} onClick={handleInsert}>
          Insert
        </Button>
      )}

      {importVisible && (
        <InsertModal onClose={closeImportModal} setLinkValue={setLinkValue} />
      )}
    </Stack>
  );
};
