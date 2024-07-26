import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Tooltip,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

//Simple bar
import SimpleBar from "simplebar-react";

import BreadCrumb from "../../../Components/Common/BreadCrumb";

import product1 from "../../../assets/images/products/img-1.png";
import product6 from "../../../assets/images/products/img-6.png";
import product8 from "../../../assets/images/products/product-unav.png";


import { productDetailsWidgets, reviews } from "../../../common/data/ecommerce";

import { Swiper, SwiperSlide } from "swiper/react";
import classnames from "classnames";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getOneProduct } from "slices/thunks";


const ProductReview = (props:any) => {
  return (
    <React.Fragment>
      <li className="py-2">
        <div className="border border-dashed rounded p-3">
          <div className="d-flex align-items-start mb-3">
            <div className="hstack gap-3">
              <div className="badge rounded-pill bg-success mb-0">
                <i className="mdi mdi-star"></i> {props.review.rating}
              </div>
              <div className="vr"></div>
              <div className="flex-grow-1">
                <p className="text-muted mb-0">{props.review.comment}</p>
              </div>
            </div>
          </div>
          {props.review.subItems && (
            <React.Fragment>
              <div className="d-flex flex-grow-1 gap-2 mb-3">
                {props.review.subItems.map((subItem:any, key:any) => (
                  <React.Fragment key={key}>
                    <Link to="#" className="d-block">
                      <img
                        src={subItem.img}
                        alt=""
                        className="avatar-sm rounded object-fit-cover"
                      />
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          )}

          <div className="d-flex align-items-end">
            <div className="flex-grow-1">
              <h5 className="fs-15 mb-0">{props.review.name}</h5>
            </div>

            <div className="flex-shrink-0">
              <p className="text-muted mb-0">{props.review.date}</p>
            </div>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

const PricingWidgetList = (props:any) => {
  return (
    <React.Fragment>
      <Col lg={3} sm={6}>
        <div className="p-2 border border-dashed rounded">
          <div className="d-flex align-items-center">
            <div className="avatar-sm me-2">
              <div className="avatar-title rounded bg-transparent text-success fs-24">
                <i className={props.pricingDetails.icon}></i>
              </div>
            </div>
            <div className="flex-grow-1">
              <p className="text-muted mb-1">{props.pricingDetails.label} :</p>
              <h5 className="mb-0">{props.pricingDetails.labelDetail}</h5>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

function EcommerceProductDetail(props:any) {
  document.title="Product Details | Velzon - React Admin & Dashboard Template";

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [ttop, setttop] = useState<boolean>(false);

  const [ssize, setssize] = useState<boolean>(false);
  const [msize, setmsize] = useState<boolean>(false);
  const [lsize, setlsize] = useState<boolean>(false);
  const [xlsize, setxlsize] = useState<boolean>(false);
  const [customActiveTab, setcustomActiveTab] = useState<any>("1");
  const [product,setProduct] =useState<any>([]);

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const id = query.get("id");
  console.log(id);
  


  const dispatch: any = useDispatch();
  const slectedProduct = createSelector(
    (state: any) => state.Companies,
    (Products) => Products.oneProduct
  );  // Inside your component
  const Product = useSelector(slectedProduct);
    useEffect(()=>{
      console.log(Product);
      
    },[])
  useEffect(() => {
    if (Product && !Product.length) {
      
      dispatch(getOneProduct(id));
    }
  }, [dispatch]);
  
  useEffect(() => {
   setProduct(Product)
   console.log("Product : " ,Product);
   
  }, [Product]);



  const toggleCustom = (tab:any) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>     
        <BreadCrumb title="Product Details" pageTitle="Ecommerce" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row className="gx-lg-5">
                  <Col xl={4} md={8} className="mx-auto">
                    <div className="product-img-slider sticky-side-div">
                        <div className="swiper-wrapper swiper product-thumbnail-slider p-2 rounded bg-light">
                            <img
                              src={product && product.image ? (`http://localhost:3001${product.image}`) : product8} 
                              alt=""
                              className="img-fluid d-block"
                            />
                        </div>
                    </div>
                  </Col>

                  <Col xl={8}>
                    <div className="mt-xl-0 mt-5">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <br /><br />
                          <h4>{product && product.name ? product.name : "Product Name not availabe"} </h4>
                        </div>
                        <div className="flex-shrink-0">
                          <div>
                            <Tooltip
                              placement="top"
                              isOpen={ttop}
                              target="TooltipTop"
                              toggle={() => {
                                setttop(!ttop);
                              }}
                            >
                              Edit
                            </Tooltip>
                            <a
                              href={`editProduct?id=${id}`}
                              id="TooltipTop"
                              className="btn btn-light"
                            >
                              <i className="ri-pencil-fill align-bottom"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-wrap gap-2 align-items-center mt-3">
                        <div className="text-muted fs-16">
                          <span className="mdi mdi-star text-warning"></span>
                          <span className="mdi mdi-star text-warning"></span>
                          <span className="mdi mdi-star text-warning"></span>
                          <span className="mdi mdi-star text-warning"></span>
                          <span className="mdi mdi-star text-warning"></span>
                        </div>
                        <div className="text-muted">
                          ( 5.50k Customer Review )
                        </div>
                      </div>

                      <Row className="mt-4">
                        <Col lg={3} sm={6}>
                            <div className="p-2 border border-dashed rounded">
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm me-2">
                                  <div className="avatar-title rounded bg-transparent text-success fs-24">
                                    <i className="ri-coins-fill"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <p className="text-muted mb-1">Price :</p>
                                  <h5 className="mb-0">{product.price} .TND</h5>
                                </div>
                              </div>
                            </div>
                        </Col>
                        <Col lg={3} sm={6}>
                            <div className="p-2 border border-dashed rounded">
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm me-2">
                                  <div className="avatar-title rounded bg-transparent text-success fs-24">
                                    <i className="ri-stack-fill"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <p className="text-muted mb-1 ">Stocks </p>
                                  {product?.availability ? (
                                    <div className="flex-shrink-0 ms-2">
                                      
                                      <div className="badge bg-success text-white fs-15 ">
                                      Available
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge bg-danger text-white fs-15">
                                        Not Available
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                        </Col>
                        {
                          product?.availability ? (
                            <Col lg={3} sm={6}>
                            <div className="p-2 border border-dashed rounded">
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm me-2">
                                  <div className="avatar-title rounded bg-transparent text-success fs-24">
                                    <i className="ri-stack-fill"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <p className="text-muted mb-1">Quantity :</p>
                                  <h5 className="mb-0">{product.quantity}</h5>
                                </div>
                              </div>
                            </div>
                        </Col>
                          ) : (
                            <div></div>
                          )
                        }
                        
                      </Row>

                      <Row>
                        <Col xl={6}>
                          <div className=" mt-4">
                            <h5 className="fs-15">Sizes :</h5>
                            <div className="d-flex flex-wrap gap-2">
                              {/*<Tooltip
                                placement="top"
                                isOpen={ssize}
                                target="TooltipSSize"
                                toggle={() => {
                                  setssize(!ssize);
                                }}
                              >
                                Out of Stock
                              </Tooltip>
                              <Tooltip
                                placement="top"
                                isOpen={msize}
                                target="TooltipMSize"
                                toggle={() => {
                                  setmsize(!msize);
                                }}
                              >
                                04 Items Available
                              </Tooltip>
                              <Tooltip
                                placement="top"
                                isOpen={lsize}
                                target="TooltipLSize"
                                toggle={() => {
                                  setlsize(!lsize);
                                }}
                              >
                                06 Items Available
                              </Tooltip>
                              <Tooltip
                                placement="top"
                                isOpen={xlsize}
                                target="TooltipXlSize"
                                toggle={() => {
                                  setxlsize(!xlsize);
                                }}
                              >
                                Out of Stock
                              </Tooltip>*/}
                                {Array.isArray(product?.attributs) && product.attributs.length > 0 ? (
                                  product.attributs.map((attribute: any) => (
                                    <div>
                                      <Tooltip
                                        placement="top"
                                        isOpen={ssize}
                                        target="TooltipSSize"
                                        toggle={() => {
                                          setssize(!ssize);
                                        }}
                                      >
                                        {attribute?.name}
                                      </Tooltip>
                                    <Input
                                    type="radio"
                                    className="btn-check"
                                    name="productsize-radio"
                                  />
                                  <Label
                                    className="btn btn-soft-primary avatar-sm rounded-circle p-0 d-flex justify-content-center align-items-center "
                                    id="TooltipSSize"
                                  >
                                    {attribute?.name}
                                  </Label>
                                  </div>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={2}>No attributes available</td>
                                  </tr>
                                )}
{
                          product?.availability ? (
                            <div>
                              
                            </div>
                          ) : (
                            <div></div>
                          )
                        }


                              

                              
                            </div>
                          </div>
                        </Col>

                        
                      </Row>

                      <div className="mt-4 text-muted">
                        <h5 className="fs-15">Description :</h5>
                        <p>
                        {product && product.description ? product.description : "No description availabe"}
                        </p>
                      </div>
                      {/*
                      <Row>
                        
                        <Col sm={6}>
                          <div className="mt-3">
                            <h5 className="fs-15">Features :</h5>
                            <ul className="list-unstyled">
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Full Sleeve
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Cotton
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                All Sizes available
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                4 Different Color
                              </li>
                            </ul>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mt-3">
                            <h5 className="fs-15">Services :</h5>
                            <ul className="list-unstyled product-desc-list">
                              <li className="py-1">10 Days Replacement</li>
                              <li className="py-1">
                                Cash on Delivery available
                              </li>
                            </ul>
                          </div>
                        </Col>
                      </Row>
                      */}

                      <div className="product-content mt-5">
                        <h5 className="fs-15 mb-3">Product Description :</h5>
                        <Nav tabs className="nav-tabs-custom nav-success">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "1",
                              })}
                              onClick={() => {
                                toggleCustom("1");
                              }}
                            >
                              Specification
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "2",
                              })}
                              onClick={() => {
                                toggleCustom("2");
                              }}
                            >
                              Details
                            </NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent
                        activeTab={customActiveTab}
                          className="border border-top-0 p-4"
                          id="nav-tabContent"
                        >
                          <TabPane
                            id="nav-speci"
                            tabId="1"
                          >
                            <div className="table-responsive">
                            <table className="table mb-0">
                              <tbody>
                                {Array.isArray(product?.attributs) && product.attributs.length > 0 ? (
                                  product.attributs.map((attribute: any, index: number) => (
                                    <tr key={index}>
                                      <th scope="row" style={{ width: "200px" }}>
                                        {attribute?.name}
                                      </th>
                                      <td>{attribute?.description}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={2}>No attributes available</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                            </div>
                          </TabPane>
                          <TabPane
                            id="nav-detail"
                            tabId="2"
                          >
                            <div>
                              <h5 className="mb-3">
                                {product && product.name ? product.name : "Product Name not availabe"} 
                              </h5>
                              <p>
                              {product && product.description ? product.description : "Product Description not availabe"} 
                              </p>
                              {/*<div>
                                <p className="mb-2">
                                  <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                  Machine Wash
                                </p>
                                <p className="mb-2">
                                  <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                  Fit Type: Regular
                                </p>
                                <p className="mb-2">
                                  <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                  100% Cotton
                                </p>
                                <p className="mb-0">
                                  <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                  Long sleeve
                                </p>
                              </div>*/}
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>

                      <div className="mt-5">
                        <div>
                          <h5 className="fs-15 mb-3">Ratings & Reviews</h5>
                        </div>
                        <Row className="gy-4 gx-0">
                          <Col lg={4}>
                            <div>
                              <div className="pb-3">
                                <div className="bg-light px-3 py-2 rounded-2 mb-2">
                                  <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                      <div className="fs-16 align-middle text-warning">
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-half-fill"></i>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <h6 className="mb-0">4.5 out of 5</h6>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-muted">
                                    Total{" "}
                                    <span className="fw-medium">5.50k</span>{" "}
                                    reviews
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3">
                                <Row className="align-items-center g-2">
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0">5 star</h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-2">
                                      <div className="progress animated-progess progress-sm">
                                        <div
                                          className="progress-bar bg-success"
                                          role="progressbar"
                                          style={{ width: "50.16%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0 text-muted">2758</h6>
                                    </div>
                                  </div>
                                </Row>

                                <Row className="align-items-center g-2">
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0">4 star</h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-2">
                                      <div className="progress animated-progess progress-sm">
                                        <div
                                          className="progress-bar bg-success"
                                          role="progressbar"
                                          style={{ width: "19.32%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0 text-muted">1063</h6>
                                    </div>
                                  </div>
                                </Row>

                                <Row className="align-items-center g-2">
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0">3 star</h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-2">
                                      <div className="progress animated-progess progress-sm">
                                        <div
                                          className="progress-bar bg-success"
                                          role="progressbar"
                                          style={{ width: "18.12%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0 text-muted">997</h6>
                                    </div>
                                  </div>
                                </Row>

                                <Row className="align-items-center g-2">
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0">2 star</h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-2">
                                      <div className="progress animated-progess progress-sm">
                                        <div
                                          className="progress-bar bg-warning"
                                          role="progressbar"
                                          style={{ width: "7.42%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0 text-muted">408</h6>
                                    </div>
                                  </div>
                                </Row>

                                <Row className="align-items-center g-2">
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0">1 star</h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-2">
                                      <div className="progress animated-progess progress-sm">
                                        <div
                                          className="progress-bar bg-danger"
                                          role="progressbar"
                                          style={{ width: "4.98%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0 text-muted">274</h6>
                                    </div>
                                  </div>
                                </Row>
                              </div>
                            </div>
                          </Col>

                          <Col lg={8}>
                            <div className="ps-lg-4">
                              <div className="d-flex flex-wrap align-items-start gap-3">
                                <h5 className="fs-15">Reviews: </h5>
                              </div>

                              <SimpleBar
                                className="me-lg-n3 pe-lg-4"
                                style={{ maxHeight: "225px" }}
                              >
                                <ul className="list-unstyled mb-0">
                                  {reviews.map((review, key) => (
                                    <React.Fragment key={key}>
                                      <ProductReview review={review} />
                                    </React.Fragment>
                                  ))}
                                </ul>
                              </SimpleBar>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EcommerceProductDetail;