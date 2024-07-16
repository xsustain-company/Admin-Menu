import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, UncontrolledDropdown } from 'reactstrap';
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from '../../../Components/Common/TableContainer';
import { getTicketsList as onGetTicketsList, addNewTicket as onAddNewTicket, updateTicket, deleteTicket } from "../../../slices/thunks";

import { TicketsId, Title, Client, AssignedTo, CreateDate, DueDate, Status, Priority } from "./TicketCol";
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { isEmpty } from "lodash";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../Components/Common/Loader";
import { createSelector } from 'reselect';

const TicketsData = () => {
    const dispatch: any = useDispatch();

    const selectLayoutState = (state: any) => state.Tickets;
    const selectLayoutProperties = createSelector(
        selectLayoutState,
        (state) => ({
            ticketsList: state.ticketsList,
            isTicketSuccess: state.isTicketSuccess,
            error: state.error,
        })
    );
    // Inside your component
    const {
        ticketsList, isTicketSuccess, error
    } = useSelector(selectLayoutProperties);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [ticket, setTicket] = useState<any>([]);

    const [ticketdata, setTicketData] = useState<any>([]);


    // Delete Tickets
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setTicket("");
        } else {
            setModal(true);
            setTicket("");
        }
    }, [modal]);

    // validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (ticket && ticket.id) || '',
            ticketId: (ticket && ticket.ticketId) || '',
            title: (ticket && ticket.title) || '',
            client: (ticket && ticket.client) || '',
            assigned: (ticket && ticket.assigned) || '',
            createDate: (ticket && ticket.createDate) || '',
            dueDate: (ticket && ticket.dueDate) || '',
            status: (ticket && ticket.status) || '',
            priority: (ticket && ticket.priority) || '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Title"),
            client: Yup.string().required("Please Enter Client Name"),
            assigned: Yup.string().required("Please Enter Assigned Name"),
            createDate: Yup.string().required("Please Enter Date"),
            dueDate: Yup.string().required("Please Enter Date"),
            status: Yup.string().required("Please Enter Your Joining status"),
            priority: Yup.string().required("Please Enter Your Priority")
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateTickets = {
                    id: ticket ? ticket.id : 0,
                    ticketId: values.ticketId,
                    title: values.title,
                    client: values.client,
                    assigned: values.assigned,
                    createDate: values.createDate,
                    dueDate: values.dueDate,
                    status: values.status,
                    priority: values.priority
                };
                // update ticket
                dispatch(updateTicket(updateTickets));
                validation.resetForm();
            } else {

                const newTicket = {
                    id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    ticketId: "#VLZ4" + (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    title: values["title"],
                    client: values["client"],
                    assigned: values["assigned"],
                    createDate: values["createDate"],
                    dueDate: values["dueDate"],
                    status: values["status"],
                    priority: values["priority"]
                };
                // save new ticket
                dispatch(onAddNewTicket(newTicket));
                validation.resetForm();

            }
            toggle();
        },
    });

    // Delete Data
    const onClickDelete = (ticket: any) => {
        setTicket(ticket);
        setDeleteModal(true);
    };

    const handleDeleteTicket = () => {
        if (ticket) {
            dispatch(deleteTicket(ticket.id));
            setDeleteModal(false);
        }
    };

    // Update Data
    const handleTicketsClick = (arg: any) => {
        const ticket = arg;

        setTicket({
            id: ticket.id,
            ticketId: ticket.ticketId,
            title: ticket.title,
            client: ticket.client,
            assigned: ticket.assigned,
            createDate: ticket.createDate,
            dueDate: ticket.dueDate,
            status: ticket.status,
            priority: ticket.priority
        });

        setIsEdit(true);
        setModal(true);
    };

    // Get Data

    useEffect(() => {
        // if (ticketsList && !ticketsList.length) {
        dispatch(onGetTicketsList());
        // }
    }, [dispatch]);


    useEffect(() => {
        setTicketData(ticketsList);
    }, [ticketsList]);

    useEffect(() => {
        if (!isEmpty(ticketsList)) {
            setTicket(ticketsList);
            setIsEdit(false);
        }
    }, [ticketsList]);

    // Checked All
    const checkedAll = useCallback(() => {
        const checkall: any = document.getElementById("checkBoxAll");
        const ele = document.querySelectorAll(".ticketCheckBox");

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
    const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState<any>([]);
    const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);

    const deleteMultiple = () => {
        const checkall: any = document.getElementById("checkBoxAll");
        selectedCheckBoxDelete.forEach((element: any) => {
            dispatch(deleteTicket(element.value));
            setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
        });
        setIsMultiDeleteButton(false);
        checkall.checked = false;
    };

    const deleteCheckbox = () => {
        const ele = document.querySelectorAll(".ticketCheckBox:checked");
        ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
        setSelectedCheckBoxDelete(ele);
    };

    const columns = useMemo(
        () => [
            {
                header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
                cell: (cell: any) => {
                    return <input type="checkbox" className="ticketCheckBox form-check-input" value={cell.getValue()} onChange={() => deleteCheckbox()} />;
                },
                id: '#',
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                header: "ID",
                accessorKey: "ticketId",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <TicketsId {...cell} />;
                },
            },
            {
                header: "Title",
                accessorKey: "title",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <Title {...cell} />;
                },
            },
            {
                header: "Client",
                accessorKey: "client",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <Client {...cell} />;
                },
            },
            {
                header: "Assigned To",
                accessorKey: "assigned",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <AssignedTo {...cell} />;
                },
            },
            {
                header: "Create Date",
                accessorKey: "createDate",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <CreateDate {...cell} />;
                },
            },
            {
                header: "Due Date",
                accessorKey: "dueDate",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <DueDate {...cell} />;
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
                header: "Priority",
                accessorKey: "priority",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <Priority {...cell} />;
                },
            },
            {
                header: "Actions",
                cell: (cell: any) => {
                    return (
                        <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
                                <i className="ri-more-fill align-middle"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <li><DropdownItem href="/apps-tickets-details"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</DropdownItem></li>
                                <li><DropdownItem className="edit-item-btn" href="#showModal" data-bs-toggle="modal" onClick={() => { const TicketData = cell.row.original; handleTicketsClick(TicketData); }}><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</DropdownItem></li>
                                <li>
                                    <DropdownItem className="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder"
                                        onClick={() => {
                                            const ticketData = cell.row.original;
                                            onClickDelete(ticketData);
                                        }}>
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                                    </DropdownItem>
                                </li>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    );
                },
            },
        ],
        [checkedAll]
    );

    return (
        <React.Fragment>
            <Row>
                <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDeleteTicket}
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
                <Col lg={12}>
                    <Card>
                        <CardHeader className="border-0">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 flex-grow-1">Tickets</h5>
                                <div className="flex-shrink-0">
                                    <div className="d-flex flex-wrap gap-2">
                                        <button className="btn btn-primary add-btn" onClick={() => { setIsEdit(false); toggle(); }}><i className="ri-add-line align-bottom"></i> Create Tickets</button>
                                        {" "}{isMultiDeleteButton && <button className="btn btn-soft-danger"
                                            onClick={() => setDeleteModalMulti(true)}
                                        ><i className="ri-delete-bin-2-line"></i></button>}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className='pt-0'>
                            {isTicketSuccess && ticketdata.length ? (
                                <TableContainer
                                    columns={columns}
                                    data={(ticketdata || [])}
                                    isGlobalFilter={true}
                                    customPageSize={8}
                                    divClass="table-responsive table-card mb-3"
                                    tableClass="align-middle table-nowrap mb-0"
                                    isTicketsListFilter={true}
                                    SearchPlaceholder="Search for ticket details or something..."
                                />
                            )
                                : (<Loader error={error} />)
                            }
                            <ToastContainer closeButton={false} limit={1} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Modal isOpen={modal} toggle={toggle} centered size="lg" className="border-0" modalClassName="zoomIn">
                <ModalHeader toggle={toggle} className="p-3 bg-info-subtle">
                    {!!isEdit ? "Edit Ticket" : "Add Ticket"}
                </ModalHeader>
                <Form className="tablelist-form" onSubmit={(e: any) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                }}>
                    <ModalBody>
                        <Row className="g-3">
                            <Col lg={12}>
                                <div>
                                    <Label htmlFor="tasksTitle-field" className="form-label">Title</Label>
                                    <Input
                                        name="title"
                                        id="tasksTitle-field"
                                        className="form-control"
                                        placeholder="Enter Title"
                                        type="text"
                                        validate={{
                                            required: { value: true },
                                        }}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.title || ""}
                                        invalid={validation.touched.title && validation.errors.title ? true : false}
                                    />
                                    {validation.touched.title && validation.errors.title ? (
                                        <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div>
                                    <Label htmlFor="client_nameName-field" className="form-label">Client</Label>
                                    <Input
                                        name="client"
                                        type="text"
                                        id="client_nameName-field"
                                        placeholder="Enter Client Name"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.client || ""}
                                        invalid={
                                            validation.touched.client && validation.errors.client ? true : false
                                        }
                                    />
                                    {validation.touched.client && validation.errors.client ? (
                                        <FormFeedback type="invalid">{validation.errors.client}</FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div>
                                    <Label htmlFor="assignedtoName-field" className="form-label">Assigned To</Label>
                                    <Input
                                        name="assigned"
                                        type="text"
                                        id="assignedtoName-field"
                                        placeholder="Enter Assigned Name"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.assigned || ""}
                                        invalid={
                                            validation.touched.assigned && validation.errors.assigned ? true : false
                                        }
                                    />
                                    {validation.touched.assigned && validation.errors.assigned ? (
                                        <FormFeedback type="invalid">{validation.errors.assigned}</FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={6}>
                                <Label htmlFor="date-field" className="form-label">Create Date</Label>
                                <Flatpickr
                                    name="createDate"
                                    id="date-field"
                                    className="form-control"
                                    placeholder="Select a date"
                                    options={{
                                        altInput: true,
                                        altFormat: "d M, Y",
                                        dateFormat: "d M, Y",
                                    }}
                                    onChange={(createDate: any) => validation.setFieldValue("createDate", moment(createDate[0]).format("DD MMMM ,YYYY"))}
                                    value={validation.values.createDate || ''}
                                />
                                {validation.errors.createDate && validation.touched.createDate ? (
                                    <FormFeedback type="invalid" className='d-block'>{validation.errors.createDate}</FormFeedback>
                                ) : null}
                            </Col>
                            <Col lg={6}>
                                <Label htmlFor="duedate-field" className="form-label">Due Date</Label>
                                <Flatpickr
                                    name="dueDate"
                                    id="date-field"
                                    className="form-control"
                                    placeholder="Select a date"
                                    options={{
                                        altInput: true,
                                        altFormat: "d M, Y",
                                        dateFormat: "d M, Y",
                                    }}
                                    onChange={(dueDate: any) => validation.setFieldValue("dueDate", moment(dueDate[0]).format("DD MMMM ,YYYY"))}
                                    value={validation.values.dueDate || ''}
                                />
                                {validation.errors.dueDate && validation.touched.dueDate ? (
                                    <FormFeedback type="invalid" className='d-block'>{validation.errors.dueDate}</FormFeedback>
                                ) : null}
                            </Col>
                            <Col lg={6}>
                                <Label htmlFor="ticket-status" className="form-label">Status</Label>
                                <Input
                                    name="status"
                                    type="select"
                                    className="form-select"
                                    id="status-field"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={
                                        validation.values.status || ""
                                    }
                                    invalid={validation.touched.status && validation.errors.status ? true : false}
                                >
                                    <option value="">Status</option>
                                    <option value="New">New</option>
                                    <option value="Inprogress">Inprogress</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Open">Open</option>
                                </Input>
                                {validation.touched.status &&
                                    validation.errors.status ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.status}
                                    </FormFeedback>
                                ) : null}
                            </Col>
                            <Col lg={6}>
                                <Label htmlFor="priority-field" className="form-label">Priority</Label>
                                <Input
                                    name="priority"
                                    type="select"
                                    className="form-select"
                                    id="priority-field"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={
                                        validation.values.priority || ""
                                    }
                                    invalid={validation.touched.priority && validation.errors.priority ? true : false}
                                >
                                    <option value="">Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </Input>
                                {validation.touched.priority &&
                                    validation.errors.priority ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.priority}
                                    </FormFeedback>
                                ) : null}
                            </Col>
                        </Row>

                    </ModalBody>
                    <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                            <button onClick={toggle} type="button" className="btn btn-light">Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{!!isEdit ? "Update" : "Add Ticket"}</button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </React.Fragment>
    );
};

export default TicketsData;