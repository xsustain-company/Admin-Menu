import React, { useState, useEffect, useCallback } from 'react';
import { Col, Container, Dropdown, Form, FormFeedback, Input, Modal, ModalBody, ModalHeader, Row, UncontrolledCollapse } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import Flatpickr from "react-flatpickr";
import moment from "moment";
import Dragula from 'react-dragula';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import taskImg from "../../assets/images/task.png";
import DeleteModal from '../../Components/Common/DeleteModal';

//redux
import { useSelector, useDispatch } from 'react-redux';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

// Import Images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import avatar9 from "../../assets/images/users/avatar-9.jpg";
import avatar10 from "../../assets/images/users/avatar-10.jpg";

//import action
import {
    getTodos as onGetTodos,
    updateTodo as onupdateTodo,
    deleteTodo as onDeleteTodo,
    addNewTodo as onAddNewTodo,

    getProjects as onGetProjects,
    addNewProject as onAddNewProject,
} from "../../slices/thunks";
import { createSelector } from 'reselect';

const Status = ({ status }: any) => {
    switch (status) {
        case "New":
            return <span className="badge bg-info-subtle  text-info text-uppercase">{status}</span>;
        case "Pending":
            return <span className="badge bg-warning-subtle  text-warning text-uppercase">{status}</span>;
        case "Inprogress":
            return <span className="badge bg-secondary-subtle text-secondary  text-uppercase">{status}</span>;
        case "Completed":
            return <span className="badge bg-success-subtle text-success text-uppercase">{status}</span>;
        default:
            return <span className="badge bg-success-subtle text-success text-uppercase">{status}</span>;
    }
};

const Priority = ({ priority }: any) => {
    switch (priority) {
        case "High":
            return <span className="badge bg-danger text-uppercase">{priority}</span>;
        case "Medium":
            return <span className="badge bg-warning text-uppercase">{priority}</span>;
        case "Low":
            return <span className="badge bg-success text-uppercase">{priority}</span>;
        default:
            return <span className="badge bg-success text-uppercase">{priority}</span>;
    }
};

interface ImgData {
    id: number,
    name: string;
    img: string;
}

const ToDoList = () => {
    document.title = "To Do Lists | Velzon - React Admin & Dashboard Template";

    const dispatch: any = useDispatch();

    const selectLayoutState = (state: any) => state.Todos;
    const selectLayoutProperties = createSelector(
        selectLayoutState,
        (state) => ({
            todos: state.todos,
            projects: state.projects,
        })
    );
    // Inside your component
    const {
        todos, projects
    } = useSelector(selectLayoutProperties);


    const [deleteModal, setDeleteModal] = useState<boolean>(false);


    const [taskList, setTaskList] = useState<any>([]);

    // Projects
    const [modalProject, setModalProject] = useState<boolean>(false);

    useEffect(() => {
        dispatch(onGetProjects());
    }, [dispatch]);


    // To do Task List
    // To dos
    const [todo, setTodo] = useState<any>(null);
    const [modalTodo, setModalTodo] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);


    useEffect(() => {
        dispatch(onGetTodos());
    }, [dispatch]);

    useEffect(() => {
        setTodo(todos);
        setTaskList(todos);
    }, [todos]);

    const toggle = useCallback(() => {
        if (modalTodo) {
            setModalTodo(false);
            setTodo(null);
        } else {
            setModalTodo(true);
        }
    }, [modalTodo]);

    // Toggle Project Modal
    const toggleProject = () => {
        if (modalProject) {
            setModalProject(false);
        } else {
            setModalProject(true);
        }
    };

    // Update To do
    const handleTodoClick = useCallback((arg: any) => {
        const todo = arg;

        setTodo({
            id: todo.id,
            task: todo.task,
            dueDate: todo.dueDate,
            status: todo.status,
            priority: todo.priority,
        });

        setIsEdit(true);
        toggle();
    }, [toggle]);

    // Add To do
    const handleTodoClicks = () => {
        setTodo("");
        setModalTodo(!modalTodo);
        setIsEdit(false);
        toggle();
    };

    // Delete To do
    const onClickTodoDelete = (todo: any) => {

        setTodo(todo);
        setDeleteModal(true);
    };

    const handleDeleteTodo = () => {

        if (todo) {
            dispatch(onDeleteTodo(todo.id))

            setDeleteModal(false);
        }

    };

    const sortbystatus = [
        {
            options: [
                { label: "Completed", value: "Completed" },
                { label: "Inprogress", value: "Inprogress" },
                { label: "New", value: "New" },
                { label: "Pending", value: "Pending" },
            ],
        },
    ];

    const sortbypriority = [
        {
            options: [
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
            ],
        },
    ];

    const taskStatus = (e: any) => {
        if (e) {
            setTaskList(todos.filter((item: any) => item.status === e));
        } else {
            setTaskList(todos.filter((item: any) => item.status !== e));
        }
    };

    const searchList = (e: any) => {
        let inputVal = e.toLowerCase();

        function filterItems(arr: any, query: any) {
            return arr.filter(function (el: any) {
                return el.task.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
        }

        let filterData = filterItems(todos, inputVal);
        setTaskList(filterData);
        if (filterData.length === 0) {
            var noresult = document.getElementById("noresult") as HTMLElement;
            noresult.style.display = "block";
            var todoTask = document.getElementById("todo-task") as HTMLElement;
            todoTask.style.display = "none";
        } else {
            var noResult = document.getElementById("noresult") as HTMLElement;
            noResult.style.display = "none";
            var TodoTask = document.getElementById("todo-task") as HTMLElement;
            TodoTask.style.display = "block";
        }
    };

    const taskSort = (e: any) => {
        if (e) {
            setTaskList([...todos].sort((a, b) => a.id - b.id));
            setTaskList([...todos].sort((a, b) => {
                let x = a.task.toLowerCase();
                let y = b.task.toLowerCase();
                if (x < y) {
                    return -1;
                }
                else if (x > y) {
                    return 1;
                } else {
                    return 0;
                }
            }));
        }
    };

    const changeTaskStatus = (e: any) => {
        const activeTask = e.target.value;
        let activeTaskList;
        if (e.target.checked) {
            activeTaskList = taskList.map((item: any) => {
                const tasks = Object.assign({}, item);
                if (tasks.id === activeTask) {
                    tasks.status = "Completed";
                }
                return tasks;
            });
        } else {
            activeTaskList = taskList.map((item: any) => {
                const tasks = Object.assign({}, item);
                if (tasks.id === activeTask) {
                    tasks.status = "Inprogress";
                }
                return tasks;
            });
        }
        setTaskList(activeTaskList);
    };

    // Project validation
    // validation
    const projectValidation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            title: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Project Title"),
        }),
        onSubmit: (values) => {
            const newProjectData = {
                id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                title: values.title,
                subItem: [{ id: 1, version: "v1.0.0", iconClass: "danger" }]
            };
            // save new Project Data
            dispatch(onAddNewProject(newProjectData));
            projectValidation.resetForm();
            toggleProject();
        },
    });

    // To do Task List validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            task: (todo && todo.task) || '',
            dueDate: (todo && todo.dueDate) || '',
            status: (todo && todo.status) || '',
            priority: (todo && todo.priority) || '',
            subItem: (todo && todo.subItem) || ''
        },
        validationSchema: Yup.object({
            task: Yup.string().required("Please Enter Task"),
            status: Yup.string().required("Please Enter Status"),
            priority: Yup.string().required("Please Enter Priority"),
            dueDate: Yup.string().required("Please Enter Date"),
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateTodo = {
                    id: todo ? todo.id : 0,
                    task: values.task,
                    dueDate: values.dueDate,
                    status: values.status,
                    priority: values.priority,
                    subItem: values.subItem,
                };
                // save edit Folder
                dispatch(onupdateTodo(updateTodo));
                validation.resetForm();
            } else {
                const newTodo = {
                    id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    task: values.task,
                    dueDate: values.dueDate,
                    status: values.status,
                    priority: values.priority,
                    subItem: values.subItem
                };
                // save new Folder
                dispatch(onAddNewTodo(newTodo));
                validation.resetForm();
            }
            toggle();
        },
    });

    const assignee = [
        { id: 1, img: avatar2, name: "James Forbes" },
        { id: 2, img: avatar3, name: "John Robles" },
        { id: 3, img: avatar4, name: "Mary Gant" },
        { id: 4, img: avatar1, name: "Curtis Saenz" },
        { id: 5, img: avatar5, name: "Virgie Price" },
        { id: 6, img: avatar10, name: "Anthony Mills" },
        { id: 7, img: avatar6, name: "Marian Angel" },
        { id: 8, img: avatar7, name: "Johnnie Walton" },
        { id: 9, img: avatar8, name: "Donna Weston" },
        { id: 10, img: avatar9, name: "Diego Norris" },
    ];

    const [droplist, setDroplist] = useState(false);

    const dragulaDecorator = (componentBackingInstance: any) => {
        if (componentBackingInstance) {
            let options = {};
            Dragula([componentBackingInstance], options);
        }
    };


    const [imgStore, setImgStore] = useState<any>();

    const handleClick = (item: ImgData) => {
        const newData = [...imgStore, item];
        setImgStore(newData);
        validation.setFieldValue('subItem', newData)
    }
    useEffect(() => {
        setImgStore((todo && todo.subItem) || [])
    }, [todo])

    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteTodo()}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>

                    <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
                        <div className="file-manager-sidebar">
                            <div className="p-4 d-flex flex-column h-100">
                                <div className="mb-3">
                                    <button className="btn btn-info w-100" onClick={() => setModalProject(true)}><i className="ri-add-line align-bottom"></i> Add Project</button>
                                </div>

                                <SimpleBar className="px-4 mx-n4" style={{ height: "calc(100vh - 468px)" }}>
                                    <ul className="to-do-menu list-unstyled" id="projectlist-data">
                                        {(projects || []).map((item: any, key: any) => (

                                            <li key={key}>
                                                <Link to="#" className="nav-link fs-14" id={"todos" + key}>{item.title}</Link>
                                                <UncontrolledCollapse toggler={"#todos" + key}>
                                                    <ul className="mb-0 sub-menu list-unstyled ps-3 vstack gap-2 mb-2">
                                                        {(item.subItem || []).map((item: any, key: any) => (<li key={key}>
                                                            <Link to="#"><i className={"ri-stop-mini-fill align-middle fs-15 text-" + item.iconClass}></i> {item.version}</Link>
                                                        </li>))}
                                                    </ul>
                                                </UncontrolledCollapse>
                                            </li>))}
                                    </ul>
                                </SimpleBar>


                                <div className="mt-auto text-center">
                                    <img src={taskImg} alt="Task" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                        <div className="file-manager-content w-100 p-4 pb-0">
                            <Row className="mb-4">
                                <div className="col-auto order-1 d-block d-lg-none">
                                    <button type="button" className="btn btn-soft-success btn-icon btn-sm fs-16 file-menu-btn">
                                        <i className="ri-menu-2-fill align-bottom"></i>
                                    </button>
                                </div>
                                <div className="col-sm order-3 order-sm-2 mt-3 mt-sm-0">
                                    <h5 className="fw-semibold mb-0">Velzon Admin & Dashboard <span className="badge bg-primary align-bottom ms-2">v1.0.0</span></h5>
                                </div>

                                <div className="col-auto order-2 order-sm-3 ms-auto">
                                    <div className="hstack gap-2">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button className="btn btn-icon fw-semibold btn-soft-danger"><i className="ri-arrow-go-back-line"></i></button>
                                            <button className="btn btn-icon fw-semibold btn-soft-success"><i className="ri-arrow-go-forward-line"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                            <div className="p-3 bg-light rounded mb-4">
                                <Row className="g-2">
                                    <Col className="col-lg-auto">
                                        <select className="form-control" name="choices-select-sortlist" id="choices-select-sortlist" onChange={(e) => taskSort(e.target.value)}>
                                            <option value="">Sort</option>
                                            <option value="By ID">By ID</option>
                                            <option value="By Name">By Name</option>
                                        </select>
                                    </Col>
                                    <Col className="col-lg-auto">
                                        <select className="form-control" name="choices-select-status" id="choices-select-status" onChange={(e) => taskStatus(e.target.value)}>
                                            <option value="">All Tasks</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Inprogress">Inprogress</option>
                                            <option value="Pending">Pending</option>
                                            <option value="New">New</option>
                                        </select>
                                    </Col>
                                    <Col className="col-lg">
                                        <div className="search-box">
                                            <input type="text" id="searchTaskList" className="form-control search" placeholder="Search task name" onKeyUp={(e: any) => searchList(e.target.value)} />
                                            <i className="ri-search-line search-icon"></i>
                                        </div>
                                    </Col>
                                    <Col className="col-lg-auto">
                                        <button className="btn btn-primary createTask" type="button" onClick={() => handleTodoClicks()}>
                                            <i className="ri-add-fill align-bottom" /> Add Tasks
                                        </button>
                                    </Col>
                                </Row>
                            </div>

                            <div className="todo-content position-relative px-4 mx-n4" id="todo-content">

                                {!todos && <div id="elmLoader">
                                    <div className="spinner-border text-primary avatar-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>}

                                <div className="todo-task" id="todo-task">
                                    <div className="table-responsive">
                                        <table className="table align-middle position-relative table-nowrap">
                                            <thead className="table-active">
                                                <tr>
                                                    <th scope="col">Task Name</th>
                                                    <th scope="col">Assigned</th>
                                                    <th scope="col">Due Date</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Priority</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody id="task-list" ref={dragulaDecorator}>
                                                {(taskList || []).map((item: any, key: any) => (<tr key={key}>
                                                    <td>
                                                        <div className="d-flex align-items-start">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div className="task-handle px-1 bg-light rounded">: :
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <div className="form-check">
                                                                    {item.status === "Completed" ? <input className="form-check-input me-1" type="checkbox" value={item.id} id={"todo" + item.id} onChange={(e) => changeTaskStatus(e)} defaultChecked /> :
                                                                        <input className="form-check-input me-1" type="checkbox" value={item.id} id={"todo" + item.id} onChange={(e) => changeTaskStatus(e)} />}
                                                                    <label className="form-check-label" htmlFor={"todo" + item.id}>{item.task} </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="avatar-group">
                                                            {(item.subItem || []).map((item: any, key: any) => (<Link to="#" className="avatar-group-item" key={key}>
                                                                <img src={item.img} alt="" className="rounded-circle avatar-xxs" />
                                                            </Link>))}
                                                        </div>
                                                    </td>
                                                    <td>{item.dueDate}</td>
                                                    <td>
                                                        <Status status={item.status} />
                                                    </td>
                                                    <td>
                                                        <Priority priority={item.priority} />
                                                    </td>
                                                    <td>
                                                        <div className="hstack gap-2">
                                                            <button className="btn btn-sm btn-soft-danger remove-list" onClick={() => onClickTodoDelete(item)}>
                                                                <i className="ri-delete-bin-5-fill align-bottom" />
                                                            </button>
                                                            <button className="btn btn-sm btn-soft-info edit-list" onClick={() => handleTodoClick(item)}>
                                                                <i className="ri-pencil-fill align-bottom" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="py-4 mt-4 text-center" id="noresult" style={{ display: "none" }}>
                                    <i className="ri-search-line display-5 text-success"></i>
                                    <h5 className="mt-4">Sorry! No Result Found</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Modal id="createTask" isOpen={modalTodo} toggle={toggle} modalClassName="zoomIn" centered tabIndex={-1}>
                <ModalHeader toggle={toggle} className="p-3 bg-success-subtle"> {!!isEdit ? "Edit Task" : "Create Task"} </ModalHeader>
                <ModalBody>
                    <div id="task-error-msg" className="alert alert-danger py-2"></div>
                    <Form id="creattask-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}
                    >
                        <input type="hidden" id="taskid-input" className="form-control" />
                        <div className="mb-3">
                            <label htmlFor="task-title-input" className="form-label">Task Title</label>
                            <Input type="text" id="task-title-input" className="form-control" placeholder="Enter task title"
                                name="task"
                                validate={{ required: { value: true }, }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.task || ""}
                                invalid={validation.touched.task && validation.errors.task ? true : false}
                            />
                            {validation.touched.task && validation.errors.task ? (
                                <FormFeedback type="invalid">{validation.errors.task}</FormFeedback>
                            ) : null}
                        </div>
                        <div className="mb-3 position-relative">
                            <label htmlFor="task-assign-input" className="form-label">Assigned To</label>

                            <div className="avatar-group d-flex justify-content-center" id="assignee-member">
                                    {imgStore &&
                                        imgStore.map((imageUrl: ImgData, index: number) => (
                                            <div key={index}>
                                                <Link to="#">
                                                    <img
                                                        src={imageUrl?.img}
                                                        width={36}
                                                        height={36}
                                                        alt=""
                                                        className="rounded-circle avatar-xs"
                                                    />
                                                </Link>
                                            </div>
                                        ))}
                            </div>
                            <div className="select-element">
                                <button className={`btn btn-light w-100 d-flex justify-content-between ${droplist ? 'show' : ''}`} type="button" onClick={() => setDroplist(!droplist)}>
                                    <span>Assigned To<b id="total-assignee" className="mx-1">{imgStore?.length || 0}</b>Members</span> <i className="mdi mdi-chevron-down"></i>
                                </button>
                                <Dropdown>
                                    <div className={`w-100 dropdown-menu ${droplist ? "show" : ""}`}>
                                        <SimpleBar style={{ maxHeight: "141px" }}>
                                            <ul className="list-unstyled mb-0">

                                                {(assignee || []).map((item: any, key: any) => (
                                                    <li key={key}>
                                                        <Link className="dropdown-item d-flex align-items-center" to="#" onClick={() => handleClick(item)}>
                                                            <div className="avatar-xxs flex-shrink-0 me-2">
                                                                <img src={item.img} alt="" className="img-fluid rounded-circle" />
                                                            </div>
                                                            <div className="flex-grow-1">{item.name}</div>
                                                        </Link>
                                                    </li>))}

                                            </ul>
                                        </SimpleBar>
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                        <Row className="g-4 mb-3">
                            <Col lg={6}>
                                <label htmlFor="task-status" className="form-label">Status</label>
                                <Input
                                    name="status"
                                    type="select"
                                    className="form-select"
                                    id="status-field"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.status || ""}
                                    invalid={
                                        validation.touched.status && validation.errors.status ? true : false
                                    }
                                >
                                    {sortbystatus.map((item, key) => (
                                        <React.Fragment key={key}>
                                            {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                                        </React.Fragment>
                                    ))}
                                </Input>
                                {validation.errors.status && validation.touched.status ? (
                                    <FormFeedback type="invalid">{validation.errors.status}</FormFeedback>
                                ) : null}
                            </Col>
                            <Col lg={6}>
                                <label htmlFor="priority-field" className="form-label">Priority</label>
                                <Input
                                    name="priority"
                                    type="select"
                                    className="form-select"
                                    id="priority-field"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.priority || ""}
                                    invalid={
                                        validation.touched.priority && validation.errors.priority ? true : false
                                    }
                                >
                                    {sortbypriority.map((item, key) => (
                                        <React.Fragment key={key}>
                                            {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                                        </React.Fragment>
                                    ))}
                                </Input>
                                {validation.touched.priority &&
                                    validation.errors.priority ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.priority}
                                    </FormFeedback>
                                ) : null}
                            </Col>
                        </Row>
                        <div className="mb-4">
                            <label htmlFor="task-duedate-input" className="form-label">Due Date:</label>
                            <Flatpickr
                                name="dueDate"
                                id="date-field"
                                className="form-control"
                                placeholder="Due date"
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
                        </div>

                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-ghost-success" onClick={() => setModalTodo(false)}><i className="ri-close-fill align-bottom"></i> Close</button>
                            <button type="submit" className="btn btn-primary" id="addNewTodo">{!!isEdit ? "Save" : "Add Task"}</button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal >

            {/* Projects */}
            <Modal id="createProjectModal" isOpen={modalProject} toggle={() => setModalProject(!modalProject)} modalClassName="zoomIn" tabIndex={-1} centered>
                <ModalHeader toggle={() => setModalProject(!modalProject)} className="p-3 bg-success-subtle" id="createProjectModalLabel">
                    Create Project
                </ModalHeader>
                <ModalBody>
                    <form className="needs-validation createProject-form" onSubmit={(e) => {
                        e.preventDefault();
                        projectValidation.handleSubmit();
                        return false;
                    }}>
                        <div className="mb-4">
                            <label htmlFor="projectname-input" className="form-label">Project Name</label>
                            <Input type="text" className="form-control" id="projectname-input"
                                name='title'
                                placeholder="Enter project name"
                                validate={{
                                    required: { value: true },
                                }}
                                onChange={projectValidation.handleChange}
                                onBlur={projectValidation.handleBlur}
                                value={projectValidation.values.title || ""}
                                invalid={projectValidation.touched.title && projectValidation.errors.title ? true : false}
                            />
                            {projectValidation.touched.title && projectValidation.errors.title ? (
                                <FormFeedback type="invalid">{projectValidation.errors.title}</FormFeedback>
                            ) : null}
                            <input type="hidden" className="form-control" id="projectid-input" value="" />
                        </div>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-ghost-success" onClick={() => setModalProject(false)}><i className="ri-close-line align-bottom"></i> Close</button>
                            <button type="submit" className="btn btn-primary" id="addNewProject">Add Project</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>

        </React.Fragment >
    );
};

export default ToDoList;