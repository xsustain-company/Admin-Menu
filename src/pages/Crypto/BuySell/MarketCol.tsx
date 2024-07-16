import React from 'react';

const Price = (cell:any) => {
    return (
        <React.Fragment>
            {cell.getValue()}
        </React.Fragment>
    );
};

const Pairs = (cell:any) => {
    return (
        <React.Fragment>
            {cell.getValue()}
        </React.Fragment>
    );
};

const HighPrice = (cell:any) => {
    return (
        <React.Fragment>
            {cell.getValue()}
        </React.Fragment>
    );
};

const LowPrice = (cell:any) => {
    return (
        <React.Fragment>
            {cell.getValue()}
        </React.Fragment>
    );
};

const MarketVolume = (cell:any) => {
    return (
        <React.Fragment>
            {cell.getValue()}
        </React.Fragment>
    );
};

export { Price, Pairs, HighPrice, LowPrice, MarketVolume };