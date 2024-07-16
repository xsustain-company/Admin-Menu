import React from 'react';

//constants
import { LAYOUT_MODE_TYPES } from "../../Components/constants/layout";

interface LightDarkProps {
    layoutMode : string;
    onChangeLayoutMode: (mode: string) => void;
}
const LightDark = ({ layoutMode, onChangeLayoutMode } : LightDarkProps) => {

    const mode = layoutMode === LAYOUT_MODE_TYPES['DARKMODE'] ? LAYOUT_MODE_TYPES['LIGHTMODE'] : LAYOUT_MODE_TYPES['DARKMODE'];

    return (
        <div className="ms-1 header-item d-none d-sm-flex">
            <button
                onClick={() => onChangeLayoutMode(mode)}
                type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">
                <i className='bx bx-moon fs-22'></i>
            </button>
        </div>
    );
};

export default LightDark;