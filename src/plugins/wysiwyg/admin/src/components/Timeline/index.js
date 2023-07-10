import React, { useState } from 'react';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';

import { Select, Option } from '@strapi/design-system/Select';
const Timeline = ({
    disabled,
    editorRef,
    name,
    onChange,
})=>{
    const [value, setValue] = useState('');

    const handleInsert = ()=>{insertReference(editorRef)}
    const insertReference = (editor) => {
        let content=`<a href="/Evidence/Timeline#${value}" class="icon-syrios-coin-timeline">${value}</a>`
        editor.current.insertContent(content)
        setTimeout(() => editor.current.focus(), 0);
        setValue('')
      };
    const timelineYear = [-450, -400, -350, -300, -250, -200, -150, -100, -50, 0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
    return(
        <>
            <Stack>
                    <Select 
                        id="TimelineSelect" 
                        placeholder="Timeline" 
                        onClear={() => setValue('')} 
                        clearLabel="Clear the year" 
                        value={value} 
                        onChange={setValue}>
                            {timelineYear.map((year)=>{
                                if (year<0){return <Option key={year} value={`${Math.abs(year)}BCE`}>{`${Math.abs(year)} BCE`}</Option>}
                                else{return <Option key={year} value={`${Math.abs(year)}CE`}>{`${Math.abs(year)} CE`}</Option>}
                            })}
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
export default Timeline