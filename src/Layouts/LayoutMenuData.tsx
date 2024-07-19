import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isApps, setIsApps] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isPages, setIsPages] = useState<boolean>(false);
    const [isBaseUi, setIsBaseUi] = useState<boolean>(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState<boolean>(false);
    const [isForms, setIsForms] = useState<boolean>(false);
    const [isTables, setIsTables] = useState<boolean>(false);
    const [isCharts, setIsCharts] = useState<boolean>(false);
    const [isIcons, setIsIcons] = useState<boolean>(false);
    const [isMaps, setIsMaps] = useState<boolean>(false);
    const [isMultiLevel, setIsMultiLevel] = useState<boolean>(false);

    // Apps
    const [isCalendar, setCalendar] = useState<boolean>(false);
    const [isEmail, setEmail] = useState<boolean>(false);
    const [isSubEmail, setSubEmail] = useState<boolean>(false);
    const [isEcommerce, setIsEcommerce] = useState<boolean>(false);
    const [isProjects, setIsProjects] = useState<boolean>(false);
    const [isTasks, setIsTasks] = useState<boolean>(false);
    const [isCRM, setIsCRM] = useState<boolean>(false);
    const [isCRM1, setIsCRM1] = useState<boolean>(false);
    const [isProducts, setIsProducts] = useState<boolean>(false);
    const [isOrders, setIsOrders] = useState<boolean>(false);
    const [isCustomers, setIsCustomers] = useState<boolean>(false);
    
    const [isCrypto, setIsCrypto] = useState<boolean>(false);
    const [isInvoices, setIsInvoices] = useState<boolean>(false);
    const [isSupportTickets, setIsSupportTickets] = useState<boolean>(false);
    const [isNFTMarketplace, setIsNFTMarketplace] = useState<boolean>(false);
    const [isJobs, setIsJobs] = useState<boolean>(false);
    const [isJobList, setIsJobList] = useState<boolean>(false);
    const [isCandidateList, setIsCandidateList] = useState<boolean>(false);


    // Authentication
    const [isSignIn, setIsSignIn] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);
    const [isPasswordCreate, setIsPasswordCreate] = useState<boolean>(false);
    const [isLockScreen, setIsLockScreen] = useState<boolean>(false);
    const [isLogout, setIsLogout] = useState<boolean>(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
    const [isVerification, setIsVerification] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // Pages
    const [isProfile, setIsProfile] = useState<boolean>(false);
    const [isLanding, setIsLanding] = useState<boolean>(false);


    // Charts
    const [isApex, setIsApex] = useState<boolean>(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState<boolean>(false);
    const [isLevel2, setIsLevel2] = useState<boolean>(false);

    const [iscurrentState, setIscurrentState] = useState('Ecommerce');

    function updateIconSidebar(e : any) {
        if (e && e.target && e.target.getAttribute("sub-items")) {
            const ul : any = document.getElementById("two-column-menu");
            const iconItems : any = ul.querySelectorAll(".nav-icon.active") ;
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("sub-items");
                const getID = document.getElementById(id) as HTMLElement
                if (getID)
                    getID.classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState === 'Dashboard') {
            history("/dashboard");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'BaseUi') {
            setIsBaseUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
        if (iscurrentState !== 'Ecommerce') {
            setIsEcommerce(false);
        }
        
        if (iscurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (iscurrentState === 'Widgets') {
            history("/widgets");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState === 'Dashboard') {
            history("/dashboard");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState !== 'CRM1') {
            setIsCRM1(false);
        }
        if (iscurrentState !== 'Orders') {
            setIsOrders(false);
        }
        if (iscurrentState !== 'Products') {
            setIsProducts(false);
        }
        if (iscurrentState === 'Customers') {
            history("/apps-ecommerce-customers");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState === 'CRM') {
            history("/dashboard-crm");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState !== 'Landing') {
            setIsLanding(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isCRM1,
        isOrders,
        isProducts,
        isCustomers,
        isApps,
        isAuth,
        isPages,
        isBaseUi,
        isAdvanceUi,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps,
        isMultiLevel
    ]);

    const menuItems : any= [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "ri-pie-chart-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIscurrentState('Dashboard');
            }
        },
        {
            id: "Ecommerce",
            label: "Ecommerce",
            icon: "ri-eye-2-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsEcommerce(!isEcommerce);
                setIscurrentState('Ecommerce');
                updateIconSidebar(e);
            },
            stateVariables: isEcommerce,
            subItems : [
                { id: 1, label: "Shopping Cart", link: "/apps-ecommerce-cart", parentId: "Ecommerce" },
                { id: 2, label: "Checkout", link: "/apps-ecommerce-checkout", parentId: "Ecommerce" },
                { id: 3, label: "Sellers", link: "/apps-ecommerce-sellers", parentId: "Ecommerce" },
                { id: 4, label: "Seller Details", link: "/apps-ecommerce-seller-details", parentId: "Ecommerce" },
            ],
            
            
        },

        
        /*
        {
            id: "ecommerce1",
            label: "Ecommerce1",
            icon: "ri-shopping-cart-line",
            link: "/#",
           
            click: function (e: any) {
                e.preventDefault();
                setIsEcommerce1(!isEcommerce1);
                setIscurrentState('Ecommerce1');
                updateIconSidebar(e);
            },
            stateVariables: isEcommerce1,
            
            subItems: [
             
                    { id: 1, label: "Products", link: "/apps-ecommerce-products", parentId: "ecommerce1" },
                    { id: 2, label: "Product Details", link: "/apps-ecommerce-product-details", parentId: "ecommerce1" },
                    { id: 3, label: "Create Product", link: "/apps-ecommerce-add-product", parentId: "ecommerce1" },
                    { id: 4, label: "Orders", link: "/apps-ecommerce-orders", parentId: "ecommerce1" },
                    { id: 5, label: "Order Details", link: "/apps-ecommerce-order-details", parentId: "ecommerce1" },
                    { id: 6, label: "Customers", link: "/apps-ecommerce-customers", parentId: "ecommerce1" },
                    { id: 7, label: "Shopping Cart", link: "/apps-ecommerce-cart", parentId: "ecommerce1" },
                    { id: 8, label: "Checkout", link: "/apps-ecommerce-checkout", parentId: "ecommerce1" },
                    { id: 9, label: "Sellers", link: "/apps-ecommerce-sellers", parentId: "ecommerce1" },
                    { id: 10, label: "Seller Details", link: "/apps-ecommerce-seller-details", parentId: "ecommerce1" },
                
            ]
            
        },*/
        
        

        { id: "CRM", 
            label: "CRM",
            icon: "ri-bar-chart-2-line",
            link: "/dashboard-crm"  ,
            click: function (e : any) {
            e.preventDefault();
            setIscurrentState('CRM');
        }},
        {
            id: "CRM1",
            label: "CRM1",
            icon: "ri-line-chart-line",
            link: "/#",
            
            click: function (e : any) {
                e.preventDefault();
                setIsCRM1(!isCRM1);
                setIscurrentState('CRM1');
                updateIconSidebar(e);
            },
            stateVariables: isCRM1,
            subItems :[
                
                
                { id: 1, label: "Contacts", link: "/apps-crm-contacts" , parentId: "CRM1"},
                { id: 2, label: "Companies", link: "/apps-crm-companies" , parentId: "CRM1"},
                { id: 3, label: "Deals", link: "/apps-crm-deals" , parentId: "CRM1"},
                { id: 4, label: "Leads", link: "/apps-crm-leads" , parentId: "CRM1"},
                {
                    id: "calendar",
                    label: "Calendar",
                    link: "/#",
                    parentId: "CRM1",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setCalendar(!isCalendar);
                    },
                    stateVariables: isCalendar,
                    childItems: [
                        {
                            id: 1,
                            label: "Main Calendar",
                            link: "/apps-calendar",
                            parentId: "CRM1"
                        },
                        {
                            id: 2,
                            label: "Month Grid",
                            link: "/apps-calendar-month-grid",
                            parentId: "CRM1"
                        },
                    ]
                },
                
              
                
               
               
                
              
                {
                    id: "invoices",
                    label: "Invoices",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsInvoices(!isInvoices);
                    },
                    parentId: "apps",
                    stateVariables: isInvoices,
                    childItems: [
                        { id: 1, label: "List View", link: "/apps-invoices-list" },
                        { id: 2, label: "Details", link: "/apps-invoices-details" },
                        { id: 3, label: "Create Invoice", link: "/apps-invoices-create" },
                    ]
                },
            ]
        },        
        {
            //   /apps-ecommerce-products
            id: "Products",
            label: "Products",
            icon: "ri-product-hunt-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsProducts(!isProducts);
                setIscurrentState('Products');
                updateIconSidebar(e);
            },
            stateVariables: isProducts,
            subItems :[
                { id: 1, label: "Products List", link: "/apps-ecommerce-products" , parentId: "Products"},
                { id: 2, label: "Product Details", link: "/apps-ecommerce-product-details" , parentId: "Products"},
                { id: 3, label: "Create Product", link: "/apps-ecommerce-add-product" , parentId: "Products"},
                
            ]
        },     
        {
            //   /apps-ecommerce-orders
            id: "Orders",
            label: "Orders",
            icon: "ri-shopping-basket-2-line",
            link: "/apps-ecommerce-orders",
            click: function (e : any) {
                e.preventDefault();
                setIsOrders(!isOrders);
                setIscurrentState('Orders');
                updateIconSidebar(e);
            },
            stateVariables: isOrders,
            subItems :[
                { id: 1, label: "Orders List", link: "/apps-ecommerce-orders" , parentId: "Orders"},
                { id: 2, label: "Order Details", link: "/apps-ecommerce-order-details" , parentId: "Orders"},
            ]
        },     
        {
            id: "customers",
            label: "Customers",
            icon: "ri-team-line",
            link: "/apps-ecommerce-customers",
            click: function (e : any) {
                e.preventDefault();
                setIscurrentState('Customers');
            }
        },

        {
            id: "apps",
            label: "Apps",
            icon: "ri-apps-2-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsApps(!isApps);
                setIscurrentState('Apps');
                updateIconSidebar(e);
            },
            stateVariables: isApps,
            subItems: [
                {},
              
               
               
            ],
        },
      
        {
            label: "Components",
            isHeader: true,
        },
        {
            id: "baseUi",
            label: "Base UI",
            icon: "ri-pencil-ruler-2-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsBaseUi(!isBaseUi);
                setIscurrentState('BaseUi');
                updateIconSidebar(e);
            },
            stateVariables: isBaseUi,
            subItems: [
                { id: "alerts", label: "Alerts", link: "/ui-alerts", parentId: "baseUi" },
                { id: "badges", label: "Badges", link: "/ui-badges", parentId: "baseUi" },
                { id: "buttons", label: "Buttons", link: "/ui-buttons", parentId: "baseUi" },
                { id: "colors", label: "Colors", link: "/ui-colors", parentId: "baseUi" },
                { id: "cards", label: "Cards", link: "/ui-cards", parentId: "baseUi" },
                { id: "carousel", label: "Carousel", link: "/ui-carousel", parentId: "baseUi" },
                { id: "dropdowns", label: "Dropdowns", link: "/ui-dropdowns", parentId: "baseUi" },
                { id: "grid", label: "Grid", link: "/ui-grid", parentId: "baseUi" },
                { id: "images", label: "Images", link: "/ui-images", parentId: "baseUi" },
                { id: "tabs", label: "Tabs", link: "/ui-tabs", parentId: "baseUi" },
                { id: "accordions", label: "Accordion & Collapse", link: "/ui-accordions", parentId: "baseUi" },
                { id: "modals", label: "Modals", link: "/ui-modals", parentId: "baseUi" },
                { id: "offcanvas", label: "Offcanvas", link: "/ui-offcanvas", parentId: "baseUi" },
                { id: "placeholders", label: "Placeholders", link: "/ui-placeholders", parentId: "baseUi" },
                { id: "progress", label: "Progress", link: "/ui-progress", parentId: "baseUi" },
                { id: "notifications", label: "Notifications", link: "/ui-notifications", parentId: "baseUi" },
                { id: "media", label: "Media object", link: "/ui-media", parentId: "baseUi" },
                { id: "embedvideo", label: "Embed Video", link: "/ui-embed-video", parentId: "baseUi" },
                { id: "typography", label: "Typography", link: "/ui-typography", parentId: "baseUi" },
                { id: "lists", label: "Lists", link: "/ui-lists", parentId: "baseUi" },
                { id: "links", label: "Links", link: "/ui-links", parentId: "baseUi", badgeColor: "success", badgeName: "New" },
                { id: "general", label: "General", link: "/ui-general", parentId: "baseUi" },
                { id: "ribbons", label: "Ribbons", link: "/ui-ribbons", parentId: "baseUi" },
                { id: "utilities", label: "Utilities", link: "/ui-utilities", parentId: "baseUi" },
            ],
        },
        {
            id: "advanceUi",
            label: "Advance UI",
            icon: "ri-stack-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsAdvanceUi(!isAdvanceUi);
                setIscurrentState('AdvanceUi');
                updateIconSidebar(e);
            },
            stateVariables: isAdvanceUi,
            subItems: [
                { id: "nestablelist", label: "Nestable List", link: "/advance-ui-nestable", parentId: "advanceUi" },
                { id: "scrollbar", label: "Scrollbar", link: "/advance-ui-scrollbar", parentId: "advanceUi" },
                { id: "animation", label: "Animation", link: "/advance-ui-animation", parentId: "advanceUi" },
                { id: "tour", label: "Tour", link: "/advance-ui-tour", parentId: "advanceUi" },
                { id: "swiperslider", label: "Swiper Slider", link: "/advance-ui-swiper", parentId: "advanceUi" },
                { id: "ratings", label: "Ratings", link: "/advance-ui-ratings", parentId: "advanceUi" },
                { id: "highlight", label: "Highlight", link: "/advance-ui-highlight", parentId: "advanceUi" },
            ],
        },
        {
            id: "widgets",
            label: "Widgets",
            icon: "ri-honour-line",
            link: "/widgets",
            click: function (e : any) {
                e.preventDefault();
                setIscurrentState('Widgets');
            }
        },
        {
            id: "forms",
            label: "Forms",
            icon: "ri-file-list-3-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsForms(!isForms);
                setIscurrentState('Forms');
                updateIconSidebar(e);
            },
            stateVariables: isForms,
            subItems: [
                { id: "basicelements", label: "Basic Elements", link: "/forms-elements", parentId: "forms" },
                { id: "formselect", label: "Form Select", link: "/forms-select", parentId: "forms" },
                { id: "checkboxsradios", label: "Checkboxs & Radios", link: "/forms-checkboxes-radios", parentId: "forms" },
                { id: "pickers", label: "Pickers", link: "/forms-pickers", parentId: "forms" },
                { id: "inputmasks", label: "Input Masks", link: "/forms-masks", parentId: "forms" },
                { id: "advanced", label: "Advanced", link: "/forms-advanced", parentId: "forms" },
                { id: "rangeslider", label: "Range Slider", link: "/forms-range-sliders", parentId: "forms" },
                { id: "validation", label: "Validation", link: "/forms-validation", parentId: "forms" },
                { id: "wizard", label: "Wizard", link: "/forms-wizard", parentId: "forms" },
                { id: "editors", label: "Editors", link: "/forms-editors", parentId: "forms" },
                { id: "fileuploads", label: "File Uploads", link: "/forms-file-uploads", parentId: "forms" },
                { id: "formlayouts", label: "Form Layouts", link: "/forms-layouts", parentId: "forms" },
                { id: "select2", label: "Select2", link: "/forms-select2", parentId: "forms" },
            ],
        },
        {
            id: "tables",
            label: "Tables",
            icon: "ri-layout-grid-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsTables(!isTables);
                setIscurrentState('Tables');
                updateIconSidebar(e);
            },
            stateVariables: isTables,
            subItems: [
                { id: "basictables", label: "Basic Tables", link: "/tables-basic", parentId: "tables" },
                { id: "listjs", label: "List Js", link: "/tables-listjs", parentId: "tables" },
                { id: "reactdatatables", label: "React Datatables", link: "/tables-react", parentId: "tables" },
            ],
        },
        {
            id: "charts",
            label: "Charts",
            icon: "ri-pie-chart-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsCharts(!isCharts);
                setIscurrentState('Charts');
                updateIconSidebar(e);
            },
            stateVariables: isCharts,
            subItems: [
                {
                    id: "apexcharts",
                    label: "Apexcharts",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsApex(!isApex);
                    },
                    stateVariables: isApex,
                    childItems: [
                        { id: 1, label: "Line", link: "/charts-apex-line" },
                        { id: 2, label: "Area", link: "/charts-apex-area" },
                        { id: 3, label: "Column", link: "/charts-apex-column" },
                        { id: 4, label: "Bar", link: "/charts-apex-bar" },
                        { id: 5, label: "Mixed", link: "/charts-apex-mixed" },
                        { id: 6, label: "Timeline", link: "/charts-apex-timeline" },
                        {
                            id: 7, label: "Range Area",
                            link: "/charts-apex-range-area",
                            badgeName: "New",
                            badgeColor: "success",
                        },
                        {
                            id: 8,
                            label: "Funnel",
                            link: "/charts-apex-funnel",
                            badgeName: "New",
                            badgeColor: "success",
                        },
                        { id: 9, label: "Candlstick", link: "/charts-apex-candlestick" },
                        { id: 10, label: "Boxplot", link: "/charts-apex-boxplot" },
                        { id: 11, label: "Bubble", link: "/charts-apex-bubble" },
                        { id: 12, label: "Scatter", link: "/charts-apex-scatter" },
                        { id: 13, label: "Heatmap", link: "/charts-apex-heatmap" },
                        { id: 14, label: "Treemap", link: "/charts-apex-treemap" },
                        { id: 15, label: "Pie", link: "/charts-apex-pie" },
                        { id: 16, label: "Radialbar", link: "/charts-apex-radialbar" },
                        { id: 17, label: "Radar", link: "/charts-apex-radar" },
                        { id: 18, label: "Polar Area", link: "/charts-apex-polar" },
                    ]
                },
                { id: "chartjs", label: "Chartjs", link: "/charts-chartjs", parentId: "charts" },
                { id: "echarts", label: "Echarts", link: "/charts-echarts", parentId: "charts" },

            ],
        },
        {
            id: "icons",
            label: "Icons",
            icon: "ri-compasses-2-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsIcons(!isIcons);
                setIscurrentState('Icons');
                updateIconSidebar(e);
            },
            stateVariables: isIcons,
            subItems: [
                { id: "remix", label: "Remix", link: "/icons-remix", parentId: "icons" },
                { id: "boxicons", label: "Boxicons", link: "/icons-boxicons", parentId: "icons" },
                { id: "materialdesign", label: "Material Design", link: "/icons-materialdesign", parentId: "icons" },
                { id: "lineawesome", label: "Line Awesome", link: "/icons-lineawesome", parentId: "icons" },
                { id: "feather", label: "Feather", link: "/icons-feather", parentId: "icons" },
                { id: "crypto", label: "Crypto SVG", link: "/icons-crypto", parentId: "icons" },
            ],
        },
        {
            id: "maps",
            label: "Maps",
            icon: "ri-map-pin-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsMaps(!isMaps);
                setIscurrentState('Maps');
                updateIconSidebar(e);
            },
            stateVariables: isMaps,
            subItems: [
                { id: "google", label: "Google", link: "/maps-google", parentId: "maps" },
                { id: "vector", label: "Vector", link: "/maps-vector", parentId: "maps" },
                { id: "leaflet", label: "Leaflet", link: "/maps-leaflet", parentId: "maps" },
            ],
        },
        {
            id: "multilevel",
            label: "Multi Level",
            icon: "ri-share-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsMultiLevel(!isMultiLevel);
                setIscurrentState('MuliLevel');
                updateIconSidebar(e);
            },
            stateVariables: isMultiLevel,
            subItems: [
                { id: "level1.1", label: "Level 1.1", link: "/#", parentId: "multilevel" },
                {
                    id: "level1.2",
                    label: "Level 1.2",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsLevel1(!isLevel1);
                    },
                    stateVariables: isLevel1,
                    childItems: [
                        { id: 1, label: "Level 2.1", link: "/#" },
                        {
                            id: "level2.2",
                            label: "Level 2.2",
                            link: "/#",
                            isChildItem: true,
                            click: function (e : any) {
                                e.preventDefault();
                                setIsLevel2(!isLevel2);
                            },
                            stateVariables: isLevel2,
                            childItems: [
                                { id: 1, label: "Level 3.1", link: "/#" },
                                { id: 2, label: "Level 3.2", link: "/#" },
                            ]
                        },
                    ]
                },
            ],
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;