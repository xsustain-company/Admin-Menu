import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import image2 from "../../assets/images/users/avatar-2.jpg";
import image3 from "../../assets/images/users/avatar-3.jpg";
import image5 from "../../assets/images/users/avatar-5.jpg";
import Navdata from 'Layouts/LayoutMenuData';

const SearchOption = () => {
    const navData = Navdata().props.children;
    const [searchTerm, setSearchTerm] = useState('');
    const [filterData, setFilterData] = useState([]);
    
    useEffect(() => {
      const searchOptions = document.getElementById("search-close-options") as HTMLElement;
      const dropdown = document.getElementById("search-dropdown") as HTMLElement;
      const searchInput = document.getElementById("search-options") as HTMLInputElement;
    
      const handleSearchInput = () => {
        const inputLength = searchInput.value.length;
        if (inputLength > 0) {
          dropdown.classList.add("show");
          searchOptions.classList.remove("d-none");
        } else {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      };
    
      searchInput.addEventListener("focus", handleSearchInput);
      searchInput.addEventListener("keyup", handleSearchInput);
    
      searchOptions.addEventListener("click", () => {
        searchInput.value = "";
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      });
    
      document.body.addEventListener("click", (e: any) => {
        if (e.target.getAttribute('id') !== "search-options") {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });
    }, [searchTerm]);
    
    const onKeyDownPress = (e : any) => {
        const  { key} = e;
        console.log("value",e.target.value)
        if(key === "Enter"){
            e.preventDefault();
            setSearchTerm(e.target.value);
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    };
    
    // Filter routes based on search term
    useEffect(() => {
      const filteredMenuItems = navData.reduce((result: any, menuItem: any) => {
        const lowercaseLabel = menuItem.label ? menuItem.label.toLowerCase() : '';
        const lowercaseLink = menuItem.link ? menuItem.link.toLowerCase() : '';
    
        if (
          lowercaseLabel.includes(searchTerm.toLowerCase()) ||
          lowercaseLink.includes(searchTerm.toLowerCase())
        ) {
          result.push(menuItem);
        }
    
        const filteredSubItems = (menuItem.subItems || []).filter((subItem: any) => {
          const lowercaseSubItemLabel = subItem.label ? subItem.label.toLowerCase() : '';
          const lowercaseSubItemLink = subItem.link ? subItem.link.toLowerCase() : '';
    
          return (
            lowercaseSubItemLabel.includes(searchTerm.toLowerCase()) ||
            lowercaseSubItemLink.includes(searchTerm.toLowerCase())
          );
        });
    
        if (filteredSubItems.length > 0) {
          const menuItemWithSubItems = { ...menuItem, subItems: filteredSubItems };
          result.push(menuItemWithSubItems);
        }
    
        return result;
      }, []);
    
      setFilterData(filteredMenuItems);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    return (
        <React.Fragment>
            <form className="app-search d-none d-md-block">
                <div className="position-relative">
                    <Input type="text" className="form-control" placeholder="Search..."
                        id="search-options"
                        value={searchTerm}
                        onKeyDown={onKeyDownPress}
                        onChange={handleChange}/>
                    <span className="mdi mdi-magnify search-widget-icon"></span>
                    <span className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                        id="search-close-options"></span>
                </div>
                <div className="dropdown-menu dropdown-menu-lg" id="search-dropdown">
                    <SimpleBar style={{ height: "320px" }}>

                        <div className="dropdown-header">
                            <h6 className="text-overflow text-muted mb-0 text-uppercase">Recent Searches</h6>
                        </div>

                        <div className="dropdown-item bg-transparent text-wrap">
                            <Link to="/" className="btn btn-soft-secondary btn-sm rounded-pill">how to setup <i
                                className="mdi mdi-magnify ms-1"></i></Link>
                            <Link to="/" className="btn btn-soft-secondary btn-sm rounded-pill">buttons <i
                                className="mdi mdi-magnify ms-1"></i></Link>
                        </div>

                        {/* <div className="dropdown-header mt-2">
                            <h6 className="text-overflow text-muted mb-1 text-uppercase">Pages</h6>
                        </div> */}


                        {filterData.map((menuItem  :any, index) => (
                        <React.Fragment key={index}>
                            {!menuItem.subItems ? (
                            <Link to={menuItem.link} className="dropdown-item notify-item">
                                    <i className={menuItem.icon + " align-middle fs-xl text-muted me-2"}></i>
                                    <span>{menuItem.label}</span>
                            </Link>
                            ) : (
                                <div className="dropdown-header mt-2">
                                <h6 className="text-overflow text-muted mb-1 text-uppercase">{menuItem.label}</h6>
                            </div>
                            )}
                            {menuItem.subItems && menuItem.subItems.length > 0 && (
                            <>
                                {menuItem.subItems.map((subItem : any, subIndex : number) => (
                                 <Link key={subIndex} to={subItem.link} className="dropdown-item notify-item">
                                    <i className={menuItem.icon + " align-middle fs-xl text-muted me-2"}></i>
                                    <span>{subItem.label}</span>
                                </Link>
                                ))}
                            </>
                            )}
                        </React.Fragment>
                        ))}


                        <div className="dropdown-header mt-2">
                            <h6 className="text-overflow text-muted mb-2 text-uppercase">Members</h6>
                        </div>

                        <div className="notification-list">

                            <Link to="#" className="dropdown-item notify-item py-2">
                                <div className="d-flex">
                                    <img src={image2} className="me-3 rounded-circle avatar-xs"
                                        alt="user-pic" />
                                    <div className="flex-grow-1">
                                        <h6 className="m-0">Angela Bernier</h6>
                                        <span className="fs-11 mb-0 text-muted">Manager</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="#" className="dropdown-item notify-item py-2">
                                <div className="d-flex">
                                    <img src={image3} className="me-3 rounded-circle avatar-xs"
                                        alt="user-pic" />
                                    <div className="flex-grow-1">
                                        <h6 className="m-0">David Grasso</h6>
                                        <span className="fs-11 mb-0 text-muted">Web Designer</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="#" className="dropdown-item notify-item py-2">
                                <div className="d-flex">
                                    <img src={image5} className="me-3 rounded-circle avatar-xs"
                                        alt="user-pic" />
                                    <div className="flex-grow-1">
                                        <h6 className="m-0">Mike Bunch</h6>
                                        <span className="fs-11 mb-0 text-muted">React Developer</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </SimpleBar>

                    <div className="text-center pt-3 pb-1">
                        <Link to="/pages-search-results" className="btn btn-primary btn-sm">View All Results <i
                            className="ri-arrow-right-line ms-1"></i></Link>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default SearchOption;