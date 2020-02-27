import React from 'react';
import {Intersection, Point2D, ShapeInfo} from "kld-intersections";
import {line as d3_line} from "d3-shape";
import Marker from "./Marker";

const LineChart = ({data, markers, xScale, yScale}) => {

    // Create a SVG path representing the line
    const line = d3_line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));
    const linePath = ShapeInfo.path(line(data) || "M0 0 Z");

    // Find y intersection points for each item
    markers = markers.map(d => {

        // Create a straight line from top to bottom at the x position
        const x = xScale(d.x);
        const yAxisLine = ShapeInfo.line(
            new Point2D(x, yScale.range()[0]),
            new Point2D(x, yScale.range()[1])
        );
        const intersections = Intersection.intersect(linePath, yAxisLine);

        // Place the point at the intersection point (or the y-axis mid-point if no intersection is found)
        return {
            ...d,
            x: xScale(d.x),
            startingY: yScale.range()[0],
            y: intersections.points[0] ? intersections.points[0].y : yScale.range()[0] / 2,
        }
    });

    return (
        <g className="line-chart">
            <path className="line" d={line(data)}/>
            <line className="sample-line"
                  x1={markers[markers.length / 2].x}
                  x2={markers[markers.length / 2].x}
                  y1={yScale.range()[0]} y2={yScale.range()[1]}/>
            <circle className="sample-marker" cx={markers[markers.length / 2].x} cy={markers[markers.length / 2].y}
                    r={10}/>
            {/*{*/}
            {/*    markers.map(marker => {*/}
            {/*        return (*/}
            {/*            <Marker key={`marker-for-${marker.id}`} item={marker}/>*/}
            {/*        )*/}
            {/*    })*/}
            {/*}*/}
        </g>
    )
};
export default LineChart;
