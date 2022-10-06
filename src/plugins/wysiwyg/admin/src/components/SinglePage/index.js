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
        let content = undefined
        switch(value){
            case 'coinmap':
                content=`<a href="/Evidence/MapCoins" class="icon-entypo-map">${value}</a>`;
                break;
            case 'coinpile':
                content=`<a href="/Evidence/CoinSort" class='icon-syrios-coin-hand'>${value}</a>`;
                break;
            case 'download':
                content=`<a href="/Evidence/Download" class='icon-entypo-donwload'>${value}</a>`;
                break;
            case 'external':
                content=`<a href="/" class='icon-entypo-link-external' target="_blank" rel="noopener noreferrer">${value}</a>`;
                break;        
            case 'numisma':
                content=`<a href="/" class='icon-syrios-numisma-reverse' target="_blank" rel="noopener noreferrer">${value}</a>`;
                break;
            case 'video':
                content=`<a href="/Toolbox/VideoLibrary" class='icon-entypo-media-play'>${value}</a>`;
                break;
            default:
                console.log('Hello!')
        }
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
                        <Option value={`coinmap`}>Map Coins</Option>
                        <Option value={`coinpile`}>Coin Pile</Option>
                        <Option value={`download`}>Download</Option>
                        <Option value={`external`}>External Link</Option>
                        <Option value={`numisma`}>Numisma</Option>
                        <Option value={`video`}>Video Page</Option>
                    </Select>
                    {value.length === 0 ? (<></>):(<Button size="S" onClick={()=>{handleInsert()}}>Insert</Button>)}

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