import React from 'react';

const Quantity = (cell:any) => {
    return (
        <React.Fragment>
            {cell.getValue()}
        </React.Fragment>
    );
};

const AvgPrice = (cell:any) => {
    return (
        <React.Fragment>
            {cell.getValue()}
        </React.Fragment>
    );
};

const CurrentValue = (cell:any) => {
    return (
        <React.Fragment>
            {cell.getValue()}
        </React.Fragment>
    );
};

const Returns = (cell:any) => {
    return (
        <React.Fragment>
            {cell.getValue()}
        </React.Fragment>
    );
};

export { Quantity, AvgPrice, CurrentValue, Returns }; 