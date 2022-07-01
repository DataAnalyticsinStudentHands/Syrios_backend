import React from "react";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Typography } from "@strapi/design-system/Typography";
import { Button } from '@strapi/design-system/Button';
import Plus from "@strapi/icons/Plus";

export default function ReferenceCount({ count, addReference }) {

    const handleSubmit = async (e) => {
        // Prevent submitting parent form
        e.preventDefault();
        e.stopPropagation();
    
        try {
          await addReference();
        //   setShowModal(false);
        } catch (e) {
          console.log("error", e);
        }
      };

  return (
    <Box background="neutral0" hasRadius={true} shadow="filterShadow">
      <Flex justifyContent="center" padding={8}>
        <Typography variant="alpha">
          You have total of {count} new References are ready to Upload  🚀
        </Typography>
      </Flex>

      <Flex justifyContent="center" padding={8}>
        <Button 
            startIcon={<Plus />} 
            size="L"
            onClick={handleSubmit}
        >
            Upload
        </Button>
      </Flex>
    </Box>
  );
}