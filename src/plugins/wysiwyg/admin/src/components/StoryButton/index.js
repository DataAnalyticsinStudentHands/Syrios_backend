import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';
import wysiwygRequests from '../../api/wysiwug';

import { Select, Option } from '@strapi/design-system/Select';
const Story = ({
    disabled,
    editorRef,
    name,
    onChange,
})=>{
    const [storyData, setStoryData] = useState([])
    const [storyID, setStoryID] = useState('');
    const [story, setStory] = useState([])
    const [slideID, setSlideID] = useState('')

    const handleInsert = ()=>{insertReference(editorRef)}
    const insertReference = (editor) => {
        let referenceContent = undefined
        slideID === 1 
        ? referenceContent=`
        <a href="/StoryReader?id=${storyID}">
            ${story.name}-slides-${slideID}
        </a>`
        : referenceContent=`
        <a href="/StoryReader?id=${storyID}#${story.name.replace(/\s/g, '')}-slides-${slideID}">
            ${story.name}-slides-${slideID}
        </a>`

        editor.current.insertContent(referenceContent)
        setTimeout(() => editor.current.focus(), 0);
        setStoryData([])
        setStory([])
        slideID('')
      };

    async function fetchStory(){
        let result = await wysiwygRequests.findCollectionTypes('story')
        setStoryData(result.results)
    }


    useEffect(()=>{
        storyData.map((i)=>{
            if(i.id === storyID){
                console.log(i.zone)
                setStory(i.zone) 
            }
        })
    },[storyID])
    return(
        <>
            <Stack spacing={3} padding={3}>
                <Button variant='secondary' onClick={()=>{fetchStory()}}>Story</Button>
            {storyData.length === 0 ? (<></>):(
                <Select id="selectStoryID"
                    placeholder="Select Story name"
                    onClear={() => setStoryID("")}
                    value={storyID} 
                    onChange={setStoryID}>
                    {storyData.map((i)=>{
                        return(
                            <Option value={i.id} key={'story_'+i.id}>{i.name}</Option>
                        )
                    })}
                </Select>
            )}
            {/* There is warning about the second select box, but it fine to use  */}
            {story.length === 0 ? (<></>):(
                <Select id="selectStoryFrame"
                    placeholder="Select Story Frame"
                    onClear={() => setSlideID("")}
                    value={slideID} 
                    onChange={setSlideID}>
                    {story.map((s, index)=>{
                        return(
                            <Option key={'slide_'+index+1} value={index+1}>{index+1}:{s.__component}</Option>
                        )
                    })}
                </Select>
            )}
            {story.length === 0 ? (<></>):(<Stack horizontal spacing={6} justifyContent="center"><Button size="S" onClick={()=>{handleInsert()}}>Instert</Button></Stack>)}

            </Stack>

        </>
    )
}

Story.defaultProps={
    disabled: true,
    value: '',
}
Story.propTypes={
    disabled: PropTypes.bool,
    editorRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
}
export default Story