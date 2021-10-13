import React from 'react';

interface Props {
    title: string;
    handleClick: Function;
};

const SortingButton = (props: Props) => {
    return (
        <button name={props.title} onClick={() => props.handleClick}></button>
    )
};

export default SortingButton;