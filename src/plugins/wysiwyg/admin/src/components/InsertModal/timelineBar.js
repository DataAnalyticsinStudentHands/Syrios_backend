import React, { useState, useEffect } from "react";

import {
    Flex, 
    SingleSelect,
    SingleSelectOption
} from "@strapi/design-system";

export const TimelineSelector = ({setValue}) => {

    const [timeline, setTimeline] = useState("");

    const timelineYear = [
        -450, -400, -350, -300, -250, -200, -150, -100, -50, 0, 50, 100, 150, 200,
        250, 300, 350, 400, 450, 500,
      ];

    useEffect(() => {
        if(timeline){
            setValue({
                text: timeline,
                url: `https://syrios.uh.edu/Evidence/Timeline#${timeline}`
            });
        }
    }, [timeline]);


    return(
        <Flex direction="column" alignItems="stretch" gap={11}>
            <SingleSelect
                label="Timeline"
                onClear={() => {
                    setTimeline("");
                }}
                value={timeline}
                onChange={(e) => {
                    setTimeline(e);
                    // setValue((pre) => {
                    //     return {...pre, timeline: e};
                    // });
                }}
                hint="Only use for Timeline"
            >
                {timelineYear.map((year) => {
                    if (year < 0) {
                        return (
                            <SingleSelectOption
                                key={year}
                                value={`${Math.abs(year)}BCE`}
                            >{`${Math.abs(year)} BCE`}</SingleSelectOption>
                        );
                    } else {
                        return (
                            <SingleSelectOption
                                key={year}
                                value={`${year}CE`}
                            >{`${year} CE`}</SingleSelectOption>
                        );
                    }
                })}
            </SingleSelect>


        </Flex>
    )
}