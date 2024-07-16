import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Nav,
  NavItem,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalBody,
  Label,
  Button,
  NavLink,
  ModalHeader,
  ModalFooter,
  FormFeedback
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import DeleteModal from "../../../Components/Common/DeleteModal";
import classnames from "classnames";
import moment from "moment";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useSelector, useDispatch } from "react-redux";
import { getApplicationList, addNewJobApplicationList, updateJobApplicationList, deleteJobApplicationList } from "../../../slices/thunks";
import TableContainer from "../../../Components/Common/TableContainer";
import { Link } from "react-router-dom";
import {
  AppId,
  Designation,
  Contact,
  Status,
  Type,
} from "./ApplicationCol";
import { createSelector } from "reselect";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import ExportCSVModal from "Components/Common/ExportCSVModal";

const Application = () => {
  document.title = "Application | Velzon - React Admin & Dashboard Template";

  const option = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "Approved", value: "Approved" },
        { label: "New", value: "New" },
        { label: "Pending", value: "Pending" },
        { label: "Rejected", value: "Rejected" },
      ],
    },
  ];

  const option1 = [
    {
      options: [
        { label: "Select Options", value: "Select Options" },
        { label: "Full Time", value: "Full Time" },
        { label: "Part Time", value: "Part Time" },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState<any>("All");

  const toggleTab = (type: any) => {
    if (activeTab !== type) {
      setActiveTab(type);
      let filteredOrders = appList;
      if (type !== "All") {
        filteredOrders = appList.filter((job: any) => job.status === type);
      }
      setApplication(filteredOrders);
    }
  };

  const dispatch: any = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [application, setApplication] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);

  const [eventData, setEventData] = useState<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onClickDelete = (order: any) => {
    setDeleteModal(true);
    if (order.id) {
      setEventData(order);
    }
  };

  const selectapplistData = createSelector(
    (state: any) => state.Jobs,
    (appList) => appList.appList
  );
  // Inside your component
  const appList = useSelector(selectapplistData);

  useEffect(() => {
    dispatch(getApplicationList());
  }, [dispatch]);

  useEffect(() => {
    setApplication(appList);
  }, [appList]);



  // Filter Application Data
  const [date, setDate] = useState([]);
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [search, setSearch] = useState<any>();

  const filterData = () => {
    const keysToSearch = ['designation', 'contacts', 'type', 'status', 'appid', 'company'];
    const filteredData = appList.filter((item: any) => {
      const searchMatch = !search || keysToSearch.some((key: any) => item[key].toLowerCase().includes(search.toLowerCase()));
      const dateMatch = date.length === 0 || (new Date(item.date) >= new Date(date[0]) && new Date(item.date) <= new Date(date[1]));
      const statusMatch = !status || item.status === status;
      const typeMatch = !type || item.type === type;

      return searchMatch && dateMatch && statusMatch && typeMatch;
    });

    setActiveTab("All");
    setApplication(filteredData);
  };

  // Search
  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
    filterData();
  };

  const columns = useMemo(
    () => [
      {
        header: <input type="checkbox" className="form-check-input" id="checkBoxAll" />,
        cell: (cell: any) => {
          return <input type="checkbox" className="orderCheckBox form-check-input" value={cell.getValue()} />;
        },
        id: '#',
        accessorKey: "_id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Application ID",
        accessorKey: "id",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "COMPANY NAME",
        accessorKey: "company",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <img
                  src={cell.row.original.img}
                  alt=""
                  className="avatar-xxs rounded-circle image_src object-fit-cover"
                />
              </div>
              <div className="flex-grow-1 ms-2 ">
                {cell.getValue()}
              </div>
            </div>
          </>
        ),
      },
      {
        header: "Designation",
        accessorKey: "designation",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Designation {...cell} />;
        },
      },
      {
        header: "Apply Date",
        accessorKey: "date",
        enableColumnFilter: false,
        cell: (cell) => <>{cell.getValue()} </>,
      },
      {
        header: "Contact",
        accessorKey: "contacts",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Contact {...cell} />;
        },
      },
      {
        header: "Type",
        accessorKey: "type",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Type {...cell} />;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Status {...cell} />;
        },
      },
      {
        header: "Action",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="/apps-job-details"
                className="text-primary d-inline-block"
              >
                <i className="ri-eye-fill fs-16"></i>
              </Link>
              <UncontrolledTooltip placement="top" target="edittooltip">
                View
              </UncontrolledTooltip>
              <Link
                to="#"
                onClick={() => {
                  const data = cell.row.original;
                  handleUpdateApplicationClick(data);
                }}
                className="text-success"
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const orderData = cell.row.original;
                  onClickDelete(orderData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  const [imgStore, setImgStore] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<any>();

  const handleClick = (item: any) => {
    const newData = [...imgStore, item];
    setImgStore(newData);
    validation.setFieldValue('img', newData);
  };

  useEffect(() => {
    setImgStore((eventData && eventData.img) || []);
  }, [eventData]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      validation.setFieldValue('img', e.target.result);
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Delete Data
  const handleDelete = () => {
    if (eventData) {
      dispatch(deleteJobApplicationList(eventData.id));
      setDeleteModal(false);
    }
  };

  // 

  const toggle = useCallback(() => {
    if (show) {
      setShow(false);
      setEventData("");
      setIsEdit(false);
      setSelectedImage('');
      setImgStore('');
    } else {
      setShow(true);
      setEventData("");
      setSelectedImage('');
      setImgStore('');
    }
  }, [show]);

  // Update Data
  const handleUpdateApplicationClick = (ele: any) => {
    setEventData({ ...ele });
    setIsEdit(true);
    setShow(true);
  };


  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      img: (eventData && eventData.img) || '',
      company: (eventData && eventData.company) || '',
      designation: (eventData && eventData.designation) || '',
      contacts: (eventData && eventData.contacts) || '',
      date: (eventData && eventData.date) || '',
      type: (eventData && eventData.type) || '',
      status: (eventData && eventData.status) || '',
    },
    validationSchema: Yup.object({
      img: Yup.string().required("Please Add Company Image"),
      company: Yup.string().required("Please Enter Company Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      contacts: Yup.string().required("Please Enter Your Contacts"),
      date: Yup.string().required("Please Enter Date"),
      type: Yup.string().required("Please Enter Your Type"),
      status: Yup.string().required("Please Enter Your Status")
    }),

    onSubmit: (values) => {
      if (isEdit) {
        const updateJobApplication = {
          id: eventData ? eventData.id : 0,
          img: values.img,
          date: values.date,
          company: values.company,
          designation: values.designation,
          contacts: values.contacts,
          type: values.type,
          status: values.status,
        };
        // update customer
        dispatch(updateJobApplicationList(updateJobApplication));
      } else {
        const newJobApplication = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          img: values.img,
          date: values.date,
          company: values.company,
          designation: values.designation,
          contacts: values.contacts,
          type: values.type,
          status: values.status,
        };
        // save new customer
        dispatch(addNewJobApplicationList(newJobApplication));
      }
      toggle();
      validation.resetForm();
    },
  });

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className="page-content">
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={application}
        />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDelete}
          onCloseClick={() => setDeleteModal(false)}
        />
        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        />
        <Container fluid>
          <BreadCrumb title="Application" pageTitle="Jobs" />
          <Row>
            <Col>
              <Card>
                <CardHeader className="border-0">
                  <div className="d-md-flex align-items-center">
                    <h5 className="card-title mb-3 mb-md-0 flex-grow-1">
                      Job Application
                    </h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-1 flex-wrap">
                        <Button
                          color="success"
                          type="button"
                          className="add-btn"
                          id="create-btn"
                          onClick={toggle}
                        >
                          <i className="ri-add-line align-bottom me-1"></i>{" "}
                          Create Application
                        </Button>
                        <Button color="info" type="button" onClick={() => setIsExportCSV(true)}>
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="border border-dashed border-end-0 border-start-0">
                  <Form>
                    <Row className="g-3">
                      <Col xxl={5} sm={6}>
                        <div className="search-box">
                          <Input
                            type="text"
                            className="form-control search"
                            placeholder="Search for application ID, company, designation status or something..."
                            onChange={handleSearchChange}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col xxl={2} sm={6}>
                        <div>
                          <Flatpickr
                            className="form-control"
                            id="datepicker-publish-input"
                            placeholder="Select date"
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              mode: "multiple",
                              dateFormat: "d.m.y",
                              onChange: function (selectedDates: any) {
                                setDate(selectedDates.map((item: any) => item),
                                );
                              },
                            }}
                          />
                        </div>
                      </Col>
                      <Col xxl={2} sm={4}>
                        <div>
                          <Select
                            options={option}
                            name="choices-single-default"
                            id="idStatus"
                            onChange={(e: any) => setStatus(e.value)}
                          ></Select>
                        </div>
                      </Col>
                      <Col xxl={2} sm={4}>
                        <div>
                          <Select
                            options={option1}
                            name="choices-single-default"
                            id="idType"
                            onChange={(e: any) => setType(e.value)}
                          ></Select>
                        </div>
                      </Col>
                      <Col xxl={1} sm={4}>
                        <div>
                          <Button
                            type="button"
                            color="info"
                            className="btn w-100"
                            onClick={() => filterData()}
                          >
                            {" "}
                            <i className="ri-equalizer-fill me-1 align-bottom"></i>
                            Filters
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardBody className="pt-0">
                  <div>
                    <Nav
                      className="nav nav-tabs nav-tabs-custom nav-success mb-3"
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "All" }, "All py-3")} onClick={() => { toggleTab("All"); }}>
                          All Application
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className={classnames({ active: activeTab === "New" }, "New py-3")} onClick={() => { toggleTab("New"); }}>
                          New
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className={classnames({ active: activeTab === "Pending" }, "Pending py-3")} onClick={() => { toggleTab("Pending"); }}>
                          Pending{" "}
                          <span className="badge bg-danger align-middle ms-1">
                            2
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className={classnames({ active: activeTab === "Approved" }, "Approved py-3")} onClick={() => { toggleTab("Approved"); }}>
                          Approved
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className={classnames({ active: activeTab === "Rejected" }, "Rejected py-3")} onClick={() => { toggleTab("Rejected"); }}>
                          Rejected
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TableContainer
                      columns={columns}
                      data={application || []}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap"
                      theadClass="table-light text-muted"
                    />
                  </div>

                  <Modal isOpen={show} toggle={toggle} centered={true} >
                    <ModalHeader className="bg-light p-3" toggle={toggle}>
                      {!!isEdit ? "Edit Application" : "Add Application"}
                    </ModalHeader>
                    <Form className="tablelist-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <ModalBody>
                        <Input type="hidden" id="id-field" />

                        <div className="mb-3 d-none" id="modal-id">
                          <Label htmlFor="applicationId" className="form-label"> ID </Label>
                          <Input type="text" id="applicationId" className="form-control" placeholder="ID" readOnly />
                        </div>

                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <div className="position-absolute  bottom-0 end-0">
                              <Label htmlFor="companylogo-image-input" className="mb-0" title="Select Image">
                                <div className="avatar-xs cursor-pointer">
                                  <div className="avatar-title bg-light border rounded-circle text-muted">
                                    <i className="ri-image-fill"></i>
                                  </div>
                                </div>
                              </Label>
                              <Input
                                className="form-control d-none"
                                id="companylogo-image-input"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleImageChange}
                                invalid={
                                  validation.touched.img && validation.errors.img ? true : false
                                }
                              />
                            </div>
                            <div className="avatar-lg p-1" onClick={(item: any) => handleClick(item)}>
                              <div className="avatar-title bg-light rounded-circle">
                                <img
                                  src={selectedImage || validation.values.img}
                                  id="companylogo-img"
                                  className="avatar-md h-auto rounded-circle object-fit-cover"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          {validation.errors.img && validation.touched.img ? (
                            <FormFeedback type="invalid" className='d-block'> {validation.errors.img} </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="company-field" className="form-label"> Company </Label>
                          <Input type="text" id="company-field" className="form-control" placeholder="Enter company name"
                            name="company"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.company || ""}
                            invalid={
                              validation.touched.company && validation.errors.company ? true : false
                            }
                          />
                          {validation.touched.company && validation.errors.company ? (
                            <FormFeedback type="invalid">{validation.errors.company}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="designation-field" className="form-label" > Designation </Label>
                          <Input type="text" id="designation-field" className="form-control" placeholder="Enter designation"
                            name="designation"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.designation || ""}
                            invalid={
                              validation.touched.designation && validation.errors.designation ? true : false
                            }
                          />
                          {validation.touched.designation && validation.errors.designation ? (
                            <FormFeedback type="invalid">{validation.errors.designation}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="date-field" className="form-label" > Apply Date </Label>
                          <Flatpickr
                            name="date"
                            className="form-control"
                            id="date-field"
                            placeholder="Select date"
                            options={{
                              mode: "single",
                              dateFormat: 'd M, Y',
                            }}
                            onChange={(date: any) => validation.setFieldValue("date", moment(date[0]).format("DD MMMM ,YYYY"))}
                            value={validation.values.date || ''}
                          />
                          {validation.errors.date && validation.touched.date ? (
                            <FormFeedback type="invalid" className='d-block'>{validation.errors.date}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="contact-field" className="form-label" > Contacts </Label>
                          <Input type="text" id="contact-field" className="form-control" placeholder="Enter contact"
                            name="contacts"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.contacts || ""}
                            invalid={
                              validation.touched.contacts && validation.errors.contacts ? true : false
                            }
                          />
                          {validation.touched.contacts && validation.errors.contacts ? (
                            <FormFeedback type="invalid">{validation.errors.contacts}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="row gy-4 mb-3">
                          <div className="col-md-6">
                            <div>
                              <Label htmlFor="status-input" className="form-label"> Status </Label>
                              <Input type="select" className="form-control" id="status-input"
                                name="status"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.status || ""}
                                invalid={
                                  validation.touched.status && validation.errors.status ? true : false
                                }
                              >
                                <option value="">Status</option>
                                <option value="Approved">Approved</option>
                                <option value="New">New</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                              </Input>
                              {validation.touched.status && validation.errors.status ? (
                                <FormFeedback type="invalid">{validation.errors.status}</FormFeedback>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div>
                              <Label htmlFor="type-input" className="form-label" > Type </Label>
                              <Input type="select" className="form-control" id="type-input"
                                name="type"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.type || ""}
                                invalid={
                                  validation.touched.type && validation.errors.type ? true : false
                                }
                              >
                                <option value="">Select Type</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                              </Input>
                              {validation.touched.type && validation.errors.type ? (
                                <FormFeedback type="invalid">{validation.errors.type}</FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <Button type="button" className="btn btn-light" onClick={toggle} >
                            Close
                          </Button>
                          <Button type="submit" className="btn btn-success">
                            {!!isEdit ? "Update" : "Add"}
                          </Button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Application;
