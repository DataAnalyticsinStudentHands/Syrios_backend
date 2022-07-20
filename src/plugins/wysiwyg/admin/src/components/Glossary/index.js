import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';
import wysiwygRequests from '../../api/wysiwug';

import { Select, Option } from '@strapi/design-system/Select';
const Glossary = ({
    disabled,
    editorRef,
    name,
    onChange,
})=>{
    const [value, setValue] = useState("");
    const [glossaryData, setGlossaryData] = useState([])

    const handleInsert = ()=>{insertReference(editorRef)}
    const insertReference = (editor) => {
        let referenceContent=`<a href="/Toolbox/Glossary/term/${value}" class="glossary-tag">${value}<sup class='story-icon'> &#xe817;</sup></a>`
        editor.current.insertContent(referenceContent)
        setTimeout(() => editor.current.focus(), 0);
        setValue("")
      };

    async function fetchGlossary(){
        let result = await wysiwygRequests.findCollectionTypes('glossary')
        function compare(a,b){
            if ( a.term < b.term  ){return -1;}
            if ( a.term  > b.term  ){return 1;}
            return 0;}
        result = result.results.sort(compare)
        setGlossaryData(result)
    }

    return(
        <>
            <Stack horizontal spacing={3} padding={3}>
                <Button variant='secondary' onClick={()=>{fetchGlossary()}}>Glossary</Button>
                {value.length === 0 ? (<></>):(<Button size="S" onClick={()=>{handleInsert()}}>Instert</Button>)}
            </Stack>
            
            {glossaryData.length === 0 ? (<></>):(
                <Select id="select1"
                    placeholder="Select Glossary term"
                    onClear={() => setValue("")}
                    value={value} 
                    onChange={setValue}>
                    {glossaryData.map((term)=>{return(<Option value={term.term} key={term.id}>{term.term}</Option>)})}
                </Select>
            )}
        </>
    )
}

Glossary.defaultProps={
    disabled: true,
    value: '',
}
Glossary.propTypes={
    disabled: PropTypes.bool,
    editorRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
}
export default Glossary