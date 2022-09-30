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
    const [value, setValue] = useState([]);
    const [glossaryData, setGlossaryData] = useState([])

    const handleInsert = ()=>{insertReference(editorRef)}
    const insertReference = (editor) => {
        let referenceContent= undefined
        value.definition == null 
        ?referenceContent=`<a href="/Toolbox/Glossary/term/${value.term}" class="glossary-tag" >${value.term}<sup class='story-icon'> &#xe817;</sup></a>`
        :referenceContent=`<a href="/Toolbox/Glossary/term/${value.term}" class="glossary-tag" data-title="${/\s/.test(value.definition) ? value.definition.replace(/<[^>]+>/g, '').split("\n")[0] : value.definition.split("\n")[0]}">${value.term}<sup class='story-icon'> &#xe817;</sup></a>`
        editor.current.insertContent(referenceContent)
        setTimeout(() => editor.current.focus(), 0);
        setValue([])
        setGlossaryData([])
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
            <Stack spacing={3} padding={3}>
                <Button variant='secondary' onClick={()=>{fetchGlossary()}}>Glossary</Button>
                {glossaryData.length === 0 ? (<></>):(
                    <Select 
                        id="GlossarySelect"
                        placeholder="Select Glossary term"
                        onClear={() => setGlossaryData([])}
                        clearLabel="Clear the Glossary term" 
                        value={value} 
                        onChange={setValue}>
                        {glossaryData.map((term)=>{return <Option value={term} key={term.id}>{term.term}</Option>})}
                    </Select>
                )}
                {value.length === 0 ? (<></>):(<Button size="S" onClick={()=>{handleInsert()}}>Instert</Button>)}
            </Stack>
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