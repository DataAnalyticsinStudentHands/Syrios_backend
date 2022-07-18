import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@strapi/design-system/Stack';
import { Radio, RadioGroup } from '@strapi/design-system/Radio';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import wysiwygRequests from '../../api/wysiwug';

const Reference = ({
    disabled,
    editorRef,
    name,
    onChange,
})=>{
    const [jsonReference, setJsonference] = useState([]);
    const [itemKeyOrder, setItemKeyOrder] = useState([]);
    const [selectRadio, setSelectRadio] = useState('')

    async function fetchReferenceData(url){

        let referenceData = []
        if(url.split("/api::")[0] === '/singleType'){referenceData = await wysiwygRequests.fetchSingleData(url.split("/api::")[1])}
        else if(url.split("/api::")[0] === '/collectionType'){referenceData = await wysiwygRequests.fetchCollectData(url.split("/api::")[1])}

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

    const handleInsert = ()=>{insertReference(editorRef)}
    const insertReference = (editor) => {
        let referenceContent=`
            <button class='reference-tag'>
                <sup>${itemKeyOrder[selectRadio]}</sup>
            </button>
        `
        editor.current.insertContent(referenceContent)
        setTimeout(() => editor.current.focus(), 0);
        setSelectRadio("")
      };

    return(
        <>
            <Stack horizontal spacing={3} padding={3}>
                <Button variant='secondary' onClick={(e)=>{fetchReferenceData(e.target.formAction.split('/admin/content-manager')[1])}}>Reference</Button>
                { selectRadio.length === 0 ?(<></>):(<Stack horizontal spacing={3} justifyContent="center"><Button size="S" onClick={()=>{handleInsert()}}>Insert</Button></Stack>)}
            </Stack>

            {jsonReference.length === 0 ?(<></>):(
                // <Box background="neutral0" hasRadius={true} shadow="filterShadow">
                    <Stack padding={3} spacing={3}>
                        <RadioGroup labelledBy="trophy-champions" onChange={e => setSelectRadio(e.target.value)} value={selectRadio} name="meal">
                            {jsonReference.map((o)=>{
                                return(<Radio key={o.key} value={o.key}>{o.data.creators[0].lastName} - {o.data.title}</Radio> );})}
                        </RadioGroup>
                    </Stack>
                // </Box>
            )}
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