import React, { useState, useEffect } from "react";
import {
    Flex, 
    SingleSelect,
    SingleSelectOption
} from "@strapi/design-system";

export const OtherSelector = ({setValue}) => {
    const [other, setOther] = useState("");
    useEffect(() => {
        if(other){
            setValue({
                text: other,
                url: otherObj[other],
            });
        }
    }, [other]);

    const otherObj = {
        "Coins on a Map": "https://syrios.uh.edu/Evidence/MapCoins",
        "Download Data":"https://syrios.uh.edu/Evidence/Download",
        "Video Library":"https://syrios.uh.edu/Toolbox/VideoLibrary",
    }
    return(
        <Flex direction="column" alignItems="stretch" gap={11}>
            <SingleSelect
                label="Other"
                onClear={() => {
                    setOther("");
                }}
                value={other}
                onChange={(e) => {
                    setOther(e);
                }}
                hint="Only use for Other"
            >
                {Object.keys(otherObj).map((key) => {
                    return (
                        <SingleSelectOption
                            key={key}
                            value={key}
                        >{key}</SingleSelectOption>
                    );
                })}
            </SingleSelect>
        </Flex>
    )
}