import React, { MouseEventHandler } from 'react';

interface Props {
    title: string;
    handleClick: MouseEventHandler;
};

const SortingButton = (props: Props) => {
    return (
        <button name={props.title} onClick={props.handleClick}>{props.title}</button>
    )
};

export default SortingButton;