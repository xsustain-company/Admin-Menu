// export default CandidateGrid;
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { jobCandidates } from "../../../../common/data/appsJobs";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Pagination from "../../../../Components/Common/Pagination";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { getCandidateGrid as onGetCandidateGrid, addCandidateGrid as onAddCandidateGrid } from "slices/thunks";
import dummy from "assets/images/users/user-dummy-img.jpg"
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleSearchData } from "Components/Common/SearchingData";

interface ImgData {
  id: number,
  name: string;
  avatar: {
    src: string;
  };
}

const CandidateGrid = () => {
  document.title = "Candidates Grid View | Velzon -  Admin & Dashboard Template";

  const dispatch: any = useDispatch();

  const selectLayoutProperties = createSelector(
    (state: any) => state.Jobs,
    (layout) => ({
      candidategrid: layout.candidategrid,
    })
  );
  // Inside your component
  const { candidategrid } = useSelector(selectLayoutProperties);


  useEffect(() => {
    dispatch(onGetCandidateGrid());
  }, [dispatch]);

  const [calendarGrid, setCalendarGrid] = useState<any>([]);

  //add modal state
  const [modal, setModal] = useState<boolean>(false);
  const handleAddModal = useCallback(() => { setModal(!modal); setEditItem(null); }, [modal]);
  const handleShow = () => setModal(true)

  const [editItem, setEditItem] = useState<any>();
  useEffect(() => {
    setCalendarGrid(candidategrid)
  }, [dispatch, candidategrid])

  const [currentPage, setCurrentPage] = useState<any>(1);
  const [candidategridData, setCandidategridData] = useState<any>();


  //pagination
  const perPageData = 20;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;
  const currentdata = useMemo(() => jobCandidates?.slice(indexOfFirst, indexOfLast), [indexOfFirst, indexOfLast])

  useEffect(() => {
    setCandidategridData(currentdata)
  }, [currentdata]);


  // Modal

  const [imgStore, setImgStore] = useState<any>();

  // image
  const [selectedImage, setSelectedImage] = useState<any>();

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      id: (editItem && editItem.id) || '',
      candidateName: (editItem && editItem.candidateName) || '',
      designation: (editItem && editItem.designation) || '',
      location: (editItem && editItem.location) || '',
      rating1: (editItem && editItem.rating1) || '',
      rating2: (editItem && editItem.rating2) || '',
      userImg: (editItem && editItem.userImg) || '',
      type: (editItem && editItem.type) || '',
    },
    validationSchema: Yup.object({
      userImg: Yup.string().required("Please Enter Image"),
      candidateName: Yup.string().required("Please Enter Your CandidateName"),
      designation: Yup.string().required("Please Enter Your Designation"),
      location: Yup.string().required("Please Enter Location"),
      rating1: Yup.number().required("Please Enter Stars"),
      rating2: Yup.number().required("Please Enter Rating"),
      type: Yup.string().required("Please Enter Status"),
    }),
    onSubmit: (values: any) => {
      const newCandidateadd = {
        id: (Math.floor(Math.random() * (30 - 20)) + 20),
        candidateName: values['candidateName'],
        designation: values['designation'],
        location: values['location'],
        rating1: values['rating1'],
        rating2: values['rating2'],
        userImg: values['userImg'],
        type: values['type']
      }
      dispatch(onAddCandidateGrid(newCandidateadd));
      validation.resetForm();

      if (values === null) {
        handleShow();
      } else {
        handleAddModal();
        setImgStore('');
        setSelectedImage('');
      }
    }
  });

  const handleClick = (item: ImgData) => {
    const newData = [...imgStore, item];
    setImgStore(newData);
    validation.setFieldValue('assignedto', newData)
  }

  useEffect(() => {
    setImgStore((editItem && editItem.assignedto) || [])
  }, [editItem])



  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      validation.setFieldValue('userImg', e.target.result);
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };


  // search
  const handleSearch = (ele: any) => {
    let item = ele.value;

    if (item === "All Tasks") {
      setCalendarGrid([...candidategrid]);
    } else {
      handleSearchData({ data: candidategrid, item: item, setState: setCalendarGrid })
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="container-fluid">
          <BreadCrumb title="Grid View" pageTitle="Candidates Grid" />

          <Row className="g-4 mb-4">
            <Col className="col-sm-auto">
              <div>
                <Link to="#!" className="btn btn-primary" onClick={handleAddModal}>
                  <i className="ri-add-line align-bottom me-1"></i> Add
                  Candidate
                </Link>
              </div>
            </Col>
            <Col className="col-sm">
              <div className="d-md-flex justify-content-sm-end gap-2">
                <div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
                  <Input type="text" className="form-control" id="searchJob" placeholder="Search for candidate name or designation..." autoComplete="off" onChange={(e: any) => handleSearch(e.target)} />
                  <i className="ri-search-line search-icon"></i>
                </div>

                <select className="form-control w-md" data-choices data-choices-search-false>
                  <option value="All">All</option>
                  <option value="Today">Today</option>
                  <option value="Yesterday" defaultValue="">Yesterday</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="Last Year">Last Year</option>
                </select>
              </div>
            </Col>
          </Row>

          <Row className="gy-2 mb-2" id="candidate-list">
            {(candidategridData || []).map((item: any, key: any) => (
              <Col className="col-xxl-3 col-md-6" key={key}>
                <Card className="card">
                  <CardBody className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        {item.nickname ? (
                          <div className="avatar-title border bg-light text-primary rounded text-uppercase fs-24 p-4">
                            {item.nickname}
                          </div>
                        ) : (
                          <div className="avatar-lg rounded">
                            <img
                              src={item.userImg}
                              alt=""
                              className="member-img img-fluid d-block rounded"
                            ></img>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <a href="/pages-profile">
                          <h5 className="fs-16 mb-1">{item.candidateName}</h5>
                        </a>
                        <p className="text-muted mb-2">{item.designation}</p>
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                          <div className="badge text-bg-success">
                            <i className="mdi mdi-star me-1"></i>
                            {item.rating1}
                          </div>
                          <div className="text-muted">{item.rating2}k Ratings</div>
                        </div>
                        <div className="d-flex gap-4 mt-2 text-muted">
                          <div>
                            <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                            {item.location}
                          </div>
                          <div>
                            <i className="ri-time-line text-primary me-1 align-bottom"></i>
                            {item.type === "Part Time" ?
                              <span className="badge bg-danger-subtle text-danger">{item.type}</span>
                              :
                              item.type === "Full Time" ?
                                <span className="badge bg-success-subtle text-success">{item.type}</span>
                                :
                                <span className="badge bg-secondary-subtle text-secondary">{item.type}</span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination
            className="g-0 justify-content-end mb-4"
            perPageData={perPageData}
            data={calendarGrid}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <Modal id="showModal" isOpen={modal} toggle={handleAddModal} centered>
            <ModalHeader className="bg-light p-3" toggle={handleAddModal}>
              Add Candidate
            </ModalHeader>

            <Form className="tablelist-form" onSubmit={(e: any) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}>
              <ModalBody>
                <input type="hidden" id="id-field" />

                <div className="text-center mb-3">
                  <div className="position-relative d-inline-block">
                    <div className="position-absolute bottom-0 end-0">
                      <Label htmlFor="customer-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Image">
                        <div className="avatar-xs cursor-pointer">
                          <div className="avatar-title bg-light border rounded-circle text-muted">
                            <i className="ri-image-fill"></i>
                          </div>
                        </div>
                      </Label>
                      <Input name="userImg" className="form-control d-none" value="" id="customer-image-input" type="file" accept="image/png, image/gif, image/jpeg" onChange={handleImageChange} />
                    </div>
                    <div className="avatar-lg p-1" onClick={(item: any) => handleClick(item)}>
                      <div className="avatar-title bg-light rounded-circle">
                        <img src={selectedImage || dummy } alt="" id="customer-img" className="avatar-md rounded-circle object-cover" />
                      </div>
                    </div>

                  </div>
                  {validation.errors.userImg && validation.touched.userImg ? (
                    <FormFeedback type="invalid" className='d-block'> {validation.errors.userImg} </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label
                    htmlFor="id-field"
                    className="form-label"
                  >
                    Name
                  </Label>
                  <Input
                    name="candidateName"
                    id="id-field"
                    className="form-control"
                    placeholder="Enter Your CandidateName"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.candidateName || ""}
                    invalid={
                      validation.touched.candidateName && validation.errors.candidateName ? true : false
                    }
                  />
                  {validation.touched.candidateName && validation.errors.candidateName ? (
                    <FormFeedback type="invalid">{validation.errors.candidateName}</FormFeedback>
                  ) : null}

                </div>

                <div className="mb-3">
                  <Label
                    htmlFor="id-field"
                    className="form-label"
                  >
                    Designation
                  </Label>
                  <Input
                    name="designation"
                    id="id-field"
                    className="form-control"
                    placeholder="Enter Your Designation"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
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
                  <Label htmlFor="task-type">Time</Label>
                  <Input type="select" className="form-control" id="task-status-input"
                    name="type"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.type || ""}
                    invalid={
                      validation.touched.type && validation.errors.type ? true : false
                    }
                  >
                    <option value="all">Part Time</option>
                    <option defaultValue="New">Full Time</option>
                    <option value="Inprogress">Freelancer</option>
                  </Input>
                  {validation.errors.type && validation.touched.type ? (
                    <FormFeedback type="invalid">{validation.errors.type}</FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label
                    htmlFor="id-field"
                    className="form-label"
                  >
                    Location
                  </Label>
                  <Input
                    name="location"
                    id="id-field"
                    className="form-control"
                    placeholder="Enter Your Location"
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

                <div className="mb-3">
                  <Label
                    htmlFor="id-field"
                    className="form-label"
                  >
                    Stars
                  </Label>
                  <Input
                    name="rating1"
                    id="id-field"
                    className="form-control"
                    placeholder="Enter Your Stars"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.rating1 || ""}
                    invalid={
                      validation.touched.rating1 && validation.errors.rating1 ? true : false
                    }
                  />
                  {validation.touched.rating1 && validation.errors.rating1 ? (
                    <FormFeedback type="invalid">{validation.errors.rating1}</FormFeedback>
                  ) : null}

                </div>

                <div className="mb-3">
                  <Label
                    htmlFor="id-field"
                    className="form-label"
                  >
                    Ratings
                  </Label>
                  <Input
                    name="rating2"
                    id="id-field"
                    className="form-control"
                    placeholder="Enter Your Rating"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.rating2 || ""}
                    invalid={
                      validation.touched.rating2 && validation.errors.rating2 ? true : false
                    }
                  />
                  {validation.touched.rating2 && validation.errors.rating2 ? (
                    <FormFeedback type="invalid">{validation.errors.rating2}</FormFeedback>
                  ) : null}

                </div>


              </ModalBody>
              <div className="modal-footer">
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    Close
                  </button>

                  <button type="submit" className="btn btn-success"> Add Candidate
                  </button>
                </div>
              </div>
            </Form>
          </Modal>
          <ToastContainer closeButton={false} limit={1} />

        </Container>
      </div>
    </React.Fragment>
  );
};

export default CandidateGrid;
