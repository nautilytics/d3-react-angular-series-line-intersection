import React, {useEffect, useRef} from 'react';
import {select} from "d3-selection";
import 'd3-transition';
import {DURATION} from "../../../../constant";

const Marker = ({item}) => {
    const markerRef = useRef(null);

    useEffect(() => {
        select(markerRef.current)
            .transition()
            .duration(DURATION)
            .attr("cy", item.y);
    });

    return (
        <circle className="marker" ref={markerRef} r={10} cx={item.x} cy={item.startingY}/>
    )
};
export default Marker;
