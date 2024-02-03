import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const SymmetricTimeline = ({ items, content, oppositeContent }) => {

    // TODO: Problem with this material ui component, it is a lab feature
    // TODO: I've got this fast solution but it would be nice to remove it
    const workaroundFix = () => (
        <TimelineItem style={{ visibility: 'hidden' }}>
            <TimelineOppositeContent color="text.secondary">
                Workaround
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Workaround</TimelineContent>
        </TimelineItem>
    )

    return (
        <Timeline position="alternate">
            {workaroundFix()}
            {items.map((item, index) => (
                    <TimelineItem key={`timeline-item-${index}`}>
                        <TimelineOppositeContent color="text.secondary">
                            {oppositeContent(item)}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>{content(item)}</TimelineContent>
                    </TimelineItem>
                )
            )}
        </Timeline>
    );
}

export default SymmetricTimeline;