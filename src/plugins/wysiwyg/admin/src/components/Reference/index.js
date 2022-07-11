import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {LoadingIndicatorPage} from "@strapi/helper-plugin";
import { Stack } from '@strapi/design-system/Stack';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Typography } from '@strapi/design-system/Typography';
import { Radio, RadioGroup } from '@strapi/design-system/Radio';

import wysiwygRequests from '../../api/wysiwug';
// import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';
import { Select, Option } from '@strapi/design-system/Select';


const Reference = ({
    disabled,
    editorRef,
    name,
    onChange,
})=>{
    const [isLoading, setIsLoading] = useState(true)
    const [contentType, setContentType] = useState([])
    const [contentTypeObj, setContentTypeObj] = useState({})

    const [collectionName, setCollectionName] = useState('');
    const [collectionType, setCollectionType] = useState([]);

    const [collectionNumber, setCollectionNumber] = useState('');
    const [jsonReference, setJsonference] = useState([]);

    const [itemKeyOrder, setItemKeyOrder] = useState([]);

    const [selectRadio, setSelectRadio] = useState()

    async function fetchContentType(){
        if(isLoading === false) setIsLoading(true);
        const data = await wysiwygRequests.findContentTypes()
        let dataObj = []
        let dataArray = {}
        data.data.forEach((content)=>{
            if(content.attributes.references){
                dataArray[content.apiID]=content.kind
                dataObj.push(content.apiID)
            }
        })
        setContentType(dataObj)
        setContentTypeObj(dataArray)
        setIsLoading(false);
    }
    async function fetchCollectionType(){
        if (collectionName != '' && contentTypeObj[collectionName] === 'collectionType'){
            const data = await wysiwygRequests.findCollectionTypes(collectionName)
            let dataList = []
            data.results.forEach((collection)=>{
                if(collection.references.count !=0){
                    dataList.push(collection)
                }else{
                    return
                }
                })
            setCollectionType(dataList)
        }
    }
    async function fetchReferenceData(){
        let referenceData = []
        if(contentTypeObj[collectionName] === 'singleType'){
            referenceData = await wysiwygRequests.findSingleTypes(collectionName)
        }
        else if(contentTypeObj[collectionName] === 'collectionType'){
            referenceData = await wysiwygRequests.findOneCollectionType(collectionName,collectionNumber)
        }
        if (referenceData.references != undefined){
            let itemkeys = []
            referenceData.references.forEach((reference)=>{itemkeys.push(reference.item_key)})
            //fetch data from Zotoer
            let zoteroReference = []
            for (const itemkey of itemkeys){
                const data = await wysiwygRequests.getZoteroOneItem(itemkey)
                zoteroReference.push(data.data)
            }
            //order Bib by last name
            function compare(a,b){
                if ( a.data.creators[0].lastName < b.data.creators[0].lastName ){return -1;}
                if ( a.data.creators[0].lastName > b.data.creators[0].lastName ){return 1;}
                return 0;
            }
            zoteroReference = zoteroReference.sort(compare)
            setJsonference(zoteroReference)
    
            let referenceKeyOrder= {}
            for (let i =0; i<zoteroReference.length;i++){referenceKeyOrder[zoteroReference[i].key]="["+(i+1)+"]"}
            setItemKeyOrder(referenceKeyOrder);
        }
    }

    useEffect(async()=>{
        await fetchContentType()
    },[])

    useEffect(async ()=>{
        await fetchCollectionType();
    },[collectionName])

    useEffect(async ()=>{
        await fetchReferenceData();
    },[collectionNumber,collectionName])

    const handleInsert = ()=>{insertReference(editorRef)}
    const insertReference = (editor) => {
        let referenceContent=`<span><button class='reference-tag' onClick={props.toggleBottom}>Reference<sup>${itemKeyOrder[selectRadio]}</sup></button></span>`
        editor.current.insertContent(referenceContent)
        setTimeout(() => editor.current.focus(), 0);
      };

    if (isLoading) return <LoadingIndicatorPage />

    return(
        <>
            <Grid>
                <GridItem padding={1} col={6} s={12}>
                    {contentType.length === 0 ? (<></>):(
                        <Select 
                            id="collection-type" 
                            aria-label="collection-types" 
                            hint="Select collection types to seach references" 
                            onClear={() => {
                                setCollectionName('')
                                setCollectionType([])
                                setCollectionNumber('')
                                setJsonference([])
                                }
                            }
                            value={collectionName} 
                            onChange={setCollectionName} 
                            disabled={disabled}
                            >
                            {contentType.map((o)=>{return(<Option key={o} value={o}>{o}</Option>);})}
                        </Select>
                    )}
                </GridItem>
                <GridItem padding={1} col={6} s={12}>
                    <Stack>
                        {collectionType.length === 0 ? (<></>):(
                            <Select 
                                id="reference" 
                                aria-label="Select Reference" 
                                hint="Select collection ID" 
                                onClear={() => {
                                    setCollectionNumber('')
                                    setJsonference([])
                                }} 
                                value={collectionNumber} 
                                onChange={setCollectionNumber} 
                                disabled={disabled}
                            >
                                {collectionType.map((o)=>{return(<Option key={o.id} value={o.id.toString()}>{o.name}</Option>);})}
                            </Select>
                        )}
                    </Stack>
                </GridItem>
            </Grid>
            <Stack>
                {jsonReference.length === 0 ?(<></>):(
                    <>
                    <Stack>
                        <Typography variant="beta" id="trophy-champions">Select Reference</Typography>
                        <RadioGroup labelledBy="trophy-champions" onChange={e => setSelectRadio(e.target.value)} value={selectRadio} name="meal">
                            {jsonReference.map((o)=>{return(<Radio key={o.key} value={o.key}>{o.data.title}</Radio> );})}
                        </RadioGroup>
                    </Stack>
                    <Stack horizontal spacing={3}>
                        <Button size="S" onClick={()=>{handleInsert()}}>
                            Inster into Editor
                        </Button>
                    </Stack>
                    </>
                )}
            </Stack>
        </>
    )
}

Reference.defaultProps={
    disabled: true,
    value: '',
}
Reference.propTypes={
    disabled: PropTypes.bool,
    editorRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,

}
export default Reference