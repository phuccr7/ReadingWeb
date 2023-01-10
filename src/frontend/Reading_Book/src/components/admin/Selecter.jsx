import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AnimatedMulti(props) {
    return (
        <Select
            closeMenuOnSelect={false}
            className="react-select-container"
            classNamePrefix="react-select"
            components={animatedComponents}
            defaultValue={props.default}
            isMulti
            options={props.list}
        />
    );
}
