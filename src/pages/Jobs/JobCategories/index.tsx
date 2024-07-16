import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList as onGetCategoryList, addcategoryList as onAddCategoryList } from "slices/thunks";
import { useFormik } from "formik";
import * as  Yup from "yup";


const JobCategories = () => {

  const dispatch: any = useDispatch();

  const profiledropdownData = createSelector(
    (state: any) => state.Jobs,
    (user) => ({
      categoryList: user.categoryList
    })
  );
  // Inside your component
  const { categoryList } = useSelector(profiledropdownData);

  const [categoryData, setCategoryData] = useState<any>([])

  useEffect(() => {
    dispatch(onGetCategoryList());
  }, [dispatch]);

  useEffect(() => {
    setCategoryData(categoryList);
  }, [categoryList]);

  // validation
  const [addvalue, setAddValue] = useState<any>(null);
  const [cateData, setCateData] = useState<boolean>(false);

  const modalToggle = useCallback(() => {
    if (cateData) {
      setCateData(false);
      setAddValue(null);
    } else {
      setCateData(true);
    }
  }, [cateData]);

  const handleButtonClicks = () => {
    validation.resetForm();
    setAddValue("");
    setCateData(!cateData)
    modalToggle();
  };


  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      lable: (addvalue && addvalue.lable) || '',
      position: (addvalue && addvalue.position) || '',
      iconName: (addvalue && addvalue.iconName) || '',
    },
    validationSchema: Yup.object({
      lable: Yup.string().required("Please Enter Category Label."),
      position: Yup.string().required("Please Enter Positions"),
      iconName: Yup.string().required("Please Enter Icon")
    }),
    onSubmit: (values) => {
      const categorisedList = {
        id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        lable: values["lable"],
        position: values["position"],
        iconName: values["iconName"]
      };
      // save new Folder
      dispatch(onAddCategoryList(categorisedList));
      validation.resetForm();
      modalToggle()
    },
  });

  // search
  const handleSearch = (ele: any) => {
    let item = ele.value;

    if (item === "All Tasks") {
      setCategoryData([...categoryList]);
    } else {
      handleSearchData({ data: categoryList, item: item, setState: setCategoryData })
    }
  }

  const handleSearchData = ({ data, item, setState }: any) => {
    setState(
        data.filter((search: any) =>
            Object.values(search).some(
                (field) =>
                    typeof field === 'string' &&
                    field.toLowerCase().includes(item?.toLowerCase()),
            )
        )
    )
}

  document.title = "Job Categories | Velzon -  Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="container-fluid">
          <BreadCrumb title="Job Categories" pageTitle="Jobs" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="justify-content-between gy-3">
                    <Col lg={3}>
                      <div className="search-box">
                        <Input
                          type="text"
                          className="form-control search"
                          placeholder="Search for job categories..."
                          onChange={(e: any) => handleSearch(e.target)}
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                    <Col className="col-lg-auto">
                      <div className="d-md-flex text-nowrap gap-2">
                        <button
                          className="btn btn-info add-btn"
                          onClick={() => handleButtonClicks()}
                        >
                          <i className="ri-add-fill me-1 align-bottom"></i> Add
                          Categories
                        </button>
                        <button className="btn btn-danger">
                          <i className="ri-filter-2-line me-1 align-bottom"></i>{" "}
                          Filters
                        </button>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            type="button"
                            role="button"
                            tag="button"
                            id="dropdownMenuLink1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="btn btn-soft-info"
                          >
                            <i className="ri-more-2-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink1"
                          >
                            <li>
                              <DropdownItem className="dropdown-item" to="#">
                                All
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem className="dropdown-item" to="#">
                                Last Week
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem className="dropdown-item" to="#">
                                Last Month
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem className="dropdown-item" to="#">
                                Last Year
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
          </Row>

          <Row className="row-cols-xxl-5 row-cols-lg-3 row-cols-md-2 row-cols-1">
            {(categoryData || []).map((item: any, key: any) => (
              <Col key={key}>
                <Card>
                  <CardBody className="text-center py-4">
                    <i className={item.icon + " display-5"} style={{color:"#405189"}}/>
                    <Link to="#" className="stretched-link">
                      <h5 className="mt-4">{item.lable}</h5>
                    </Link>
                    <p className="text-muted mb-0">{item.position}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            <Col lg={12}>
              <div className="text-center mb-3">
                <button
                  className="btn btn-link text-success mt-2"
                  id="loadmore"
                >
                  <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>{" "}
                  Load More{" "}
                </button>
              </div>
            </Col>
          </Row>

          <Modal className="fade zoomIn" isOpen={cateData} toggle={() => setCateData(!cateData)} id="createFolderModal" modalClassName="zoomIn" centered tabIndex={-1} >
            <ModalHeader className="p-3 bg-primary-subtle" id="createFolderModalLabel" toggle={() => setCateData(!cateData)}> Add Category </ModalHeader>
            <ModalBody>
              <form autoComplete="off" className="needs-validation createfolder-form" id="createfolder-form" noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >

                <div className="mb-4">
                  <label htmlFor="icon-input" className="form-label">Icon <span className="text-danger">* We have added Remix icon</span></label>
                  <Input type="text" className="form-control" id="icon-input"
                    placeholder="ri-bar-chart-fill"
                    name='iconName'
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.iconName || ""}
                    invalid={validation.touched.iconName && validation.errors.iconName ? true : false}
                  />
                  {validation.touched.iconName && validation.errors.iconName ? (
                    <FormFeedback type="invalid">{validation.errors.iconName}</FormFeedback>
                  ) : null}

                </div>

                <div className="mb-4">
                  <label htmlFor="lable-input" className="form-lable">Category</label>
                  <Input type="text" className="form-control" id="label-input"
                    placeholder="Enter category Label"
                    name='lable'
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.lable || ""}
                    invalid={validation.touched.lable && validation.errors.lable ? true : false}
                  />
                  {validation.touched.lable && validation.errors.lable ? (
                    <FormFeedback type="invalid">{validation.errors.lable}</FormFeedback>
                  ) : null}

                </div>
                <div className="mb-4">
                  <label htmlFor="position-input" className="form-label">Position</label>
                  <Input type="text" className="form-control" id="position-input"
                    placeholder="Enter position"
                    name='position'
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.position || ""}
                    invalid={validation.touched.position && validation.errors.position ? true : false}
                  />
                  {validation.touched.position && validation.errors.position ? (
                    <FormFeedback type="invalid">{validation.errors.position}</FormFeedback>
                  ) : null}

                </div>

                <div className="hstack gap-2 justify-content-end">
                  <button type="button" className="btn btn-ghost-danger" onClick={() => setCateData(false)}><i className="ri-close-line align-bottom"></i> Close</button>
                  <button type="submit" className="btn btn-primary" id="addNewFolder">Add</button>
                </div>
              </form>
            </ModalBody>
          </Modal >

        </Container>
      </div>
    </React.Fragment>
  );
};

export default JobCategories;
