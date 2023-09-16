import "./style.css";
import { TextInput, Stack } from "@strapi/design-system";
import { Button } from "@strapi/design-system/Button";

import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
} from "@strapi/design-system/ModalLayout";
import { Portal } from "@strapi/design-system/Portal";
import { Typography } from "@strapi/design-system/Typography";

import React, { useState } from "react";
import _ from "lodash";
import { GlossarySarchBar } from "./glossaryBar";
import { TimelineSelector } from "./timelineBar";
import { OtherSelector } from "./otherBar";
export const InsertModal = ({ onClose, setLinkValue }) => {
  const [value, setValue] = useState({});

  const handleFinish = () => {
    const { url, text, title } = value;
    const classDir = {
      "StoryReader": "icon-syrios-stories-book",
      "Toolbox/Glossary/term": "glossary-tag",
      "Evidence/Timeline": "icon-syrios-coin-timeline",
      "/Evidence/MapCoins": "icon-entypo-map",
      "/Evidence/CoinSort": "icon-syrios-coin-hand",
      "/Evidence/Download": "icon-entypo-donwload",
      "/Toolbox/VideoLibrary": "icon-entypo-media-play",
    };

    if (_.startsWith(url, "https://syrios.uh.edu")) {
      let insertURL = url.split("https://syrios.uh.edu")[1];

      _.startsWith(insertURL, "/dev") && (insertURL = insertURL.split("/dev")[1])

      if(_.startsWith(insertURL, "/Toolbox/Glossary/term")){
        setLinkValue(
          `&nbsp;<a href="${insertURL}" class="${classDir['Toolbox/Glossary/term']}" data-title='${title}'>${text}<span class="icon-entypo-info"/></a>&nbsp;`
        )
      } else if(_.startsWith(insertURL, "/Evidence/Timeline")){
        setLinkValue(
          `&nbsp;<a href="${insertURL}" class="${classDir['Evidence/Timeline']}">${text}</a>&nbsp;`
        )
      } else if(_.startsWith(insertURL, "/StoryReader")){
        setLinkValue(
          `&nbsp;<a href="${insertURL}" class="${classDir['StoryReader']}">${text}</a>&nbsp;`
        )
      } else {
        setLinkValue(
          `&nbsp;<a href="${insertURL}" class="${classDir[insertURL]}">${text}</a>&nbsp;`
        )
      }

    } else {
      _.startsWith(url, 'http://numismatics.org') ? setLinkValue(
        `&nbsp;<a href="${url}" class="icon-syrios-numisma-reverse" target="_blank" rel="noopener noreferrer">${text}</a>&nbsp;`
      ) : (
        setLinkValue(
          `&nbsp;<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>&nbsp;`
        )
      )
    }
    onClose();
  };

  return (
    <Portal>
      <ModalLayout onClose={onClose} labelledBy="title">
        <ModalHeader>
          <Typography
            fontWeight="bold"
            textColor="neutral800"
            as="h2"
            id="title"
          >
            Insert Link
          </Typography>
        </ModalHeader>
        <ModalBody className="plugin-ie-import_modal_body">
          <Stack gap={3} spacing={4}>
            <Stack horizontal gap={3} spacing={4}>
              <GlossarySarchBar setValue={setValue} value={value}/>
              <TimelineSelector setValue={setValue} value={value}/>
              <OtherSelector setValue={setValue} value={value}/>
            </Stack>
            <TextInput
              id="urlLink"
              label="URL"
              placeholder="https://example.com"
              value={value.url}
              onChange={(e) => {
                setValue((pre) => {
                  return { ...pre, url: e.target.value };
                });
              }}
              hint="Paste URL from Syrios or other website"
              required
            />
            <TextInput
              label="Text to display"
              placeholder="Example"
              required
              value={value.text}
              onChange={(e) =>
                setValue((pre) => {
                  return { ...pre, text: e.target.value };
                })
              }
            />

          </Stack>
        </ModalBody>
        <ModalFooter
          endActions={
            <>
              <Button variant="secondary" onClick={handleFinish}>
                Save
              </Button>
            </>
          }
        />
      </ModalLayout>
    </Portal>
  );
};
