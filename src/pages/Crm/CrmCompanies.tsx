import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

// Import Images
import multiUser from '../../assets/images/users/multi-user.jpg';

import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  ModalBody,
  Label,
  Input,
  Modal,
  ModalHeader,
  Form,
  ModalFooter,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormFeedback
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DeleteModal from "../../Components/Common/DeleteModal";
import { isEmpty } from "lodash";

import chimp from "../../assets/images/brands/mail_chimp.png";

//Import actions
import {
  getCompanies as onGetCompanies,
  addNewCompanies as onAddNewCompanies,
  updateCompanies as onUpdateCompanies,
  deleteCompanies as onDeleteCompanies,
} from "../../slices/thunks";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

// Export Modal
import ExportCSVModal from "../../Components/Common/ExportCSVModal";

import Loader from "../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSelector } from "reselect";

const CrmCompanies = () => {
  const dispatch: any = useDispatch();

  const selectLayoutState = (state: any) => state.Crm;
  const crmcompaniesData = createSelector(
    selectLayoutState,
    (state: any) => ({
      companies: state.companies,
      isCompaniesSuccess: state.isCompaniesSuccess,
      error: state.error,
    })
  );
  // Inside your component
  const {
    companies, error
  } = useSelector(crmcompaniesData);

  const [company, setCompany] = useState<any>([]);

  useEffect(() => {
    // if (companies && !companies.length) {
    dispatch(onGetCompanies());
    // }
  }, [dispatch]);

  useEffect(() => {
    setCompany(companies);
  }, [companies]);

  useEffect(() => {
    if (!isEmpty(companies)) {
      setCompany(companies);
      setIsEdit(false);
    }
  }, [companies]);


  const [isEdit, setIsEdit] = useState<boolean>(false);

  //delete Company
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const industrytype = [
    {
      options: [
        { label: "Select industry type", value: "Select industry type" },
        { label: "Computer Industry", value: "Computer Industry" },
        { label: "Chemical Industries", value: "Chemical Industries" },
        { label: "Health Services", value: "Health Services" },
        {
          label: "Telecommunications Services",
          value: "Telecommunications Services",
        },
        {
          label: "Textiles: Clothing, Footwear",
          value: "Textiles: Clothing, Footwear",
        },
      ],
    },
  ];

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setCompany(null);
      setSelectedImage('');
      setImgStore('');
    } else {
      setModal(true);
    }
  }, [modal]);

  // Delete Data
  const handleDeleteCompany = () => {
    if (company) {
      dispatch(onDeleteCompanies(company.id));
      setDeleteModal(false);
    }
  };

  const onClickDelete = (company: any) => {
    setCompany(company);
    setDeleteModal(true);
  };


  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (company && company.id) || '',
      companyName: (company && company.companyName) || '',
      owner: (company && company.owner) || '',
      industryType: (company && company.industryType) || '',
      rating: (company && company.rating) || '',
      location: (company && company.location) || '',
      employee: (company && company.employee) || '',
      website: (company && company.website) || '',
      contact: (company && company.contact) || '',
      since: (company && company.since) || '',
      picture: (company && company.picture) || '',
    },
    validationSchema: Yup.object({
      picture: Yup.string().required("Please provide a picture"),
      companyName: Yup.string().required("Please Enter CompanyName"),
      owner: Yup.string().required("Please Enter Owner name"),
      industryType: Yup.string().required("Please Enter Industry Type"),
      rating: Yup.string().required("Please Enter Rating"),
      location: Yup.string().required("Please Enter Location"),
      employee: Yup.string().required("Please Enter Employee"),
      website: Yup.string().required("Please Enter Website"),
      contact: Yup.string().required("Please Enter Contact Email"),
      since: Yup.string().required("Please Enter Since"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateCompany = {
          id: company ? company.id : 0,
          companyName: values.companyName,
          owner: values.owner,
          industryType: values.industryType,
          rating: values.rating,
          location: values.location,
          employee: values.employee,
          website: values.website,
          contact: values.contact,
          since: values.since,
          picture: values.picture,
        };
        // update Company
        dispatch(onUpdateCompanies(updateCompany));
        validation.resetForm();
      } else {
        const newCompany = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          owner: values["owner"],
          companyName: values["companyName"],
          industryType: values["industryType"],
          rating: values["rating"],
          location: values["location"],
          employee: values["employee"],
          website: values["website"],
          contact: values["contact"],
          since: values["since"],
          picture: values["picture"],
        };
        // save new Company
        dispatch(onAddNewCompanies(newCompany));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Image

  const [imgStore, setImgStore] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<any>();

  const handleClick = (item: any) => {
    const newData = [...imgStore, item];
    setImgStore(newData);
    validation.setFieldValue('picture', newData);
  };

  useEffect(() => {
    setImgStore((company && company.picture) || []);
  }, [company]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      validation.setFieldValue('picture', e.target.result);
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Update Data
  const handleCompanyClick = useCallback((arg: any) => {
    const company = arg;

    setCompany({
      id: company.id,
      // img: company.img,
      // companyId: company.companyId,
      companyName: company.companyName,
      owner: company.owner,
      industryType: company.industryType,
      rating: company.rating,
      location: company.location,
      employee: company.employee,
      website: company.website,
      contact: company.contact,
      since: company.since,
      picture: company.picture
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".companyCheckBox");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element: any) => {
      dispatch(onDeleteCompanies(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };


  const deleteCheckbox = () => {
    const ele: any = document.querySelectorAll(".companyCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };


  // Column
  const columns = useMemo(
    () => [
      {
        header: <input type="checkbox" className="form-check-input" id="checkBoxAll" onClick={() => checkedAll()} />,
        cell: (cell: any) => {
          return <input type="checkbox" className="companyCheckBox form-check-input" value={cell.getValue()} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Company Name",
        accessorKey: "companyName",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                {cell.row.original.picture ? <img
                  src={cell.row.original.picture}
                  // process.env.REACT_APP_API_URL + "/images/" +
                  alt=""
                  className="avatar-xxs rounded-circle"
                /> :
                  <div className="flex-shrink-0 avatar-xs me-2">
                    <div className="avatar-title bg-success-subtle text-success rounded-circle fs-13">
                      {/* {cell.row.original.name.charAt(0)} */}
                    </div>
                  </div>
                }
              </div>
              <div className="flex-grow-1 ms-2 name">
                {cell.getValue()}
              </div>
            </div>
          </>
        ),
      },
      {
        header: "Owner",
        accessorKey: "owner",
        enableColumnFilter: false,
      },
      {
        header: "Industry Type",
        accessorKey: "industryType",
        enableColumnFilter: false,
      },
      {
        header: "Rating",
        accessorKey: "rating",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            {cell.getValue()}{" "}<i className="ri-star-fill text-warning align-bottom"></i>
          </>
        ),
      },
      {
        header: "Location",
        accessorKey: "location",
        enableColumnFilter: false,
      },
      {
        header: "Action",
        cell: (cell: any) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit" title="Call">
                <Link to="#" className="text-muted d-inline-block">
                  <i className="ri-phone-line fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item edit" title="Message">
                <Link to="#" className="text-muted d-inline-block">
                  <i className="ri-question-answer-line fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item" title="View">
                <Link to="#"
                  onClick={() => { const companyData = cell.row.original; setInfo(companyData); }}
                >
                  <i className="ri-eye-fill align-bottom text-muted"></i>
                </Link>
              </li>
              <li className="list-inline-item" title="Edit">
                <Link className="edit-item-btn" to="#"
                  onClick={() => { const companyData = cell.row.original; handleCompanyClick(companyData); }}
                >
                  <i className="ri-pencil-fill align-bottom text-muted"></i>
                </Link>
              </li>
              <li className="list-inline-item" title="Delete">
                <Link
                  className="remove-item-btn"
                  onClick={() => { const companyData = cell.row.original; onClickDelete(companyData); }}
                  to="#"
                >
                  <i className="ri-delete-bin-fill align-bottom text-muted"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleCompanyClick, checkedAll]
  );

  // SideBar Company Deatail
  const [info, setInfo] = useState<any>([]);

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState<boolean>(false);

  document.title = "Companies | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={companies}
        />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteCompany}
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
          <BreadCrumb title="Companies" pageTitle="CRM" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <div className="flex-grow-1">
                      <button className="btn btn-primary add-btn" onClick={() => { setIsEdit(false); toggle(); }}>
                        <i className="ri-add-fill me-1 align-bottom"></i> Add Company
                      </button>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="hstack text-nowrap gap-2">
                        {isMultiDeleteButton && <button className="btn btn-soft-secondary" id="remove-actions"
                          onClick={() => setDeleteModalMulti(true)}
                        ><i className="ri-delete-bin-2-line"></i></button>}
                        <button className="btn btn-secondary">
                          <i className="ri-filter-2-line me-1 align-bottom"></i>{" "}
                          Filters
                        </button>
                        <button className="btn btn-soft-success" onClick={() => setIsExportCSV(true)}>Export</button>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            href="#"
                            className="btn btn-soft-info btn-icon"
                            tag="button"
                          >
                            <i className="ri-more-2-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem className="dropdown-item" href="#">
                              All
                            </DropdownItem>
                            <DropdownItem className="dropdown-item" href="#">
                              Last Week
                            </DropdownItem>
                            <DropdownItem className="dropdown-item" href="#">
                              Last Month
                            </DropdownItem>
                            <DropdownItem className="dropdown-item" href="#">
                              Last Year
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Col>
            <Col xxl={9}>
              <Card id="companyList">

                <CardBody className="pt-0">
                  <div>
                    {companies && companies.length > 0 ? (
                      <TableContainer
                        columns={columns}
                        data={(companies || [])}
                        isGlobalFilter={true}
                        customPageSize={7}
                        divClass="table-responsive table-card mb-2"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light"
                        isCompaniesFilter={true}
                        SearchPlaceholder='Search for company...'
                      />
                    ) : (<Loader error={error} />)
                    }
                  </div>
                  <Modal id="showModal" isOpen={modal} toggle={toggle} centered size="lg">
                    <ModalHeader className="bg-primary-subtle p-3" toggle={toggle}>
                      {!!isEdit ? "Edit Company" : "Add Company"}
                    </ModalHeader>
                    <Form className="tablelist-form" onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}>
                      <ModalBody>
                        <input type="hidden" id="id-field" />
                        <Row className="g-3">
                          <Col lg={12}>
                            <div className="text-center">
                              <div className="position-relative d-inline-block">
                                <div className="position-absolute bottom-0 end-0">
                                  <Label htmlFor="company-logo-input" className="mb-0">
                                    <div className="avatar-xs cursor-pointer">
                                      <div className="avatar-title bg-light border rounded-circle text-muted">
                                        <i className="ri-image-fill"></i>
                                      </div>
                                    </div>
                                  </Label>
                                  <Input
                                    name="picture"
                                    className="form-control d-none" id="company-logo-input" type="file"
                                    accept="image/png, image/gif, image/jpeg" onChange={handleImageChange}
                                    invalid={validation.touched.picture && validation.errors.picture ? true : false}
                                  />
                                </div>
                                <div className="avatar-lg p-1" onClick={(item: any) => handleClick(item)}>
                                  <div className="avatar-title bg-light rounded-circle">
                                    <img src={selectedImage || validation.values.picture || multiUser} alt="multiUser" id="companylogo-img" className="avatar-md rounded-circle object-fit-cover" />
                                  </div>
                                </div>
                              </div>
                              <h5 className="fs-13 mt-3">Company Logo</h5>
                              {validation.errors.picture && validation.touched.picture ? (
                                <FormFeedback type="invalid" className='d-block'> {validation.errors.picture} </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="name-field"
                                className="form-label"
                              >
                                Company Name
                              </Label>

                              <Input
                                name="companyName"
                                id="customername-field"
                                className="form-control"
                                placeholder="Enter Company Name"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.companyName || ""}
                                invalid={
                                  validation.touched.companyName && validation.errors.companyName ? true : false
                                }
                              />
                              {validation.touched.companyName && validation.errors.companyName ? (
                                <FormFeedback type="invalid">{validation.errors.companyName}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="owner-field"
                                className="form-label"
                              >
                                Owner Name
                              </Label>
                              <Input
                                name="owner"
                                id="owner-field"
                                className="form-control"
                                placeholder="Enter Owner Name"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.owner || ""}
                                invalid={
                                  validation.touched.owner && validation.errors.owner ? true : false
                                }
                              />
                              {validation.touched.owner && validation.errors.owner ? (
                                <FormFeedback type="invalid">{validation.errors.owner}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="industryType-field"
                                className="form-label"
                              >
                                Industry Type
                              </Label>

                              <Input
                                name="industryType"
                                type="select"
                                className="form-select"
                                id="industryType-field"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.industryType || ""}
                                invalid={
                                  validation.touched.industryType && validation.errors.industryType ? true : false
                                }
                              >
                                {industrytype.map((item, key) => (
                                  <React.Fragment key={key}>
                                    {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                                  </React.Fragment>
                                ))}
                              </Input>
                              {validation.touched.industryType &&
                                validation.errors.industryType ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.industryType}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="rating-field"
                                className="form-label"
                              >
                                Rating
                              </Label>
                              <Input
                                name="rating"
                                id="rating-field"
                                className="form-control"
                                placeholder="Enter Rating"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rating || ""}
                                invalid={
                                  validation.touched.rating && validation.errors.rating ? true : false
                                }
                              />
                              {validation.touched.rating && validation.errors.rating ? (
                                <FormFeedback type="invalid">{validation.errors.rating}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="location-field"
                                className="form-label"
                              >
                                location
                              </Label>
                              <Input
                                name="location"
                                id="rating-field"
                                className="form-control"
                                placeholder="Enter Location"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.location || ""}
                                invalid={
                                  validation.touched.location && validation.errors.location ? true : false
                                }
                              />
                              {validation.touched.location && validation.errors.location ? (
                                <FormFeedback type="invalid">{validation.errors.location}</FormFeedback>
                              ) : null}

                            </div>
                          </Col>
                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="employee-field"
                                className="form-label"
                              >
                                Employee
                              </Label>
                              <Input
                                name="employee"
                                id="employee-field"
                                className="form-control"
                                placeholder="Enter employee"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.employee || ""}
                                invalid={
                                  validation.touched.employee && validation.errors.employee ? true : false
                                }
                              />
                              {validation.touched.employee && validation.errors.employee ? (
                                <FormFeedback type="invalid">{validation.errors.employee}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="website-field"
                                className="form-label"
                              >
                                Website
                              </Label>
                              <Input
                                name="website"
                                id="website-field"
                                className="form-control"
                                placeholder="Enter website"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.website || ""}
                                invalid={
                                  validation.touched.website && validation.errors.website ? true : false
                                }
                              />
                              {validation.touched.website && validation.errors.website ? (
                                <FormFeedback type="invalid">{validation.errors.website}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="contact-field"
                                className="form-label"
                              >
                                Contact Email
                              </Label>
                              <Input
                                name="contact"
                                id="contact-field"
                                className="form-control"
                                placeholder="Enter Contact email"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.contact || ""}
                                invalid={
                                  validation.touched.contact && validation.errors.contact ? true : false
                                }
                              />
                              {validation.touched.contact && validation.errors.contact ? (
                                <FormFeedback type="invalid">{validation.errors.contact}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="since-field"
                                className="form-label"
                              >
                                Since
                              </Label>
                              <Input
                                name="since"
                                id="since-field"
                                className="form-control"
                                placeholder="Enter since"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.since || ""}
                                invalid={
                                  validation.touched.since && validation.errors.since ? true : false
                                }
                              />
                              {validation.touched.since && validation.errors.since ? (
                                <FormFeedback type="invalid">{validation.errors.since}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <Button color="light" onClick={() => { setModal(false); }} > Close </Button>
                          <Button type="submit" color="success" id="add-btn" >  {!!isEdit ? "Update" : "Add Company"} </Button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <ToastContainer closeButton={false} limit={1} />
                </CardBody>
              </Card>
            </Col>
            <Col xxl={3}>
              <Card id="company-view-detail">
                <CardBody className="text-center">
                  <div className="position-relative d-inline-block">
                    <div className="avatar-md">
                      <div className="avatar-title bg-light rounded-circle">
                        <img src={info.picture || chimp} alt="" className="avatar-sm rounded-circle object-fit-cover" />
                      </div>
                    </div>
                  </div>
                  <h5 className="mt-3 mb-1">{info.name || "Syntyce Solution"}</h5>
                  <p className="text-muted">{info.owner || "Michael Morris"}</p>

                  <ul className="list-inline mb-0">
                    <li className="list-inline-item avatar-xs">
                      <Link
                        to="#"
                        className="avatar-title bg-success-subtle text-success fs-15 rounded"
                      >
                        <i className="ri-global-line"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item avatar-xs">
                      <Link
                        to="#"
                        className="avatar-title bg-danger-subtle text-danger fs-15 rounded"
                      >
                        <i className="ri-mail-line"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item avatar-xs">
                      <Link
                        to="#"
                        className="avatar-title bg-warning-subtle text-warning fs-15 rounded"
                      >
                        <i className="ri-question-answer-line"></i>
                      </Link>
                    </li>
                  </ul>
                </CardBody>
                <div className="card-body">
                  <h6 className="text-muted text-uppercase fw-semibold mb-3">
                    Information
                  </h6>
                  <p className="text-muted mb-4">
                    A company incurs fixed and variable costs such as the
                    purchase of raw materials, salaries and overhead, as
                    explained by AccountingTools, Inc. Business owners have the
                    discretion to determine the actions.
                  </p>
                  <div className="table-responsive table-card">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-medium">
                            Industry Type
                          </td>
                          <td>{info.industryType || "Chemical Industries"}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Location
                          </td>
                          <td>{info.location || "Damascus, Syria"}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Employee
                          </td>
                          <td>{info.employee || "10-50"}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Rating
                          </td>
                          <td>
                            {info.rating || "4.0"}{" "}
                            <i className="ri-star-fill text-warning align-bottom"></i>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Website
                          </td>
                          <td>
                            <Link
                              to="#"
                              className="link-primary text-decoration-underline"
                            >
                              {info.website || "www.syntycesolution.com"}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Contact Email
                          </td>
                          <td>{info.contact || "info@syntycesolution.com"}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Since
                          </td>
                          <td>{info.since || "1995"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CrmCompanies;
