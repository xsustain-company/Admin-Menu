import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Label, Modal, ModalBody, Offcanvas, OffcanvasBody, Row, UncontrolledDropdown, FormFeedback } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer } from 'react-toastify';

//User Images
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import userdummyimg from '../../../assets/images/users/user-dummy-img.jpg';

//Small Images
import smallImage9 from '../../../assets/images/small/img-9.jpg';
//redux
import { useSelector, useDispatch } from 'react-redux';

//import action
import {
    getTeamData as onGetTeamData,
    deleteTeamData as onDeleteTeamData,
    addTeamData as onAddTeamData,
    updateTeamData as onUpdateTeamData
} from "../../../slices/thunks";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { createSelector } from 'reselect';

const Team = () => {
    document.title = "Team | Velzon - React Admin & Dashboard Template";

    const dispatch: any = useDispatch();

    const selectteamData = createSelector(
        (state: any) => state.Team,
        (teamData) => teamData.teamData
    );
    // Inside your component
    const teamData = useSelector(selectteamData);

    const [team, setTeam] = useState<any>();
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [teamList, setTeamlist] = useState<any>([]);

    //Modal  
    const [teamMem, setTeamMem] = useState<any>();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(onGetTeamData());
    }, [dispatch]);

    useEffect(() => {
        setTeam(teamData);
        setTeamlist(teamData);
    }, [teamData]);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setTeamMem(null);
            setSelectedImage("")
            setImgStore("")
        } else {
            setModal(true);
        }
    }, [modal]);

    // Update To do
    const handleTeamClick = useCallback((arg: any) => {
        const teamMem = arg;
        setTeamMem({
            id: teamMem.id,
            name: teamMem.name,
            userImage: teamMem.userImage,
            designation: teamMem.designation,
            projectCount: teamMem.projectCount,
            taskCount: teamMem.taskCount,
        });

        setIsEdit(true);
        toggle();
    }, [toggle]);

    // Add To do
    const handleTeamClicks = () => {
        setTeamMem("");
        setModal(!modal);
        setIsEdit(false);
        toggle();
    };

    // delete
    const onClickData = (team: any) => {
        setTeam(team);
        setDeleteModal(true);
    };

    const handleDeleteTeamData = () => {
        if (team) {
            dispatch(onDeleteTeamData(team.id));
            setDeleteModal(false);
        }
    };

    useEffect(() => {
        const list = document.querySelectorAll(".team-list");
        const buttonGroups = document.querySelectorAll('.filter-button');
        for (let i = 0; i < buttonGroups.length; i++) {
            buttonGroups[i].addEventListener('click', onButtonGroupClick);
        }

        function onButtonGroupClick(event: any) {
            const target = event.target as HTMLButtonElement;
            const targetId = target.id;
            const parentTargetId = target.parentElement?.id;

            if (targetId === 'list-view-button' || parentTargetId === 'list-view-button') {
                document.getElementById("list-view-button")?.classList.add("active");
                document.getElementById("grid-view-button")?.classList.remove("active");

                list.forEach((el) => {
                    el.classList.add("list-view-filter");
                    el.classList.remove("grid-view-filter");
                });
            } else {
                document.getElementById("grid-view-button")?.classList.add("active");
                document.getElementById("list-view-button")?.classList.remove("active");

                list.forEach((el) => {
                    el.classList.remove("list-view-filter");
                    el.classList.add("grid-view-filter");
                });
            }
        }
    }, []);

    const favouriteBtn = (ele: any) => {
        if (ele.closest("button").classList.contains("active")) {
            ele.closest("button").classList.remove("active");
        } else {
            ele.closest("button").classList.add("active");
        }
    };

    const searchList = (e: any) => {
        let inputVal = e.toLowerCase();

        const filterItems = (arr: any, query: any) => {
            return arr.filter((el: any) => {
                return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
        };

        let filterData = filterItems(teamData, inputVal);
        setTeamlist(filterData);
        const noResultElement = document.getElementById("noresult");
        const teamListElement = document.getElementById("teamlist");

        if (filterData.length === 0) {
            if (noResultElement) {
                noResultElement.style.display = "block";
            }
            if (teamListElement) {
                teamListElement.style.display = "none";
            }
        } else {
            if (noResultElement) {
                noResultElement.style.display = "none";
            }
            if (teamListElement) {
                teamListElement.style.display = "block";
            }
        }
    };


    //OffCanvas  
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [sideBar, setSideBar] = useState<any>([]);

    //Dropdown
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const toggledropDown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (teamMem && teamMem.id) || '',
            name: (teamMem && teamMem.name) || '',
            userImage: (teamMem && teamMem.userImage) || '',
            designation: (teamMem && teamMem.designation) || '',
            projectCount: (teamMem && teamMem.projectCount) || '',
            taskCount: (teamMem && teamMem.taskCount) || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter team Name"),
            designation: Yup.string().required("Please Enter Your designation"),
            projectCount: Yup.number().required("Please Enter Projects"),
            taskCount: Yup.number().required("Please Enter Tasks"),
        }),
        onSubmit: (values: any) => {
            if (isEdit) {
                const updateTeamData = {
                    id: teamMem ? teamMem.id : 0,
                    name: values.name,
                    userImage: values.userImage,
                    designation: values.designation,
                    projectCount: values.projectCount,
                    taskCount: values.taskCount
                };
                // save edit Team data
                dispatch(onUpdateTeamData(updateTeamData));
                validation.resetForm();
            } else {
                const newTeamData = {
                    id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    name: values.name,
                    userImage: values.userImage,
                    designation: values.designation,
                    projectCount: values.projectCount,
                    taskCount: values.taskCount,
                    backgroundImg: smallImage9
                };
                // save new TeamData
                dispatch(onAddTeamData(newTeamData));
                validation.resetForm();
            }
            toggle();
        },
    });

    // Image Validation
    const [imgStore, setImgStore] = useState<any>();
    const [selectedImage, setSelectedImage] = useState<any>();

    const handleClick = (item: any) => {
        const newData = [...imgStore, item];
        setImgStore(newData);
        validation.setFieldValue('userImage', newData)
    }

    useEffect(() => {
        setImgStore((teamMem && teamMem.userImage) || [])
    }, [teamMem])

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            validation.setFieldValue('userImage', e.target.result);
            setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };


    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteTeamData()}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Team" pageTitle="Pages" />
                    <Card>
                        <CardBody>
                            <Row className="g-2">
                                <Col sm={4}>
                                    <div className="search-box">
                                        <Input type="text" className="form-control" placeholder="Search for name or designation..." onChange={(e) => searchList(e.target.value)} />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </Col>
                                <Col className="col-sm-auto ms-auto">
                                    <div className="list-grid-nav hstack gap-1">

                                        <Button color="info" id="grid-view-button" className="btn btn-soft-info nav-link btn-icon fs-14 active filter-button"><i className="ri-grid-fill"></i></Button>
                                        <Button color="info" id="list-view-button" className="btn btn-soft-info nav-link  btn-icon fs-14 filter-button"><i className="ri-list-unordered"></i></Button>
                                        <Dropdown
                                            isOpen={dropdownOpen}
                                            toggle={toggledropDown}>
                                            <DropdownToggle type="button" className="btn btn-soft-info btn-icon fs-14">
                                                <i className="ri-more-2-fill"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <li><Link className="dropdown-item" to="#">All</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Week</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Month</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Year</Link></li>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Button color="success"
                                            onClick={() => handleTeamClicks()}>
                                            <i className="ri-add-fill me-1 align-bottom"></i> Add Members</Button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <Row>
                        <Col lg={12}>
                            <div id="teamlist">
                                <Row className="team-list grid-view-filter">
                                    {(teamList || []).map((item: any, key: any) => (
                                        <Col key={key}>
                                            <Card className="team-box">
                                                <div className="team-cover">
                                                    <img src={item.backgroundImg} alt="" className="img-fluid" />
                                                </div>
                                                <CardBody className="p-4">
                                                    <Row className="align-items-center team-row">
                                                        <Col className="team-settings">
                                                            <Row>
                                                                <Col>
                                                                    <div className="flex-shrink-0 me-2">
                                                                        <button type="button" className="btn btn-light btn-icon rounded-circle btn-sm favourite-btn" onClick={(e) => favouriteBtn(e.target)}>
                                                                            <i className="ri-star-fill fs-14"></i>
                                                                        </button>
                                                                    </div>
                                                                </Col>

                                                                <UncontrolledDropdown direction='start' className="col text-end">
                                                                    <DropdownToggle tag="a" id="dropdownMenuLink2" role="button">
                                                                        <i className="ri-more-fill fs-17"></i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu>
                                                                        <DropdownItem className="dropdown-item edit-list" href="#addmemberModal" onClick={() => handleTeamClick(item)}>
                                                                            <i className="ri-pencil-line me-2 align-bottom text-muted"></i>Edit
                                                                        </DropdownItem>
                                                                        <DropdownItem className="dropdown-item remove-list" href="#removeMemberModal" onClick={() => onClickData(item)}>
                                                                            <i className="ri-delete-bin-5-line me-2 align-bottom text-muted"></i>Remove
                                                                        </DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={4} className="col">
                                                            <div className="team-profile-img">

                                                                <div className="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
                                                                    {item.userImage != null ?
                                                                        <img src={item.userImage} alt="" className="img-fluid d-block rounded-circle" />
                                                                        :
                                                                        <div className="avatar-title text-uppercase border rounded-circle bg-light text-primary">
                                                                            {item.name.charAt(0) + item.name.split(" ").slice(-1).toString().charAt(0)}
                                                                        </div>}
                                                                </div>
                                                                <div className="team-content">
                                                                    <Link to="#" onClick={() => { setIsOpen(!isOpen); setSideBar(item); }}><h5 className="fs-16 mb-1">{item.name}</h5></Link>
                                                                    <p className="text-muted mb-0">{item.designation}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className="col">
                                                            <Row className="text-muted text-center">
                                                                <Col xs={6} className="border-end border-end-dashed">
                                                                    <h5 className="mb-1">{item.projectCount}</h5>
                                                                    <p className="text-muted mb-0">Projects</p>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <h5 className="mb-1">{item.taskCount}</h5>
                                                                    <p className="text-muted mb-0">Tasks</p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={2} className="col">
                                                            <div className="text-end">
                                                                <Link to="/pages-profile" className="btn btn-light view-btn">View Profile</Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))}

                                    <Col lg={12}>
                                        <div className="text-center mb-3">
                                            <Link to="#" className="text-success"><i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i> Load More </Link>
                                        </div>
                                    </Col>
                                </Row>


                                <div className="modal fade" id="addmembers" tabIndex={1} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <Modal isOpen={modal} toggle={toggle} centered>
                                            <ModalBody>
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}>
                                                    <Row>
                                                        <Col lg={12}>

                                                            <input type="hidden" id="memberid-input" className="form-control" defaultValue="" />
                                                            <div className="px-1 pt-1">
                                                                <div className="modal-team-cover position-relative mb-0 mt-n4 mx-n4 rounded-top overflow-hidden">
                                                                    <img src={smallImage9} alt="" id="cover-img" className="img-fluid" />

                                                                    <div className="d-flex position-absolute start-0 end-0 top-0 p-3">
                                                                        <div className="flex-grow-1">
                                                                            <h5 className="modal-title text-white" id="createMemberLabel">{!isEdit ? "Add New Members" : "Edit Member"}</h5>
                                                                        </div>
                                                                        <div className="flex-shrink-0">
                                                                            <div className="d-flex gap-3 align-items-center">
                                                                                <div>
                                                                                    <label htmlFor="cover-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Select Cover Image">
                                                                                        <div className="avatar-xs">
                                                                                            <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                                                                <i className="ri-image-fill"></i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </label>
                                                                                    <input className="form-control d-none" defaultValue="" id="cover-image-input" type="file" accept="image/png, image/gif, image/jpeg" />
                                                                                </div>
                                                                                <button type="button" className="btn-close btn-close-white" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-center mb-4 mt-n5 pt-2">
                                                                <div className="position-relative d-inline-block">
                                                                    <div className="position-absolute bottom-0 end-0">
                                                                        <label htmlFor="member-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Member Image">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                                                    <i className="ri-image-fill"></i>
                                                                                </div>
                                                                            </div>
                                                                        </label>
                                                                        <Input
                                                                            name="userImage"
                                                                            className="form-control d-none"
                                                                            // defaultValue=""
                                                                            id="member-image-input"
                                                                            type="file"
                                                                            accept="image/png, image/gif, image/jpeg"
                                                                            onChange={handleImageChange}
                                                                            invalid={
                                                                                validation.touched.userImage && validation.errors.userImage ? true : false
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="avatar-lg" onClick={(item: any) => handleClick(item)}>
                                                                        <div className="avatar-title bg-light rounded-circle">
                                                                            <img src={selectedImage || validation.values.userImage || userdummyimg} alt=" " id="member-img" className="avatar-md rounded-circle h-auto" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {validation.errors.userImage && validation.touched.userImage ? (
                                                                    <FormFeedback type="invalid" className='d-block'> {validation.errors.userImage} </FormFeedback>
                                                                ) : null}
                                                            </div>

                                                            <div className="mb-3">
                                                                <Label htmlFor="teammembersName" className="form-label">Name</Label>
                                                                <Input type="text" className="form-control" id="teammembersName" placeholder="Enter name"
                                                                    name='name'
                                                                    validate={{
                                                                        required: { value: true },
                                                                    }}
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.name || ""}
                                                                    invalid={
                                                                        validation.touched.name && validation.errors.name ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.name && validation.errors.name ? (
                                                                    <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="mb-3">
                                                                <Label htmlFor="designation" className="form-label">Designation</Label>
                                                                <Input type="text" className="form-control" id="designation" placeholder="Enter designation" name='designation'
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
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <Label htmlFor="projects" className="form-label">Projects</Label>
                                                                <Input type="text" className="form-control" id="projects" placeholder="Enter projects" name='projectCount'
                                                                    validate={{
                                                                        required: { value: true },
                                                                    }}
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.projectCount || ""}
                                                                    invalid={
                                                                        validation.touched.projectCount && validation.errors.projectCount ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.projectCount && validation.errors.projectCount ? (
                                                                    <FormFeedback type="invalid">{validation.errors.projectCount}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <Label htmlFor="tasks" className="form-label">Tasks</Label>
                                                                <Input type="text" className="form-control" id="tasks" placeholder="Enter tasks" name='taskCount'
                                                                    validate={{
                                                                        required: { value: true },
                                                                    }}
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.taskCount || ""}
                                                                    invalid={
                                                                        validation.touched.taskCount && validation.errors.taskCount ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.taskCount && validation.errors.taskCount ? (
                                                                    <FormFeedback type="invalid">{validation.errors.taskCount}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="hstack gap-2 justify-content-end">
                                                                <button type="button" className="btn btn-light" onClick={() => setModal(false)}>Close</button>
                                                                <button type="submit" className="btn btn-success" id="addNewMember">{!isEdit ? "Add Member" : "Save"}</button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </ModalBody>
                                        </Modal>
                                    </div>
                                </div>


                                <Offcanvas
                                    isOpen={isOpen}
                                    direction="end"
                                    toggle={() => setIsOpen(!isOpen)}
                                    className="offcanvas-end border-0"
                                    tabIndex={1}
                                >
                                    <OffcanvasBody className="profile-offcanvas p-0">
                                        <div className="team-cover">
                                            <img src={sideBar.backgroundImg || smallImage9} alt="" className="img-fluid" />
                                        </div>
                                        <div className="p-3">
                                            <div className="team-settings">
                                                <Row>
                                                    <Col>
                                                        <button type="button" className="btn btn-light btn-icon rounded-circle btn-sm favourite-btn "> <i className="ri-star-fill fs-14"></i> </button>
                                                    </Col>
                                                    <UncontrolledDropdown direction='start' className="col text-end">
                                                        <DropdownToggle tag="a" id="dropdownMenuLink14" role="button">
                                                            <i className="ri-more-fill fs-17"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem><i className="ri-star-line me-2 align-middle" />Favorites</DropdownItem>
                                                            <DropdownItem><i className="ri-delete-bin-5-line me-2 align-middle" />Delete</DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="p-3 text-center">
                                            <img src={sideBar.userImage || avatar2} alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto" />
                                            <div className="mt-3">
                                                <h5 className="fs-15"><Link to="#" className="link-primary">{sideBar.name || "Nancy Martino"}</Link></h5>
                                                <p className="text-muted">{sideBar.designation || "Team Leader & HR"}</p>
                                            </div>
                                            <div className="hstack gap-2 justify-content-center mt-4">
                                                <div className="avatar-xs">
                                                    <Link to="#" className="avatar-title bg-secondary-subtle text-secondary rounded fs-16">
                                                        <i className="ri-facebook-fill"></i>
                                                    </Link>
                                                </div>
                                                <div className="avatar-xs">
                                                    <Link to="#" className="avatar-title bg-success-subtle text-success rounded fs-16">
                                                        <i className="ri-slack-fill"></i>
                                                    </Link>
                                                </div>
                                                <div className="avatar-xs">
                                                    <Link to="#" className="avatar-title bg-info-subtle text-info rounded fs-16">
                                                        <i className="ri-linkedin-fill"></i>
                                                    </Link>
                                                </div>
                                                <div className="avatar-xs">
                                                    <Link to="#" className="avatar-title bg-danger-subtle text-danger rounded fs-16">
                                                        <i className="ri-dribbble-fill"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <Row className="g-0 text-center">
                                            <Col xs={6}>
                                                <div className="p-3 border border-dashed border-start-0">
                                                    <h5 className="mb-1">{sideBar.projectCount || "124"}</h5>
                                                    <p className="text-muted mb-0">Projects</p>
                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="p-3 border border-dashed border-start-0">
                                                    <h5 className="mb-1">{sideBar.taskCount || "81"}</h5>
                                                    <p className="text-muted mb-0">Tasks</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="p-3">
                                            <h5 className="fs-15 mb-3">Personal Details</h5>
                                            <div className="mb-3">
                                                <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Number</p>
                                                <h6>+(256) 2451 8974</h6>
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Email</p>
                                                <h6>nancymartino@email.com</h6>
                                            </div>
                                            <div>
                                                <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Location</p>
                                                <h6 className="mb-0">Carson City - USA</h6>
                                            </div>
                                        </div>
                                        <div className="p-3 border-top">
                                            <h5 className="fs-15 mb-4">File Manager</h5>
                                            <div className="d-flex mb-3">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-danger-subtle text-danger rounded fs-16">
                                                        <i className="ri-image-2-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link to="#">Images</Link></h6>
                                                    <p className="text-muted mb-0">4469 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    12 GB
                                                </div>
                                            </div>
                                            <div className="d-flex mb-3">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-secondary-subtle text-secondary rounded fs-16">
                                                        <i className="ri-file-zip-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link to="#">Documents</Link></h6>
                                                    <p className="text-muted mb-0">46 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    3.46 GB
                                                </div>
                                            </div>
                                            <div className="d-flex mb-3">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-success-subtle text-success rounded fs-16">
                                                        <i className="ri-live-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link to="#">Media</Link></h6>
                                                    <p className="text-muted mb-0">124 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    4.3 GB
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-primary-subtle text-primary rounded fs-16">
                                                        <i className="ri-error-warning-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link to="#">Others</Link></h6>
                                                    <p className="text-muted mb-0">18 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    846 MB
                                                </div>
                                            </div>
                                        </div>
                                    </OffcanvasBody>
                                    <div className="offcanvas-foorter border p-3 hstack gap-3 text-center position-relative">
                                        <button className="btn btn-light w-100"><i className="ri-question-answer-fill align-bottom ms-1"></i> Send Message</button>
                                        <Link to="/pages-profile" className="btn btn-primary w-100"><i className="ri-user-3-fill align-bottom ms-1"></i> View Profile</Link>
                                    </div>
                                </Offcanvas>
                            </div>
                            <div className="py-4 mt-4 text-center" id="noresult" style={{ display: "none" }}>
                                <i className="ri-search-line display-5 text-success"></i>
                                <h5 className="mt-4">Sorry! No Result Found</h5>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Team;