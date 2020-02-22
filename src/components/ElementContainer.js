import React from 'react';


export const ContainerName = 'dragula-container';

export const ContainerHints = 'drag-hints';

const DragContainer = (props) => {
    return <div className={ContainerName}>{props.children}</div>
}

DragContainer.NoDragElement = (props) => {
    return <>
        {React.Children.map(props.children, (child) => {
            return React.cloneElement(child, { className: (child.props.className || '') + ' ' + ContainerHints });
        })}
    </>;
}


export default DragContainer;