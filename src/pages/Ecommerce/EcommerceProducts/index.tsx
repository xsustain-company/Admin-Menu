import React, { useEffect, useState, useMemo } from "react";

import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  UncontrolledCollapse,
  Row,
  Card,
  CardHeader,
  Col,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import classnames from "classnames";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import DeleteModal from "../../../Components/Common/DeleteModal";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { Rating, Published, Price } from "./EcommerceProductCol";
//Import data
import { productsData } from "../../../common/data";

//Import actions
import { getProducts as onGetProducts, deleteProducts } from "../../../slices/thunks";
import { isEmpty } from "lodash";
import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createSelector } from "reselect";
import { getCompaniess } from "slices/companies/thunk";
import PreviewCardHeader from "Components/Common/PreviewCardHeader";
import { CenteredModalExample } from "pages/BaseUi/UiModals/UiModalCode";

const SingleOptions = [
  { value: 'Watches', label: 'Watches' },
  { value: 'Headset', label: 'Headset' },
  { value: 'Sweatshirt', label: 'Sweatshirt' },
  { value: '20% off', label: '20% off' },
  { value: '4 star', label: '4 star' },
];

const EcommerceProducts = (props: any) => {
  const dispatch: any = useDispatch();

  const slectedCompanies = createSelector(
    (state: any) => state.Companies,
    (Companies) => Companies.companies
  );
  // Inside your component
  const companies = useSelector(slectedCompanies);
 
  const [companiesLIst, setCompaniesList] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<any>("1");
  const [product, setProduct] = useState<any>(null);


  useEffect(() => {
    if (companies && !companies.length) {
      dispatch(getCompaniess());
    }
  }, [dispatch, companies]);

  useEffect(() => {
    setCompaniesList(companies);
  }, [companies]);

  useEffect(() => {
    if (!isEmpty(companies)) setCompaniesList(companies);
  }, [companies]);

  const toggleTab = (tab: any, type: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredProducts = companies;
      if (type !== "all") {
        filteredProducts = companies.filter((product: any) => product.status === type);
      }
      setCompaniesList(filteredProducts);
    }
  };




  const [mincost, setMincost] = useState(0);
  const [maxcost, setMaxcost] = useState(500);

  useEffect(() => {
    onUpDate([mincost, maxcost]);
  }, [mincost, maxcost]);

  const onUpDate = (value: any) => {
    setCompaniesList(
      companies.filter(
        (product:any) => product.price >= value[0] && product.price <= value[1]
      )
    );
    setMincost(value[0]);
    setMaxcost(value[1]);
  };



  //delete order
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);

  const onClickDelete = (product: any) => {
    setProduct(product);
    setDeleteModal(true);
  };

  const handleDeleteProduct = () => {
    if (product) {
      dispatch(deleteProducts(product.id));
      setDeleteModal(false);
    }
  };


  const [dele, setDele] = useState(0);

  // Displat Delete Button
  const displayDelete = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element") as HTMLElement;
    setDele(ele.length);
    if (ele.length === 0) {
      del.style.display = 'none';
    } else {
      del.style.display = 'block';
    }
  };
  const [modal_center, setmodal_center] = useState<boolean>(false);
  function tog_center() {
      setmodal_center(!modal_center);
  }
  // Delete Multiple
  const deleteMultiple = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element") as HTMLElement;
    ele.forEach((element: any) => {
      dispatch(deleteProducts(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
      del.style.display = 'none';
    });
  };

  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (cell: any) => {
        return <input type="checkbox" className="productCheckBox form-check-input" value={cell.getValue()} onClick={() => displayDelete()} />;
      },
    },
    {
      header: "Company",
      accessorKey: "name",
      enableColumnFilter: false,
      cell: (cell: any) => (
        <>
          <div className="d-flex align-items-center">
            
            <div className="flex-grow-1">
              <h5 className="fs-14 mb-1">
                <Link
                  to="/apps-ecommerce-product-details"
                  className="text-body"
                >
                  {" "}
                  {cell.getValue()}
                </Link>
              </h5>
             
            </div>
          </div>
        </>
      ),
    },
    {
      header: "Logo",
      accessorKey: "logo",
      enableColumnFilter: false,
      cell: (cell: any) => (
        <>
        <div className="flex-shrink-0 me-3">
              <div className="avatar-sm bg-light rounded p-1">
                <img
                  src={`${process.env.REACT_APP_API_UPLOAD_URL}/${  cell.getValue()}`}
                  alt=""
                  className="img-fluid d-block"
                />
              </div>
            </div>
        </>
      ),
    },
    {
      header: "description",
      accessorKey: "description",
      enableColumnFilter: false,
      cell: (cell: any) => {
        return (
        <>
          <div className="d-flex align-items-center">
            
            <div className="flex-grow-1">
              <p className="fs-14 mb-1">
               
                  {" "}
                  {cell.getValue()}
             
              </p>
             
            </div>
          </div>
        </>);
      },
    },
    {
      header: "phone",
      accessorKey: "phone",
      enableColumnFilter: false,
      cell: (cell: any) => {
        return(<>
         <div className="d-flex align-items-center">
            
            <div className="flex-grow-1">
              <p className="fs-14 mb-1">
               
                  {" "}
                  {cell.getValue()}
             
              </p>
             
            </div>
          </div></>);
      },
    },
   
    {
      header: "Paid",
      accessorKey: "isPaid",
      enableColumnFilter: false,
      cell: (cell: any) => {
        return <Rating {...cell} />;
      },
    },
    {
      header: "Published",
      accessorKey: "createdAt",
      enableColumnFilter: false,
      cell: (cell: any) => {
        return <Published {...cell} />;
      },
    },
    {
      header: "Action",
      cell: (cell: any) => {
        return (
          <UncontrolledDropdown>
            <DropdownToggle
              href="#"
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem onClick={() => setmodal_center(true)} >
                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                View
              </DropdownItem>

              <DropdownItem href="apps-ecommerce-add-product">
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                Edit
              </DropdownItem>

              <DropdownItem divider />
              <DropdownItem
                href="#"
                onClick={() => {
                  const productData = cell.row.original;
                  onClickDelete(productData);
                }}
              >
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ],
    []
  );
  document.title = "Products | Velzon - React Admin & Dashboard Template";

  return (
    <div className="page-content">
        <Modal
                isOpen={modal_center}
                toggle={() => {
                    tog_center();
                }}
                centered
            >
                <ModalHeader
                    className="modal-title fw-bold">
                    View Company
                </ModalHeader>
                <ModalBody className="text-center p-5">
                    <div className="mt-4">
                       
                    </div>
                </ModalBody>
            </Modal>
      <ToastContainer closeButton={false} limit={1} />

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteProduct}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteModalMulti}
        onDeleteClick={() => {
          deleteMultiple();
          setDeleteModalMulti(false);
        }}
        onCloseClick={() => setDeleteModalMulti(false)}
      />
      <Container fluid>
        <BreadCrumb title="Companies" pageTitle="Ecommerce" />

        <Row>
        
          <Col xl={9} lg={8}>
            <div>
              <Card>
                <div className="card-header border-0">
                  <Row className=" align-items-center">
                    <Col>
                      <Nav
                        className="nav-tabs-custom card-header-tabs border-bottom-0"
                        role="tablist"
                      >
                       
                        <NavItem>
                          <NavLink
                            className={classnames(
                              { active: activeTab === "1" },
                              "fw-semibold"
                            )}
                            onClick={() => {
                              toggleTab("1", "all");
                            }}
                            href="#"
                          >
                            All{" "}
                            <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                              12
                            </span>
                          </NavLink>
                        </NavItem>
                        { /*
                        <NavItem>
                          <NavLink
                            className={classnames(
                              { active: activeTab === "2" },
                              "fw-semibold"
                            )}
                            onClick={() => {
                              toggleTab("2", "published");
                            }}
                            href="#"
                          >
                            Published{" "}
                            <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                              5
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames(
                              { active: activeTab === "3" },
                              "fw-semibold"
                            )}
                            onClick={() => {
                              toggleTab("3", "draft");
                            }}
                            href="#"
                          >
                            Draft
                          </NavLink>
                        </NavItem>
                        */}
                      </Nav>
                    </Col>
                    <div className="col-auto">
                      <div id="selection-element">
                        <div className="my-n1 d-flex align-items-center text-muted">
                          Select{" "}
                          <div
                            id="select-content"
                            className="text-body fw-semibold px-1"
                          >{dele}</div>{" "}
                          Result{" "}
                          <button
                            type="button"
                            className="btn btn-link link-danger p-0 ms-3"
                            onClick={() => setDeleteModalMulti(true)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
                <div className="card-body pt-0">
                  {companiesLIst && companiesLIst.length > 0 ? (
                    <TableContainer
                      columns={columns}
                      data={(companiesLIst || [])}
                      isGlobalFilter={true}
                      customPageSize={10}
                      divClass="table-responsive mb-1"
                      tableClass="mb-0 align-middle table-borderless"
                      theadClass="table-light text-muted"
                      isProductsFilter={true}
                      SearchPlaceholder='Search Company...'
                    />
                  ) : (
                    <div className="py-4 text-center">
                      <div>
                        <i className="ri-search-line display-5 text-success"></i>
                      </div>

                      <div className="mt-4">
                        <h5>Sorry! No Result Found</h5>
                      </div>
                    </div>
                  )}
                </div>


              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceProducts;
