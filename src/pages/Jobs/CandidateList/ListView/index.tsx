import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Pagination from "../../../../Components/Common/Pagination";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { getCandidateList as onGetCandidateList } from "slices/thunks";
import AddEditJobCandidateList from "Components/Common/AddEditJobCandidateList";
import { handleSearchData } from "Components/Common/SearchingData";


const CandidateList = () => {
  document.title = "Candidate List View | Velzon -  Admin & Dashboard Template";

  const dispatch: any = useDispatch();

  const selectLayoutProperties = createSelector(
    (state: any) => state.Jobs,
    (layout) => ({
      candidatelist: layout.candidatelist,
    })
  );
  // Inside your component
  const { candidatelist } = useSelector(selectLayoutProperties);
  

  useEffect(() => {
    dispatch(onGetCandidateList());
  }, [dispatch]);

  const [ iscandidate, setCandidate ] = useState<any>([])

   //add modal state
   const [modal, setModal] = useState<boolean>(false);
   const handleAddModal = useCallback(() => { setModal(!modal); setEditItem(null); }, [modal]);
   const handleShow = () => setModal(true)

   const [editItem, setEditItem] = useState<any>();
   useEffect(() => {
    setCandidate(candidatelist)
   }, [dispatch, candidatelist])


  const [isBookmarkClick, setIsBookmarkClick] = useState(false);

  const sortbyname = [
    // {
    //   options: [
        { label: "All", value: "All" },
        { label: "Today", value: "Today" },
        { label: "Yesterday", value: "Yesterday" },
        { label: "Last 7 Days", value: "Last 7 Days" },
        { label: "Last 30 Days", value: "Last 30 Days" },
        { label: "Thise Month", value: "Thise Month" },
        { label: "Last Year", value: "Last Year" },
    //   ],
    // },
  ];

  const [candidateData, setCandidateData] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);

  //pagination
  const perPageData = 8;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;
  const currentdata = useMemo(() => iscandidate?.slice(indexOfFirst, indexOfLast), [iscandidate, indexOfFirst, indexOfLast])

  useEffect(() => {
    setCandidateData(currentdata)
  }, [currentdata]);
  
  // search
  const handleSearch = (ele: any) => {
    let item = ele.value;

    if (item === "All Tasks") {
      setCandidate([...candidatelist]);
    } else {
      handleSearchData({ data: candidatelist, item: item, setState: setCandidate })
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="container-fluid">
          <BreadCrumb title="List View" pageTitle="Candidates Lists" />

          <Row className="row g-4 mb-4">
            <Col className="col-sm">
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
                  <Input
                    type="text"
                    className="form-control"
                    id="searchJob"
                    autoComplete="off"
                    placeholder="Search for candidate name or designation..."
                    onChange={(e) => handleSearch(e.target)}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>

                <select
                  className="form-control w-md"
                  data-choices
                  data-choices-search-false
                >
                  {sortbyname.map((item: any, key: any)=>(
                    <option key={key} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            </Col>
          </Row>

          <Row className="gy-2 mb-2" id="candidate-list">
            {(candidateData || []).map((item: any, key: any) => (
              <Col className="col-lg-12" key={key}>
                <Card className="card mb-0">
                  <CardBody className="card-body">
                    <div className="d-lg-flex align-items-center">
                      <div className="flex-shrink-0">
                        {item.nickname ? (
                          <div className="avatar-title rounded-circle bg-light border-dashed border text-primary fs-18 p-2">
                            {item.nickname}
                          </div>
                        ) : (
                          <div className="avatar-sm rounded h-100">
                            <img
                              src={item.userImg}
                              alt=""
                              className="member-img img-fluid d-block rounded"
                            ></img>
                          </div>
                        )}
                      </div>
                      <div className="ms-3">
                        <Link to="/pages-profile">
                          <h5 className="fs-16 mb-2">{item.candidateName}</h5>
                        </Link>
                        <p className="text-muted mb-0">{item.designation}</p>
                      </div>
                      <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                        <div>
                          <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                          {item.location}
                        </div>
                        <div>
                          <i className="ri-time-line text-primary me-1 align-bottom"></i>{" "}
                          {item.type === "Part Time" ?
                            <span className="badge bg-danger-subtle text-danger">{item.type}</span>
                            :
                            item.type === "Full Time" ?
                              <span className="badge bg-success-subtle text-success">{item.type}</span>
                              :
                              <span className="badge bg-info-subtle text-info">{item.type}</span>
                          }
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-2 align-items-center mx-auto">
                        <div className="badge text-bg-success">
                          <i className="mdi mdi-star me-1"></i>
                          {item.rating1}
                        </div>
                        <div className="text-muted">{item.rating2}k Ratings</div>
                      </div>
                      <div>
                        <Link to="#" className="btn btn-soft-success">
                          View Details
                        </Link>
                        <Link
                          to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsBookmarkClick(!isBookmarkClick)
                          }}
                          className={isBookmarkClick ? "btn btn-ghost-danger btn-icon custom-toggle active" : "btn btn-ghost-danger btn-icon custom-toggle"}
                        >
                          {!isBookmarkClick ?
                            <span className="icon-on">
                              <i className="ri-bookmark-line align-bottom"></i>
                            </span>
                            :
                            <span className="icon-off">
                              <i className="ri-bookmark-3-fill align-bottom"></i>
                            </span>
                          }
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>


          <Pagination
            perPageData={perPageData}
            data={iscandidate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <AddEditJobCandidateList show={modal} editItem={editItem} handleShow={handleShow} handleClose={handleAddModal} />
          <ToastContainer closeButton={false} limit={1} />

        </Container>
      </div>
    </React.Fragment>
  );
};

export default CandidateList;
