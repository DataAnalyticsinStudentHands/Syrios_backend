import React, { useState } from "react";
import {
  Table,
  Thead,
  TFooter,
  Tbody,
  Tr,
  Td,
  Th,
} from "@strapi/design-system/Table";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";
import { IconButton } from "@strapi/design-system/IconButton";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";

import Pencil from "@strapi/icons/Pencil";
import Trash from "@strapi/icons/Trash";
import Plus from "@strapi/icons/Plus";


export default function ReferenceTable({
    referenceData,
}) {
  return (
    <Box
      background="neutral0"
      hasRadius={true}
      shadow="filterShadow"
      padding={8}
      style={{ marginTop: "10px" }}
    >
      <Table
        colCount={4}
        rowCount={10}
        // footer={
        //   <TFooter onClick={() => setShowModal(true)} icon={<Plus />}>
        //     Add a todo
        //   </TFooter>
        // }
      >
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">Item Key</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Title</Typography>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {referenceData.map((reference) => {
            return (
              <Tr key={reference.key}>
                <Td>
                  <Typography textColor="neutral800">{reference.key}</Typography>
                </Td>
                <Td>
                    <Typography textColor="neutral800">{reference.data.title}</Typography>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}