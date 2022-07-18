import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { Radio, RadioGroup } from '@strapi/design-system/Radio';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import wysiwygRequests from '../../api/wysiwug';

import { Select, Option } from '@strapi/design-system/Select';
import { Grid, GridItem } from '@strapi/design-system/Grid';
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
        let referenceContent=`<a href="/dev/Toolbox/Glossary/term/${value}" class='story-icon'>${value} &#xe817;</a>`
        editor.current.insertContent(referenceContent)
        setTimeout(() => editor.current.focus(), 0);
        setValue("")
      };
    
    async function fetchGlossary(){
        const result = await wysiwygRequests.findCollectionTypes('glossary')
        console.log(result.results)
        setGlossaryData(result.results)
    }


    return(
        <>
            <Stack horizontal spacing={3} padding={3}>
                <Button variant='secondary' onClick={()=>{fetchGlossary()}}>Glossary</Button>
                {value.length === 0 ? (<></>):(<Button size="S" onClick={()=>{handleInsert()}}>Inster into Editor</Button>)}
            </Stack>
            
            {glossaryData.length === 0 ? (<></>):(
                <Select id="select1"
                    placeholder="Select Glossary term"
                    onClear={() => setValue("")} clearLabel="Clear the meal" 
                    // error={error} 
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