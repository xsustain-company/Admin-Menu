import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    CardBody,
    Row,
    Col,
    Card,
    Container,
    CardHeader,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    ModalFooter,
    Table,
    FormFeedback,
    Button
} from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import CountUp from "react-countup";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteModal from "../../Components/Common/DeleteModal";
import Select from "react-select";
const SingleOptions = [
    { value: 'Choices 1', label: 'Choices 1' },
    { value: 'Choices 2', label: 'Choices 2' },
    { value: 'Choices 3', label: 'Choices 3' },
    { value: 'Choices 4', label: 'Choices 4' }
];
//Import Icons
import FeatherIcon from "feather-icons-react";
import { invoiceWidgets } from "../../common/data/invoiceList";

//Import actions
import {
    getInvoices as onGetInvoices,
    deleteInvoice as onDeleteInvoice,
} from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../Components/Common/Loader";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSelector } from "reselect";
import { useFormik } from "formik";
import * as Yup from "yup";
import Faker from './faker.json'


const FormuliareList = () => {
    const dispatch: any = useDispatch();
    const [selectedMulti2, setselectedMulti2] = useState<any>(null);

    function handleMulti2(selectedMulti2:any) {
        setselectedMulti2(selectedMulti2);
    }
    const selectLayoutState = (state: any) => state.Invoice;
    const selectinvoiceProperties = createSelector(
        selectLayoutState,
        (state) => ({
            invoices: state.invoices,
            isInvoiceSuccess: state.isInvoiceSuccess,
            error: state.error,
        })
    );
    // Inside your component
    const {
        invoices, isInvoiceSuccess, error
    } = useSelector(selectinvoiceProperties);


    //delete invoice
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<Boolean>(false)

    const [invoice, setInvoice] = useState<any>(null);
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: '',

        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            img: Yup.string().required("Please Enter Image"),
            company: Yup.string().required("Please Enter Company"),
            designation: Yup.string().required("Please Enter Designation"),
            email: Yup.string().required("Please Enter Email"),
            phone: Yup.string().required("Please Enter Phone"),
            score: Yup.string().required("Please Enter score"),
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateContact = {

                };
                // update Contact
                validation.resetForm();
            } else {
                /* const newContact = {
                   id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                   img: values["img"],
                   name: values["name"],
                   company: values["company"],
                   designation: values["designation"],
                   email: values["email"],
                   phone: values["phone"],
                   score: values["score"],
                   date: dateFormat(),
                   // time: timeFormat(),
                   tags: assignTag,
                 };*/
                // save new Contact
                //dispatch(onAddNewContact(newContact));
                validation.resetForm();
            }
            toggle();
        },
    });
    const [Forms,setForms] = useState<any>([])
    useEffect(() =>{
        console.log(Forms);
        
    },[Forms])
    function addToForm(data:any){
        setForms((old:any)=>[...old,data])
    }

    useEffect(() => {
        if (invoices && !invoices.length) {
            dispatch(onGetInvoices());
        }
    }, [dispatch, invoices]);

    useEffect(() => {
        setInvoice(invoices);
    }, [invoices]);

    // Delete Data
    const onClickDelete = (invoice: any) => {
        setInvoice(invoice);
        setDeleteModal(true);
    };

    const handleDeleteInvoice = () => {
        if (invoice) {
            dispatch(onDeleteInvoice(invoice._id));
            setDeleteModal(false);
        }
    };


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
        const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
        return updateTime;
    };

    // Checked All
    const checkedAll = useCallback(() => {
        const checkall: any = document.getElementById("checkBoxAll");
        const ele = document.querySelectorAll(".invoiceCheckBox");

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

    //trigger modal 
    const [modal, setModal] = useState<boolean>(false);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);

        } else {
            setModal(true);

        }
    }, [modal]);

    // Delete Multiple
    const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
    const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);

    const deleteMultiple = () => {
        const checkall: any = document.getElementById("checkBoxAll");
        selectedCheckBoxDelete.forEach((element: any) => {
            dispatch(onDeleteInvoice(element.value));
            setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
        });
        setIsMultiDeleteButton(false);
        checkall.checked = false;
    };

    const deleteCheckbox = () => {
        const ele: any = document.querySelectorAll(".invoiceCheckBox:checked");
        ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
        setSelectedCheckBoxDelete(ele);
    };

    //Column
    const columns = useMemo(
        () => [
            {
                header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
                cell: (cell: any) => {
                    return <input type="checkbox" className="invoiceCheckBox form-check-input" value={cell.getValue()} onChange={() => deleteCheckbox()} />;
                },
                id: '#',
                accessorKey: "_id",
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                header: "ID",
                accessorKey: "invoiceId",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <Link to="/apps-invoices-details" className="fw-medium link-primary">{cell.getValue()}</Link>;
                },
            },
            {
                header: "Customer",
                accessorKey: "name",
                enableColumnFilter: false,
                cell: (cell: any) => (
                    <>
                        <div className="d-flex align-items-center">
                            {cell.row.original.img ? <img
                                src={process.env.REACT_APP_API_URL + "/images/users/" + cell.row.original.img}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                            /> :
                                <div className="flex-shrink-0 avatar-xs me-2">
                                    <div className="avatar-title bg-success-subtle text-success rounded-circle fs-13">
                                        {cell.row.original.name.charAt(0) + cell.row.original.name.split(" ").slice(-1).toString().charAt(0)}
                                    </div>
                                </div>}
                            {cell.getValue()}
                        </div>
                    </>
                ),
            },
            {
                header: "EMAIL",
                accessorKey: "email",
                enableColumnFilter: false,
            },
            {
                header: "COUNTRY",
                accessorKey: "country",
                enableColumnFilter: false,
            },
            {
                header: "DATE",
                accessorKey: "date",
                enableColumnFilter: false,
                cell: (cell: any) => (
                    <>
                        {handleValidDate(cell.getValue())},{" "}
                        <small className="text-muted">{handleValidTime(cell.getValue())}</small>
                    </>
                ),
            },
            {
                header: "AMOUNT",
                accessorKey: "amount",
                enableColumnFilter: false,
            },
            {
                header: "PAYMENT STATUS",
                accessorKey: "status",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    switch (cell.getValue()) {
                        case "Paid":
                            return <span className="badge text-uppercase bg-success-subtle text-success"> {cell.getValue()} </span>;
                        case "Unpaid":
                            return <span className="badge text-uppercase bg-warning-subtle text-warning"> {cell.getValue()} </span>;
                        case "Cancel":
                            return <span className="badge text-uppercase bg-danger-subtle text-danger"> {cell.getValue()} </span>;
                        default:
                            return <span className="badge text-uppercase bg-primary-subtle text-primary"> {cell.getValue()} </span>;
                    }
                }
            },
            {
                header: "Action",
                cell: (cellProps: any) => {
                    return (
                        <UncontrolledDropdown >
                            <DropdownToggle
                                href="#"
                                className="btn btn-soft-secondary btn-sm dropdown"
                                tag="button"
                            >
                                <i className="ri-more-fill align-middle"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="/apps-invoices-details">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                </DropdownItem>

                                <DropdownItem href="/apps-invoices-create">
                                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                </DropdownItem>

                                <DropdownItem href="/#">
                                    <i className="ri-download-2-line align-bottom me-2 text-muted"></i>{" "}
                                    Download
                                </DropdownItem>

                                <DropdownItem divider />

                                <DropdownItem
                                    href="#"
                                    onClick={() => { const invoiceData = cellProps.row.original; onClickDelete(invoiceData); }}
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
        [checkedAll]
    );

    document.title = "Invoice List | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <DeleteModal
                    show={deleteModal}
                    onDeleteClick={() => handleDeleteInvoice()}
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
                    <BreadCrumb title="Invoice List" pageTitle="Invoices" />
                    <Col lg={12}>
                        <Card>
                            <CardHeader>
                                <div className="d-flex align-items-center flex-wrap gap-2">
                                    <div className="flex-grow-1">
                                        <button
                                            className="btn btn-primary add-btn"
                                            onClick={() => {
                                                setModal(true);
                                            }}
                                        >
                                            <i className="ri-add-fill me-1 align-bottom"></i> Add
                                            Question
                                        </button>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="hstack text-nowrap gap-2">
                                            {isMultiDeleteButton && <button className="btn btn-soft-danger" id="remove-actions"
                                                onClick={() => setDeleteModalMulti(true)}
                                            ><i className="ri-delete-bin-2-line"></i></button>}
                                            <button className="btn btn-secondary">
                                                <i className="ri-filter-2-line me-1 align-bottom"></i>{" "}
                                                Filters
                                            </button>

                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    href="#"
                                                    className="btn btn-soft-info"
                                                    tag="button"
                                                >
                                                    <i className="ri-more-2-fill"></i>
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-end">
                                                    <DropdownItem className="dropdown-item" href="#">All</DropdownItem>
                                                    <DropdownItem className="dropdown-item" href="#">Last Week</DropdownItem>
                                                    <DropdownItem className="dropdown-item" href="#">Last Month</DropdownItem>
                                                    <DropdownItem className="dropdown-item" href="#">Last Year</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>

                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                        <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                            <ModalHeader className="bg-primary-subtle p-3" toggle={toggle}>
                                {!!isEdit ? "Edit Contact" : "Add Contact"}
                            </ModalHeader>

                            <Form className="tablelist-form" onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                            }}>
                                <ModalBody>
                                    <Input type="hidden" id="id-field" />
                                    <Row className="g-3">

                                        <Col lg={12}>
                                            <div>
                                                <Label
                                                    htmlFor="company_name-field"
                                                    className="form-label"
                                                >
                                                    Company Name
                                                </Label>
                                                <Input
                                                    name="company"
                                                    id="company_name-field"
                                                    className="form-control"
                                                    placeholder="Enter Company Name"
                                                    type="text"
                                                    validate={{
                                                        required: { value: true },
                                                    }}
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
                                        </Col>

                                        <Col lg={12}>
                                            <div>
                                                <Label
                                                    htmlFor="designation-field"
                                                    className="form-label"
                                                >
                                                    Designation
                                                </Label>

                                                <Input
                                                    name="designation"
                                                    id="designation-field"
                                                    className="form-control"
                                                    placeholder="Enter Designation"
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
                                        </Col>

                                        <Col lg={12}>
                                            <div>
                                                <Label
                                                    htmlFor="emailid-field"
                                                    className="form-label"
                                                >
                                                    Email ID
                                                </Label>

                                                <Input
                                                    name="email"
                                                    id="emailid-field"
                                                    className="form-control"
                                                    placeholder="Enter Email"
                                                    type="text"
                                                    validate={{
                                                        required: { value: true },
                                                    }}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.email || ""}
                                                    invalid={
                                                        validation.touched.email && validation.errors.email ? true : false
                                                    }
                                                />
                                                {validation.touched.email && validation.errors.email ? (
                                                    <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                ) : null}

                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div>
                                                <Label
                                                    htmlFor="phone-field"
                                                    className="form-label"
                                                >
                                                    Phone
                                                </Label>

                                                <Input
                                                    name="phone"
                                                    id="phone-field"
                                                    className="form-control"
                                                    placeholder="Enter Phone No."
                                                    type="text"
                                                    validate={{
                                                        required: { value: true },
                                                    }}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.phone || ""}
                                                    invalid={
                                                        validation.touched.phone && validation.errors.phone ? true : false
                                                    }
                                                />
                                                {validation.touched.phone && validation.errors.phone ? (
                                                    <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div>
                                                <Label
                                                    htmlFor="score-field"
                                                    className="form-label"
                                                >
                                                    Lead Score
                                                </Label>

                                                <Input
                                                    name="score"
                                                    id="score-field"
                                                    className="form-control"
                                                    placeholder="Enter Lead Score"
                                                    type="text"
                                                    validate={{
                                                        required: { value: true },
                                                    }}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.score || ""}
                                                    invalid={
                                                        validation.touched.score && validation.errors.score ? true : false
                                                    }
                                                />
                                                {validation.touched.score && validation.errors.score ? (
                                                    <FormFeedback type="invalid">{validation.errors.score}</FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>

                                    </Row>
                                </ModalBody>
                                <ModalFooter>
                                    <div className="hstack gap-2 justify-content-end">
                                        <button type="button" className="btn btn-light" onClick={() => { setModal(false); }} > Close </button>
                                        <button type="submit" className="btn btn-success" id="add-btn"> {!!isEdit ? "Update" : "Add Contact"} </button>
                                    </div>
                                </ModalFooter>
                            </Form>
                        </Modal>
                    </Col>
                    <Row>
                        <Col lg={5}>
                            <Card id="contactList">
                                <CardBody className="py-3 px-3">
                                    {Faker.map((question:any,index:any) =>{
                                        return(
                                            <Col lg={12}>
                                    <Card className="card-body my-3">
                                        <div className="avatar-sm mb-3">
                                            <div className="avatar-title bg-success-subtle text-success fs-17 rounded">
                                                <p>{index}</p>
                                            </div>
                                        </div>
                                        <h4 className="card-text text-muted">{question.type}</h4>
                                        <p className="card-title ">{question.text}</p>
                                        <Button onClick={e=> addToForm(question)} className="btn btn-success">Add to form</Button>
                                    </Card>
                                </Col>
                                        )
                                    })}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={7}>
                            <Card id="contactList">
                                <CardBody className="py-3 px-3">
                                    <Row>
                                    {Forms.map((x:any, index:any) => {
            if (x.type === "text") {
              return (
                <Col lg={12} key={index} className="my-3">
                  <div>
                    <Label htmlFor={`textInput${index}`} className="form-label">{x.text}</Label>
                    <Input type="text" className="form-control" id={`textInput${index}`} />
                  </div>
                </Col>
              );
            } else if (x.type === "checkbox") {
              return (
                <Col lg={12} key={index} className="my-3">
                  <div className="form-check">
                      <Label htmlFor={`textInput${index}`} className="form-label">{x.text}</Label>
                    {x.options.map((option:any, idx:any) => (
                      <div key={idx}>

                        <Input className="form-check-input" type="checkbox" id={`checkbox${index}-${idx}`} value={option.value} />
                        <Label className="form-label" htmlFor={`checkbox${index}-${idx}`}>
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </Col>
              );
            } else if (x.type === "radio") {
              return (
                <Col lg={12} key={index} className="my-3">
                      <Label htmlFor={`textInput${index}`} className="form-label">{x.text}</Label>
                  <div className="form-check">
                    {x.options.map((option:any, idx:any) => (
                      <div key={idx}>

                        <Input className="form-check-input" type="radio" name={`radioGroup${index}`} id={`radio${index}-${idx}`} value={option.value} />
                        <Label className="form-label TEX" htmlFor={`radio${index}-${idx}`}>
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </Col>
              );
            } else if (x.type === "select") {
              return (
                <Col lg={12} key={index} className="my-3">
                  <div className="mb-3">
                    <Label htmlFor={`select${index}`} className="form-label">{x.text}</Label>
                    <Select
                      id={`select${index}`}
                      options={x.options.map((option:any) => ({ value: option.value, label: option.text }))}
                      isClearable={true}
                    />
                  </div>
                </Col>
              );
            } else {
              return null;
            }
          })}
                                    
                                        </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default FormuliareList;