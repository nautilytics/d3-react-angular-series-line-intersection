import React from 'react';
import {extent, max, min, range} from 'd3-array';
import {scaleLinear, scaleTime} from 'd3-scale';
import moment from 'moment';
import Axes from "./Axes";
import LineChart from "./LineChart";

const Visualization = () => {

    // Set up some constant variables for the visualization
    const width = 960;
    const height = 500;
    const margin = {
        left: 80,
        right: 80,
        bottom: 20,
        top: 20
    };
    const data = [
        {y: 0, x: "2020-02-03T05:00:00.000Z"},
        {y: 3800, x: "2020-02-04T05:00:00.000Z"},
        {y: 4300, x: "2020-02-05T05:00:00.000Z"},
        {y: 6300, x: "2020-02-06T05:00:00.000Z"},
        {y: 9100, x: "2020-02-07T05:00:00.000Z"},
        {y: 10300, x: "2020-02-08T05:00:00.000Z"},
        {y: 11000, x: "2020-02-09T05:00:00.000Z"},
        {y: 12100, x: "2020-02-10T05:00:00.000Z"},
        {y: 13500, x: "2020-02-11T05:00:00.000Z"},
        {y: 14600, x: "2020-02-12T05:00:00.000Z"},
        {y: 16900, x: "2020-02-13T05:00:00.000Z"},
        {y: 18100, x: "2020-02-14T05:00:00.000Z"},
        {y: 19300, x: "2020-02-15T05:00:00.000Z"},
        {y: 20400, x: "2020-02-16T05:00:00.000Z"},
        {y: 24321.93, x: "2020-02-17T05:00:00.000Z"},
        {y: 29121.93, x: "2020-02-18T05:00:00.000Z"},
        {y: 29721.93, x: "2020-02-19T05:00:00.000Z"},
        {y: 30721.93, x: "2020-02-20T05:00:00.000Z"},
        {y: 31421.93, x: "2020-02-21T05:00:00.000Z"},
        {y: 32621.93, x: "2020-02-22T05:00:00.000Z"},
        {y: 33721.93, x: "2020-02-23T05:00:00.000Z"},
        {y: 35221.93, x: "2020-02-24T05:00:00.000Z"},
        {y: 35921.93, x: "2020-02-25T05:00:00.000Z"},
        {y: 36921.93, x: "2020-02-26T05:00:00.000Z"}
    ].map(d => ({...d, x: moment(d.x)}));
    const markers = range(12).map((d, i) => {
        return {
            x: moment(min(data, d => d.x)).add(d * 2, 'days'),
            id: `marker-${i}`
        };
    });

    // Retrieve the inner height and width for which we will be drawing on
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    // Set up an x- and y-scale
    const xScale = scaleTime()
        .range([0, innerWidth])
        .domain(extent(data, d => d.x));
    const yScale = scaleLinear()
        .range([innerHeight, 0])
        .domain([0, max(data, d => d.y)]);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <LineChart data={data} markers={markers} xScale={xScale} yScale={yScale}/>
                <Axes height={innerHeight} xScale={xScale} yScale={yScale}/>
            </g>
        </svg>
    )
};
export default Visualization;
