import React, {useEffect, useRef} from 'react';
import {select} from 'd3-selection';
import {axisBottom, axisLeft} from "d3-axis";
import {format} from 'd3-format';

const Axes = ({xScale, yScale, height}) => {
    const xAxisRef = useRef(null);
    const yAxisRef = useRef(null);

    useEffect(() => {
        renderAxes();
    });

    const renderAxes = () => {
        renderXAxis();
        renderYAxis();
    };

    const renderXAxis = () => {
        const xAxis = select(xAxisRef.current);
        xAxis.call(axisBottom(xScale));
    };

    const renderYAxis = () => {
        const yAxis = select(yAxisRef.current);

        yAxis.call(
            axisLeft(yScale)
                .tickFormat(format('$,.0f')),
        );

        yAxis.select('.domain').remove();
        yAxis.selectAll('.tick line').remove();
    };

    return (
        <g className="axes">
            <g className="x axis" ref={xAxisRef} transform={`translate(0,${height})`}/>
            <g ref={yAxisRef}/>
        </g>
    );
};
export default Axes;
