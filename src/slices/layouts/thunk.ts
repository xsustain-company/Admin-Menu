import { changeHTMLAttribute } from './utils';
import {
    changeLayoutAction,
    changeLayoutModeAction,
    changeSidebarThemeAction,
    changeLayoutWidthAction,
    changeLayoutPositionAction,
    changeTopbarThemeAction,
    changeLeftsidebarSizeTypeAction,
    changeLeftsidebarViewTypeAction,
    changeSidebarImageTypeAction,
    changePreLoaderAction,
    changeSidebarVisibilityAction
} from './reducer';

/**
 * Changes the layout type
 * @param {*} param0
 */
export const changeLayout = (layout:any) => async (dispatch:any) => {
    try {
        if (layout === "twocolumn") {
            document.documentElement.removeAttribute("data-layout-width");
        } else if (layout === "horizontal") {
            document.documentElement.removeAttribute("data-sidebar-size");
        } else if (layout === "semibox") {
            changeHTMLAttribute("data-layout-width", "fluid");
            changeHTMLAttribute("data-layout-style", "default");
        }
        changeHTMLAttribute("data-layout", layout);
        dispatch(changeLayoutAction(layout));
    } catch (error) { }
};

/**
 * Changes the layout mode
 * @param {*} param0
 */
export const changeLayoutMode = (layoutMode:any) => async (dispatch:any) => {
    try {
        changeHTMLAttribute("data-bs-theme", layoutMode);
        dispatch(changeLayoutModeAction(layoutMode));
    } catch (error) { }
};

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
export const changeSidebarTheme = (theme:any) => async (dispatch:any) => {
    try {
        changeHTMLAttribute("data-sidebar", theme);
        dispatch(changeSidebarThemeAction(theme));
    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the layout width
 * @param {*} param0
 */
export const changeLayoutWidth = (layoutWidth:any) => async (dispatch:any) => {
    try {
        if (layoutWidth === 'lg') {
            changeHTMLAttribute("data-layout-width", "fluid");
        } else {
            changeHTMLAttribute("data-layout-width", "boxed");
        }
        dispatch(changeLayoutWidthAction(layoutWidth));
    } catch (error) {
        return error;
    }
};

/**
 * Changes the layout position
 * @param {*} param0
 */
export const changeLayoutPosition = (layoutposition:any) => async (dispatch:any) => {
    try {
        changeHTMLAttribute("data-layout-position", layoutposition);
        dispatch(changeLayoutPositionAction(layoutposition));
    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the topbar themes
 * @param {*} param0
 */
export const changeTopbarTheme = (topbarTheme:any) => async (dispatch:any) => {
    try {
        changeHTMLAttribute("data-topbar", topbarTheme);
        dispatch(changeTopbarThemeAction(topbarTheme));

    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the topbar themes
 * @param {*} param0
 */
export const changeSidebarImageType = (leftsidebarImagetype:any) => async (dispatch:any) => {
    try {
        changeHTMLAttribute("data-sidebar-image", leftsidebarImagetype);
        dispatch(changeSidebarImageTypeAction(leftsidebarImagetype));
    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the Preloader
 * @param {*} param0
 */
export const changePreLoader = (preloaderTypes:any) => async (dispatch:any) => {
    try {
        changeHTMLAttribute("data-preloader", preloaderTypes);
        dispatch(changePreLoaderAction(preloaderTypes));
    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the topbar themes
 * @param {*} param0
 */
export const changeLeftsidebarSizeType = (leftsidebarSizetype:any) => async (dispatch:any) => {
    try {
        switch (leftsidebarSizetype) {
            case 'lg':
                changeHTMLAttribute("data-sidebar-size", "lg");
                break;
            case 'md':
                changeHTMLAttribute("data-sidebar-size", "md");
                break;
            case "sm":
                changeHTMLAttribute("data-sidebar-size", "sm");
                break;
            case "sm-hover":
                changeHTMLAttribute("data-sidebar-size", "sm-hover");
                break;
            default:
                changeHTMLAttribute("data-sidebar-size", "lg");
        }
        dispatch(changeLeftsidebarSizeTypeAction(leftsidebarSizetype));

    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the topbar themes
 * @param {*} param0
 */
export const changeLeftsidebarViewType = (leftsidebarViewtype:any) => async (dispatch:any) => {
    try {
        changeHTMLAttribute("data-layout-style", leftsidebarViewtype);
        dispatch(changeLeftsidebarViewTypeAction(leftsidebarViewtype));
    } catch (error) {
        // console.log(error);
    }
};

/**
 * Changes the sidebar visibility
 * @param {*} param0
 */
export const changeSidebarVisibility = (sidebarVisibilitytype:any) => async (dispatch:any) => {
    try {
        changeHTMLAttribute("data-sidebar-visibility", sidebarVisibilitytype);
        dispatch(changeSidebarVisibilityAction(sidebarVisibilitytype));
    } catch (error) { }
};