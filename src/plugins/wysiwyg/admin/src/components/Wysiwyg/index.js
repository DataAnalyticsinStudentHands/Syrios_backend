
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

import wysiwygRequests from '../../api/wysiwug';
import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';
import { Select, Option } from '@strapi/design-system/Select';


// export const insertFile = (editor, files) => {

//   files.forEach((file, i) => {

//     let img = `<img src="${file.url}" />`
//     console.log('IMG', img)
//     editor.current.insertContent(img)

//   });

//   setTimeout(() => editor.current.focus(), 0);
// };
// export const insertReference = (editor, itemkey) => {
//     let referenceContent='{`${zoteroItemKey['+`${itemkey}`+']}}`'
    
//     // let referenceContent=`${itemkey}`
//     editor.current.insertContent(referenceContent)

//   setTimeout(() => editor.current.focus(), 0);
// };

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
  // const [mediaLibVisible, setMediaLibVisible] = useState(false);
  // const [isExpandMode, setIsExpandMode] = useState(false);
  // const { components } = useLibrary();

  // const MediaLibraryDialog = components['media-library'];
  // const handleTogglePopover = () => setVisiblePopover(prev => !prev);
  // const [visiblePopover, setVisiblePopover] = useState(false);

  // const [isLoading, setIsLoading] = useState(true)

  // const [reference, setReference] = useState('');
  // const [selectValue, setSelectValue] = useState();

  // const [getReference, setGetReference] = useState([]);
  // const [zoteroItemKey, setZoteroItemKey] = useState([]);

  // async function fetchContentTypes(){
  //   if(isLoading === false) setIsLoading(true);

  //   const contentTypeData = await wysiwygRequests.getContentTypes()
  //   console.log(contentTypeData)

  //   setIsLoading(false);
  // }
  // async function fetchReferenceData(){
  //   if(isLoading === false) setIsLoading(true);

  //   const referenceData = await wysiwygRequests.getReferences('download')
  //   // console.log(referenceData.references)
  //   let itemkeys = []
  //   referenceData.references.forEach((reference)=>{
  //     itemkeys.push(reference.item_key)
  //   })
  //   // console.log(itemkeys)
  //   let bibReference = []
  //   for (const itemkey of itemkeys){
  //     const bib = await wysiwygRequests.getZoteroOneItem(itemkey)
  //     // console.log(bib)
  //     bibReference.push(bib.data)
  //   }
  //   // console.log(bibReference)
  //   function compare(a,b){
  //     if ( a.data.creators[0].lastName < b.data.creators[0].lastName ){
  //       return -1;
  //     }
  //     if ( a.data.creators[0].lastName > b.data.creators[0].lastName ){
  //       return 1;
  //     }
  //     return 0;
  //   }
  //   bibReference = bibReference.sort(compare)
  //   // console.log(bibReference)
  //   setGetReference(bibReference)
  //   let OrderedItemArray= []
  //   for (let i =0; i<bibReference.length;i++){
  //     OrderedItemArray[bibReference[i].key]="["+(i+1)+"]"      
  //   }
  //   // console.log(OrderedItemArray)
  //   setZoteroItemKey(OrderedItemArray);

  //   setIsLoading(false);
  // }

  // useEffect(async ()=>{
  //   await fetchContentTypes();
  //   await fetchReferenceData();
  // },[])

  // const insertReference = (editor, itemkey) => {
  //   let referenceContent=`<sup>${zoteroItemKey[itemkey]}</sup>`
    
  //   editor.current.insertContent(referenceContent)

  //   setTimeout(() => editor.current.focus(), 0);
  // };


  // const handleToggleMediaLib = () => setMediaLibVisible(prev => !prev);
  // const handleTogglePreviewMode = () => setIsPreviewMode(prev => !prev);
  // const handleToggleExpand = () => setIsExpandMode(prev => !prev);


  // const handleSelectAssets = files => {
  //   const formattedFiles = files.map(f => ({
  //     alt: f.alternativeText || f.name,
  //     url: prefixFileUrlWithBackendUrl(f.url),
  //     mime: f.mime,
  //   }));

  //   insertFile(editorRef, formattedFiles);
  //   setMediaLibVisible(false);
  // };

  // const handleInsert = ()=>{
  //   insertReference(editorRef,selectValue)
  // }

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
        <Reference
          disabled={disabled}
          editorRef={editorRef}
          name={name}
        />
        {/* <Select 
          id="reference" 
          aria-label="Select Reference" 
          hint="Please enter the item key" 
          onClear={() => setSelectValue(undefined)} 
          // error={error} 
          value={selectValue} 
          onChange={setSelectValue} 
          disabled={disabled} 
        >
          {
          getReference.map((o)=>{
            return(
              <Option key={o.key} value={o.key}>{o.key}</Option>
            );
          })
          }
        </Select> */}

            {/* <TextInput 
              placeholder="Ex: 9UHB783E" 
              aria-label="Reference" 
              name="reference" 
              hint="Please enter the item key from Zotero" 
              error={reference.length > 9 ? 'reference is too long' : undefined} 
              onChange={e => setReference(e.target.value)} 
              value={reference} 
              // labelAction={
              //   <Tooltip description="Content of the tooltip">
              //     <button aria-label="Information about the email" style={{
              //       border: 'none',
              //       padding: 0,
              //       background: 'transparent'
              //     }}>
              //       <Information aria-hidden={true} />
              //     </button>
              //   </Tooltip>
              // } 
            /> */}
            {/* <Button
              size="S" 
              onClick={()=>{
                handleInsert()
              }}
            >
              Inster into Editor
            </Button> */}
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

      {/* {mediaLibVisible && (
        <MediaLibraryDialog onClose={handleToggleMediaLib} onSelectAssets={handleSelectAssets} />
      )} */}
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