import React, { useState, useEffect } from "react";
import { Collapse, Container, NavbarToggler, NavLink } from "reactstrap";
import Scrollspy from "react-scrollspy";
import { Link } from "react-router-dom";

// Import Images
import logodark from "../../../assets/images/logo-dark.png";
import logolight from "../../../assets/images/logo-light.png";

const Navbar = () => {
  const [isOpenMenu, setisOpenMenu] = useState<boolean>(false);
  const [navClass, setnavClass] = useState<any>("");

  const toggle = () => setisOpenMenu(!isOpenMenu);

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  const [activeLink, setActiveLink] = useState<any>();

  useEffect(() => {
    const activation = (event:any) => {
      const target = event.target;
      if (target) {
        target.classList.add("active");
        setActiveLink(target);
        if (activeLink && activeLink !== target) {
          activeLink.classList.remove("active");
        }
      }
    };
    const defaultLink = document.querySelector(".navbar li a.active");
    if (defaultLink) {
      defaultLink?.classList.add("active");
      setActiveLink(defaultLink);
    }
    const links = document.querySelectorAll(".navbar a");
    links.forEach((link) => {
      link.addEventListener("click", activation);
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", activation);
      });
    };
  }, [activeLink]);

  const scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setnavClass("is-sticky");
    } else {
      setnavClass("");
    }
  };

  return (
    <React.Fragment>
      <nav
        className={
          "navbar navbar-expand-lg navbar-landing fixed-top " + navClass
        }
        id="navbar"
      >
        <Container>
          <Link className="navbar-brand" to="/index">
            <img
              src={logodark}
              className="card-logo card-logo-dark"
              alt="logo dark"
              height="17"
            />
            <img
              src={logolight}
              className="card-logo card-logo-light"
              alt="logo light"
              height="17"
            />
          </Link>

          <NavbarToggler
            className="navbar-toggler py-0 fs-20 text-body"
            onClick={toggle}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu"></i>
          </NavbarToggler>

          <Collapse
            isOpen={isOpenMenu}
            className="navbar-collapse"
            id="navbarSupportedContent"
          >
            <Scrollspy
              offset={-18}
              items={[
                "hero",
                "services",
                "features",
                "plans",
                "reviews",
                "team",
                "contact",
              ]}
              currentClassName="active"
              className="navbar-nav mx-auto mt-2 mt-lg-0"
              id="navbar-example"
            >
              <li className="nav-item">
                <NavLink className="fs-15 fw-semibold active" href="#hero">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-15 fw-semibold" href="#services">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-15 fw-semibold" href="#features">
                  Features
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-15 fw-semibold" href="#plans">
                  Plans
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-15 fw-semibold" href="#reviews">
                  Reviews
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-15 fw-semibold" href="#team">
                  Team
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-15 fw-semibold" href="#contact">
                  Contact
                </NavLink>
              </li>
            </Scrollspy>

            <div className="">
              <Link
                to="/login"
                className="btn btn-link fw-medium text-decoration-none text-body"
              >
                Sign in
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </Collapse>
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
