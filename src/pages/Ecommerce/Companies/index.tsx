import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { getCompaniess } from "slices/companies/thunk";
//redux
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Loader from "../../../Components/Common/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";
import moment from "moment";
import { deleteCompanie } from "slices/thunks";

const AllCompanies = () => {
  const navigate = useNavigate();

  const dispatch: any = useDispatch();
  const slectedCompanies = createSelector(
    (state: any) => state.Companies,
    (Companies) => Companies.companies
  );

  const [activeTab, setActiveTab] = useState("1");
  const companies = useSelector(slectedCompanies);
  const [company,setCompany] = useState<any>({});
  const [companiesLIst, setCompaniesList] = useState<any>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  useEffect(() => {
    if (companies && !companies.length) {
      dispatch(getCompaniess());
      setCompaniesList(companies);
    }
  }, [dispatch, companies]);
  const onClickDelete = () => {
    dispatch(deleteCompanie(company._id));
    setDeleteModal(false);
  };


  // Inside your component

  /*
  const toggleTab = (tab: any, type: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredOrders = orders;
      if (type !== "all") {
        filteredOrders = orders.filter((order: any) => order.status === type);
      }
      //setOrderList(filteredOrders);
    }
  };
  */
  // Column
  const columns = useMemo(
    () => [
      {
        header: (
          <input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
          />
        ),
        cell: (cell: any) => {
          return (
            <input
              type="checkbox"
              className="orderCheckBox form-check-input"
              value={cell.getValue()}
            />
          );
        },
        id: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Order Id",
        accessorKey: "_id",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return (
            <Link
              to={`/apps-ecommerce-order-details?id=${cell.getValue()}`}
              className="fw-medium link-primary"
            >
              {cell.getValue()}
            </Link>
          );
        },
      },
      {
        header: "company",
        accessorKey: "name",
        enableColumnFilter: false,
      },
      {
        header: "manager",
        accessorKey: "manager",
        enableColumnFilter: false,
      },
      {
        header: "createdAt",
        accessorKey: "createdAt",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            {handleValidDate(cell.getValue())},
            <small className="text-muted">
              {" "}
              {handleValidTime(cell.getValue())}
            </small>
          </>
        ),
      },
      {
        header: "description",
        accessorKey: "description",
        enableColumnFilter: false,
      },
      {
        header: "phone",
        accessorKey: "phone",
        enableColumnFilter: false,
      },
      {
        header: "is Paid",
        accessorKey: "isPaid",
        enableColumnFilter: false,
        cell: (cell: any) => {
          switch (cell.getValue()) {
            case true:
              return (
                <span className="badge text-uppercase bg-success-subtle text-success">
                  {" "}
                  Paid{" "}
                </span>
              );
            case false:
              return (
                <span className="badge text-uppercase bg-danger-subtle text-danger">
                  Not Paid
                </span>
              );
            default:
              return (
                <span className="badge text-uppercase bg-warning-subtle text-warning">
                  {" "}
                  {cell.getValue()}{" "}
                </span>
              );
          }
        },
      },

      {
        header: "Action",
        cell: (cellProps: any) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Link
                  to={`/viewCompany?id=${cellProps.row.original._id}`}
                  className="text-primary d-inline-block"
                >
                  <i className="ri-eye-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item edit">
                <Link
                  to={`/editCompany?id=${cellProps.row.original._id}`}
                  className="text-primary d-inline-block edit-item-btn"
                  onClick={() => {
                    const orderData = cellProps.row.original;
                    //handleOrderClick(orderData);
                  }}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={() => {
                    const companyData = cellProps.row.original;
                    setCompany(companyData)
                    setDeleteModal(true)
                    
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    []
  );

  const handleValidDate = (date: any) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time: any) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime =
      moment(getTime, "hh:mm").format("hh:mm") + " " + meridiem;
    return updateTime;
  };

  document.title = "Companies";
  return (
    <div className="page-content">
      <DeleteModal
        show={deleteModal}
        onDeleteClick={onClickDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteModalMulti}
        onDeleteClick={() => {
          //deleteMultiple();
          setDeleteModalMulti(false);
        }}
        onCloseClick={() => setDeleteModalMulti(false)}
      />
      <Container fluid>
        <BreadCrumb title="Orders" pageTitle="Ecommerce" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">All Companies</h5>
                  </div>
                  <div className="col-sm-auto">
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => {
                          setIsEdit(false);
                          navigate('/createCompany');
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Create
                        Company
                      </button>{" "}
                    </div>
                  </div>
                </Row>
              </CardHeader>

              <CardBody className="pt-0">
                <div>
                  <Nav
                    className="nav-tabs nav-tabs-custom nav-success"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          //toggleTab("1", "all");
                        }}
                        href="#"
                      >
                        <i className="ri-store-2-fill me-1 align-bottom"></i>{" "}
                        All Companies
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          // toggleTab("2", "Delivered");
                        }}
                        href="#"
                      >
                        <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                        Paid
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => {
                          //  toggleTab("3", "Pickups");
                        }}
                        href="#"
                      >
                        <i className="ri-truck-line me-1 align-bottom"></i> in
                        Paid{" "}
                      </NavLink>
                    </NavItem>
                  </Nav>

                  {companies.length ? (
                    <TableContainer
                      columns={columns}
                      data={companies || []}
                      isGlobalFilter={true}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1 mt-0"
                      tableClass="align-middle table-nowrap"
                      theadClass="table-light text-muted text-uppercase"
                      isOrderFilter={true}
                      SearchPlaceholder="Search for order ID, customer, order status or something..."
                    />
                  ) : (
                    <Loader />
                  )}
                </div>
                <ToastContainer closeButton={false} limit={1} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AllCompanies;
