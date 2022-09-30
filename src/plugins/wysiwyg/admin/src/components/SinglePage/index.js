import React, { useState } from 'react';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';

import { Select, Option } from '@strapi/design-system/Select';
const SinglePage = ({
    disabled,
    editorRef,
    name,
    onChange,
})=>{
    const [value, setValue] = useState('');

    const handleInsert = ()=>{insertReference(editorRef)}
    const insertReference = (editor) => {
        let content=`<a href="${value}" >${value.split('/')[2]}</a>`
        editor.current.insertContent(content)
        setTimeout(() => editor.current.focus(), 0);
        setValue('')
      };
    return(
        <>
            <Stack spacing={3} padding={3}>
                    <Select 
                        id="OtherLinks" 
                        placeholder="Other Links" 
                        onClear={() => setValue('')} 
                        clearLabel="Clear the link" 
                        value={value} 
                        onChange={setValue}>
                        
                        <Option value={`/Toolbox/VideoLibrary`}>Video Page</Option>
                        <Option value={`/Evidence/Download`}>Download</Option>
                        <Option value={`/Evidence/MapCoins`}>Map Coins</Option>
                        <Option value={`/Evidence/CoinSort`}>Coin Pile</Option>

                    </Select>
                    {value.length === 0 ? (<></>):(<Button size="S" onClick={()=>{handleInsert()}}>Instert</Button>)}

            </Stack>
        </>
    )
}

// Timeline.defaultProps={
//     disabled: true,
//     value: '',
// }
// Timeline.propTypes={
//     disabled: PropTypes.bool,
//     editorRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
//     name: PropTypes.string.isRequired,
//     value: PropTypes.string,
// }
export default SinglePage