import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import moment from "moment";

import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormFeedback,
} from "reactstrap";


import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Select from "react-select";
import LeadDiscover from "./leadDiscover";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//Import actions
import { getDeals as onGetDeals } from "../../../slices/thunks";
//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const CrmDeals = () => {
  document.title = "Deals | Velzon - React Admin & Dashboard Template";

  const dispatch: any = useDispatch();
  const crmdealsData = createSelector(
    (state: any) => state.Crm,
    (state) => ({
      deals: state.deals
    })
  );
  // Inside your component

  const { deals } = useSelector(crmdealsData);

  useEffect(() => {
    if (deals && !deals.length) {
      dispatch(onGetDeals());
    }
  }, [dispatch, deals]);

  const [sortBy, setsortBy] = useState("Owner");
  const [modal, setModal] = useState<boolean>(false);

  function handlesortBy(sortBy: any) {
    setsortBy(sortBy);
  }

  const sortbyname = [
    {
      options: [
        { label: "Owner", value: "Owner" },
        { label: "Company", value: "Company" },
        { label: "Location", value: "Location" },
      ],
    },
  ];

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
      validation.resetForm();
    }
  };

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      id: '',
      title: '',
      price: '',
      date: '',
      subTitle: '',
      email: '',
      contact: '',
      description: '',
      dealType: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Title"),
      price: Yup.string().required("Please Enter Your Price"),
      date: Yup.string().required("Please Enter Your Date"),
      email: Yup.string().required("Please Enter Your email"),
      contact: Yup.string().required("Please Enter Your contact"),
      description: Yup.string().required("Please Enter Your description"),
      subTitle: Yup.string().required("Please Enter Your Title"),
      dealType: Yup.string().required("Please Enter Your Deal Type")
    }),
    onSubmit: (values) => {
      // console.log(values);
      toggle()
    }
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Deals" pageTitle="CRM" />
          <Card>
            <CardBody>
              <Row className="g-3">
                <Col md={3}>
                  <div className="search-box">
                    <Input
                      type="text"
                      className="form-control search"
                      placeholder="Search for deals..."
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col>
                <div className="col-md-auto ms-auto">
                  <div className="d-flex hastck gap-2 flex-wrap">
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-muted">Sort by: </span>
                      <Select
                        className="mb-0"
                        value={sortBy}
                        onChange={(sortBy: any) => {
                          handlesortBy(sortBy);
                        }}
                        options={sortbyname}
                        id="choices-single-default"
                      ></Select>
                    </div>
                    <button className="btn btn-success" onClick={toggle}>
                      <i className="ri-add-fill align-bottom me-1"></i> Add
                      Deals
                    </button>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        href="#"
                        className="btn btn-soft-info btn-icon fs-14"
                        tag="button"
                      >
                        <i className="ri-settings-4-line"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem className="dropdown-item" href="#">
                          Copy
                        </DropdownItem>
                        <DropdownItem className="dropdown-item" href="#">
                          Move to pipline
                        </DropdownItem>
                        <DropdownItem className="dropdown-item" href="#">
                          Add to exceptions
                        </DropdownItem>
                        <DropdownItem className="dropdown-item" href="#">
                          Switch to common form view
                        </DropdownItem>
                        <DropdownItem className="dropdown-item" href="#">
                          Reset form view to default
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </Row>
            </CardBody>
          </Card>

          <Row className="row-cols-xxl-5 row-cols-lg-3 row-cols-md-2 row-cols-1">
            {deals.map((deal: any, key: any) => (
              <React.Fragment key={key}>
                <LeadDiscover deal={deal} index={key} />
              </React.Fragment>
            ))}
          </Row>
        </Container>
      </div>

      <Modal id="adddeals" isOpen={modal} toggle={toggle} centered>
        <ModalHeader className="bg-light p-3" toggle={toggle}>
          Create Deals
        </ModalHeader>
        <Form onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}>
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="deatType" className="form-label">Deals Type</label>
              <Input type="select" className="form-select" id="deatType"
                name="dealType"
                value={validation.values.dealType || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched.dealType && validation.errors.dealType ? true : false
                }>
                <option value=""
                >Select deals type</option>
                <option value="Lead Disovered">Lead Disovered</option>
                <option value="Contact Initiated">Contact Initiated</option>
                <option value="Need Identified">Need Identified</option>
                <option value="Meeting Arranged">Meeting Arranged</option>
                <option value="Offer Accepted">Offer Accepted</option>
              </Input>
              {validation.touched.dealType && validation.errors.dealType ? (
                <FormFeedback type="invalid">{validation.errors.dealType}</FormFeedback>
              ) : null}

            </div>

            <div className="mb-3">
              <label htmlFor="dealTitle" className="form-label">Deal Title</label>
              <Input type="text" className="form-control" id="dealTitle"
                placeholder="Enter title"
                name="title"
                value={validation.values.title || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched.title && validation.errors.title ? true : false
                }
              />
              {validation.touched.title && validation.errors.title ? (
                <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="dealValue" className="form-label">Value (USD)</label>
              <Input type="number" className="form-control" id="dealValue" step="0.01" placeholder="Enter value"
                name="price"
                value={validation.values.price || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched.price && validation.errors.price ? true : false
                }
              />
              {validation.touched.price && validation.errors.price ? (
                <FormFeedback type="invalid">{validation.errors.price}</FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="dealOwner" className="form-label">Deals Owner</label>
              <Input type="text" className="form-control" id="dealOwner" placeholder="Enter owner name"
                name="subTitle"
                value={validation.values.subTitle || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched.subTitle && validation.errors.subTitle ? true : false
                }
              />
              {validation.touched.subTitle && validation.errors.subTitle ? (
                <FormFeedback type="invalid">{validation.errors.subTitle}</FormFeedback>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label">Due Date</label>
              <Flatpickr
                name="date"
                className="form-control"
                id="customerdate"
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
              <label htmlFor="dealEmail" className="form-label">Email</label>
              <Input type="email" className="form-control" id="dealEmail" placeholder="Enter email"
                name="email"
                value={validation.values.email || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched.email && validation.errors.email ? true : false
                }
              />
              {validation.touched.email && validation.errors.email ? (
                <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">Contact</label>
              <Input type="text" className="form-control" id="contactNumber" placeholder="Enter contact number"
                name="contact"
                value={validation.values.contact || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched.contact && validation.errors.contact ? true : false
                }
              />
              {validation.touched.contact && validation.errors.contact ? (
                <FormFeedback type="invalid">{validation.errors.contact}</FormFeedback>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="contactDescription" className="form-label">Description</label>
              <Input type="textarea" className="form-control" id="contactDescription" rows={3} placeholder="Enter description"
                name="description"
                value={validation.values.description || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched.description && validation.errors.description ? true : false
                }
              />
              {validation.touched.description && validation.errors.description ? (
                <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
              ) : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="light" id="close-modal" onClick={() => { setModal(false); }}>
              Close
            </Button>
            <Button type="submit" color="success">
              <i className="ri-save-line align-bottom me-1"></i> Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default CrmDeals;
