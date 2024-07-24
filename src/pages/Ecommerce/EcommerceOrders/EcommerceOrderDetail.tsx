import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardHeader,
  Collapse
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { Link, useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { productDetails } from "../../../common/data/ecommerce";
import EcommerceOrderProduct from "./EcommerceOrderProduct";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import { createSelector } from "reselect";
import { getOneCompany } from "slices/thunks";

const EcommerceOrderDetail = (props:any) => {
  document.title = "Company Details | Velzon - React Admin & Dashboard Template";
  const [company,setCompany] =useState<any>([]);
  const [col1, setcol1] = useState<boolean>(true);
  const [col2, setcol2] = useState<boolean>(true);
  const [col3, setcol3] = useState<boolean>(true);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const id = query.get("id");
  
  
  
  function togglecol1() {
    setcol1(!col1);
  }

  function togglecol2() {
    setcol2(!col2);
  }

  function togglecol3() {
    setcol3(!col3);
  }

  const dispatch: any = useDispatch();
  const slectedCompany = createSelector(
    (state: any) => state.Companies,
    (Companies) => Companies.oneCompany
  );  // Inside your component
  const Company = useSelector(slectedCompany);
    useEffect(()=>{
      console.log(Company);
      
    },[])
  useEffect(() => {
    if (Company && !Company.length) {
      
      dispatch(getOneCompany(id));
    }
  }, [dispatch]);
  useEffect(() => {
   setCompany(Company)
   console.log("Comp : " ,Company);
   
  }, [Company]);

  // to remove later
  useEffect(()=>{
    console.log("******",company);
  },[company])

  const Agent = company ? company.agent : null;

  const companyData = company ? company : null ;
  console.log("Companyy data :",companyData);
  
  

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Company Details" pageTitle="Ecommerce" />

        <Row>
          <Col xl={9}>
            

            <Card>
              <CardHeader>
                <div className="d-sm-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Company Status</h5>
                  <div className="flex-shrink-0 mt-2 mt-sm-0">
                    <Link
                      to="#"
                      className="btn btn-soft-info btn-sm mt-2 mt-sm-0"
                    >
                      <i className="ri-map-pin-line align-middle me-1"></i>{" "}
                      Change Address
                    </Link>{" "}
                    <Link
                      to="#"
                      className="btn btn-soft-danger btn-sm mt-2 mt-sm-0"
                    >
                      <i className="mdi mdi-archive-remove-outline align-middle me-1"></i>{" "}
                      Cancel Order
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="profile-timeline">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                     <div className="accordion-item border-0" onClick={togglecol2}>
                      <div className="accordion-header" id="headingTwo">
                        <div
                          className={classnames(
                            "accordion-button",
                            "p-2",
                            "shadow-none",
                            { collapsed: !col2 }
                          )}
                          
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className=" ri-book-open-fill"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-1 fw-semibold">
                                Menu  {/*-{" "}*/}
                                <span className="fw-normal">
                                  {/*Thu, 16 Dec 2021*/}
                                  
                                </span>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Collapse
                        id="collapseTwo"
                        className="accordion-collapse"
                        isOpen={col2}
                      >
                          <div className="accordion-body ms-2 ps-5 pt-0">
                            {company.menu && company.menu.map((menuItem: any, index: number) => (
                              <h6 className="mb-1" key={index}>
                                {menuItem.name ? menuItem.name : "name not available"}
                              </h6>
                            ))}
                          </div>

                      </Collapse>
                    </div>
                    <div className="accordion-item border-0" onClick={togglecol1}>
                      <div className="accordion-header" id="headingOne">
                        <div className={classnames(
                          "accordion-button",
                          "p-2",
                          "shadow-none",
                          { collapsed: !col1 }

                        )}>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="ri-file-list-3-line"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-0 fw-semibold">
                                Categories {/* -{" "}*/}
                                <span className="fw-normal">
                                 {/*Wed, 15 Dec 2021*/} 
                                </span>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Collapse
                        id="collapseOne"
                        className="accordion-collapse"
                        isOpen={col1}
                      >
                      <div className="accordion-body ms-2 ps-5 pt-0">
                        {company.category && company.category.map((dataCategory : any, index : number) => (
                          <h6 className="mb-1" key={index}>
                            {dataCategory.name ? dataCategory.name : "name not available"}
                          </h6>
                        ))}
                      </div>


                      </Collapse>
                    </div>
                    
                    
                    {company?.category?.[0]?.subcategory?.length > 0 ? (
                      company.category[0].subcategory.map((dataCategory : any, index : number) => (
                        
                          
                        
                        <div className="accordion-item border-0">
                        <div className="accordion-header" id="headingFour">
                          <div
                            className="accordion-button p-2 shadow-none"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-light text-success rounded-circle">
                                  <i className="ri-shopping-basket-2-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-14 mb-0 fw-semibold">
                                {dataCategory.name ? dataCategory.name : "name not available"}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      ))
                    ) : (
                      <p>No subcategories available</p>
                    )}

                  {/*
                      <div className="accordion-item border-0">
                        <div className="accordion-header" id="headingFour">
                          <div
                            className="accordion-button p-2 shadow-none"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-light text-success rounded-circle">
                                  <i className="ri-takeaway-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-14 mb-0 fw-semibold">
                                  Out For Delivery
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="accordion-item border-0">
                        <div className="accordion-header" id="headingFive">
                          <div
                            className="accordion-button p-2 shadow-none"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-light text-success rounded-circle">
                                  <i className="mdi mdi-package-variant"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-14 mb-0 fw-semibold">
                                  Delivered
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  */}

                  </div>
                </div>
              </CardBody>
            </Card>

            {/*
              <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Order #VL2667</h5>
                  <div className="flex-shrink-0">
                    <Link
                      to="/apps-invoices-details"
                      className="btn btn-success btn-sm"
                    >
                      <i className="ri-download-2-fill align-middle me-1"></i>{" "}
                      Invoice
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-responsive table-card">
                  <table className="table table-nowrap align-middle table-borderless mb-0">
                    <thead className="table-light text-muted">
                      <tr>
                        <th scope="col">Product Details</th>
                        <th scope="col">Item Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Rating</th>
                        <th scope="col" className="text-end">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productDetails.map((product, key) => (
                        <EcommerceOrderProduct product={product} key={key} />
                      ))}
                      <tr className="border-top border-top-dashed">
                        <td colSpan={3}></td>
                        <td colSpan={2} className="fw-medium p-0">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td>Sub Total :</td>
                                <td className="text-end">$359.96</td>
                              </tr>
                              <tr>
                                <td>
                                  Discount{" "}
                                  <span className="text-muted">(VELZON15)</span>{" "}
                                  : :
                                </td>
                                <td className="text-end">-$53.99</td>
                              </tr>
                              <tr>
                                <td>Shipping Charge :</td>
                                <td className="text-end">$65.00</td>
                              </tr>
                              <tr>
                                <td>Estimated Tax :</td>
                                <td className="text-end">$44.99</td>
                              </tr>
                              <tr className="border-top border-top-dashed">
                                <th scope="row">Total (USD) :</th>
                                <th className="text-end">$415.96</th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>*/
            }
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>Company Adress
                  
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack gap-2 fs-14 mb-0">
                  <li className="fw-semibold fs-15">
                    {company ? companyData.name : "Company Name not available"}
                  </li>
                  <li>{company ? companyData.phone : "Company phone not available"}</li>
                  <li>{company.address ? companyData.address.street : "adress street not available"}</li>
                  <li>{company.address ? companyData.address.city+` ${companyData.address.zip}` : "adress city not available"}</li>
                  <li>{company.address ? companyData.address.country : "adress country not available"}</li>
                </ul>
              </CardBody>
            </Card>
          </Col>


          <Col xl={3}>
            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                    <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i> Company Details
                  </h5>
                  {/*<div className="flex-shrink-0">
                    <div  className="badge bg-primary-subtle text-primary fs-12">
                      Track Order
                    </div>
                      </div>*/}
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-center">
                
                <img
                        src={company && company.logo ? `http://localhost:3001${company.logo}` : avatar3} 
                        alt="Company logo"
                        className="display-5avatar-xl rounded"
                      />
                  <h5 className="fs-16 mt-2">{company.name ? company.name : "Company Name not available"}</h5>
                  <p className="text-muted mb-0">ID: {company._id ? company._id : "ID not available"}</p>
                  <p className="text-muted mb-0">Description : {company.description ? company.description : "Description not available"}</p>
                  
                      {company?.isPaid ? (
                        <div className="flex-shrink-0 ms-2">
                          
                          <div className="badge bg-success text-white fs-15">
                          Paid
                          </div>
                        </div>
                      ) : (
                        <div className="flex-shrink-0 ms-2">
                          <div className="badge bg-danger text-white fs-15">
                            Not Paid
                          </div>
                        </div>
                      )}
                   

                  
                </div>
              </CardBody>
            </Card>
            

            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                  {Agent ? Agent.role : "Role not available"} Details
                  </h5>
                  <div className="flex-shrink-0">
                    <Link to="#" className="link-secondary">
                      View Profile
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled mb-0 vstack gap-3">
                  <li>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                      <img
                        src={company.agent && company.agent.avatar ? `http://localhost:3001${company.agent.avatar}` : avatar3}
                        alt="Agent Avatar"
                        className="avatar-sm rounded"
                      />

                      </div>
                      <div className="flex-grow-1 ms-3">
                      <h5 className="fs-16 mb-1">
                        {company.agent ? `${company.agent.firstname} ${company.agent.lastname}` : "FirstName not available LastName not available"}
                      </h5>

                      <p className="text-muted mb-0">{company.agent ? company.agent.role : "Role not available"}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <i className="ri-mail-line me-2 align-middle text-muted fs-16"></i>
                    {company.agent ? company.agent.email : "Email not available"}
                  </li>
                  <li>
                    <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                    {company.agent ? company.agent.phoneNumber : "Phone Number not available"}
                  </li>
                </ul>
              </CardBody>
            </Card>

            

            
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-apps-fill align-bottom me-1 text-muted"></i>{" "}
                  Social Media Details
                </h5>
              </CardHeader>
              <CardBody>
                
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0"><i className="ri-facebook-circle-fill fs-24"></i></p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">
                      <Link to={company.socialMedia ? company.socialMedia.facebook : "#"} className="link-secondary">
                        {company.socialMedia ? company.socialMedia.facebook : "facebook not available"}
                      </Link>
                    </h6>
                  </div>
                </div>
                
                
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0"><i className="ri-instagram-fill fs-24"></i></p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">
                      <Link to={company.socialMedia ? company.socialMedia.instagram : "#" } className="link-secondary">
                        {company.socialMedia ? company.socialMedia.instagram : "instagram not available"}
                      </Link>
                    </h6>
                  </div>
                </div>
              </CardBody>
            </Card>

            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceOrderDetail;