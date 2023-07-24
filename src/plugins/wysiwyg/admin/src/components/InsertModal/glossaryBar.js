import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  SingleSelect,
  SingleSelectOption,
} from "@strapi/design-system";

import axios from "axios";
import qs from "qs";
export const GlossarySarchBar = ({setValue, value}) => {
    const [data, setData] = useState([]);
    const [glossary, setGlossary] = useState("");

    useEffect(() => {
        if(glossary){   

            const bulletRegex = /<ul>([\s\S]*?)<\/ul>/;
            const bulletContent = data[glossary].match(bulletRegex)[1];
            const bulletList = bulletContent
            .split('</li>')
            .filter(item => item.trim().length > 0)
            .map(item => {
                const liContent = item.replace(/<[^>]+>/g, '').trim();
                return `• ${liContent}`;
            })
            .join('\n');
            const dataTitle = bulletList

            setValue({
                text: glossary,
                url: `https://syrios.uh.edu/dev/Toolbox/Glossary/term/${glossary}`,
                title:dataTitle,
            })
        }
    }, [glossary]);

    useEffect(() => {
        const query = qs.stringify({
            fields: ["term", "definition", "id"],
        })
        axios.get(`${process.env.STRAPI_ADMIN_BACKEND_URL}/api/glossaries?${query}`)
        .then(res => {
            let obj = {}
            res.data.data.forEach((item) => {
                obj[item.attributes.term] = item.attributes.definition;
            })
            setData(obj);
        })
        .catch(err => {
            console.log(err);
        })
    },[])
    return (
    <Flex direction="column" alignItems="stretch" gap={11}>
      <SingleSelect
        label="Glossary"
        onClear={() => {
            setGlossary(undefined);
          }} 
          value={glossary} 
          onChange={(v)=>{
            setGlossary(v);
          }}
          hint="Only use for inserting glossary terms."
        
      >
        {

            Object.keys(data).sort().map((key) => {
                return(
                    <SingleSelectOption key={key} value={key}>{key}</SingleSelectOption>
                )
            })
        }
      </SingleSelect>
    </Flex>
  );
};
