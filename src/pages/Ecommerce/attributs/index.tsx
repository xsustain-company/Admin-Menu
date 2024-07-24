import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import makeAnimated from "react-select/animated";

import { Link } from "react-router-dom";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { isEmpty } from "lodash";
import { getCategoriess , getSubCategoriess, getCompaniess, getAttributs } from "slices/companies/thunk";
import Select from "react-select";

// Export Modal
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import actions
import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "../../../slices/thunks";

import Loader from "../../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSelector } from "reselect";
import moment from "moment";
import { addAttributApi, addCategoryApi, addSubCategoryApi } from "helpers/fakebackend_helper";

const AttributsManagement = () => {
  const [order, setOrder] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [modalView, setModalView] = useState<boolean>(false);
  const [modalAddSubCategorie, setModalAddSubCategorie] = useState<boolean>(false);
  const [isAddSubCategorie,setIsAddSubCategorie] = useState<boolean>(false);

  const dispatch: any = useDispatch();
  const slectedCompanies = createSelector(
    (state: any) => state.Companies,
    (Companies) => Companies.attributs
  );
  // Inside your component
  const companies = useSelector(slectedCompanies);

  const selectLayoutState = (state: any) => state.Ecommerce;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (ecom) => ({
      orders: ecom.orders,
      isOrderSuccess: ecom.isOrderSuccess,
      error: ecom.error,
    })
  );
  useEffect(()=>{
    dispatch(getAttributs())
  },[])

  const selectedAttributes = createSelector(
    (state: any) => state.Companies,
    (attributes) => attributes.attributs
  );
  // Inside your component
  const attributes = useSelector(selectedAttributes);
  useEffect(()=>{
    console.log(attributes);
    
  },[attributes])

  // Inside your component
  const {
    orders, isOrderSuccess, error
  } = useSelector(selectLayoutProperties);
  


  const [isEdit, setIsEdit] = useState<boolean>(false);
  
  
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<any>([]);
  useEffect(()=>{
    console.log(subCategories);
    
  },[
    subCategories
  ])
  const onClickDelete = (order: any) => {
    setOrder(order);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (order) {
      dispatch(onDeleteOrder(order.id));
      setDeleteModal(false);
    }
  };


  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name:'',
      description :"",
      orderId: (order && order.orderId) || '',
      customer: (order && order.customer) || '',
      product: (order && order.product) || '',
      orderDate: (order && order.orderDate) || '',
      amount: (order && order.amount) || '',
      payment: (order && order.payment) || '',
      status: (order && order.status) || '',

    },
    validationSchema: Yup.object({
     /* orderId: Yup.string().required("Please Enter order Id"),
      customer: Yup.string().required("Please Enter Customer Name"),
      product: Yup.string().required("Please Enter Product Name"),
      orderDate: Yup.string().required("Please Enter Order Date"),
      amount: Yup.string().required("Please Enter Total Amount"),
      payment: Yup.string().required("Please Enter Payment Method"),
      status: Yup.string().required("Please Enter Delivery Status")*/
    }),
    onSubmit:async (values) => {

     
        
        const newAttribut = {
          name: values["name"],
          description: values["description"],

         
        };
        try{
          const  response = await addAttributApi(newAttribut);

          toast.success("Attribut added")
          dispatch(getAttributs())
        }catch(error){
          toast.error("Attribut failed ")
        }
       
        validation.resetForm();
  
      toggle();
    },
  });
  

  useEffect(() => {
    setOrder(companies);
  }, [companies]);

  useEffect(() => {
    if (!isEmpty(companies)) {
      setOrder(companies);
      setIsEdit(false);
    }
  }, [companies]);


  const [selectedMulti3, setselectedMulti3] = useState<any>(null);
  const[subCategoriesToAdd,setSubCategoriesToAdd]= useState<any>(null);
  function handleMulti3(selectedMulti3: any) {
    const ids = selectedMulti3.map((item: any) => item.value);

    // Set the IDs to the state
    setSubCategoriesToAdd(ids);
      
    setselectedMulti3(selectedMulti3);
  }

  const toggleView = useCallback(() => {
    if (modalView) {
      setModalView(false);
      setCategory(null);
    } else {
      setModalView(true);
    }
  }, [modalView]);
  const toggleAddSubCategorie = useCallback(() => {
    if (modalAddSubCategorie) {
      setModalAddSubCategorie(false);
      setCategory(null);
    } else {
      setIsAddSubCategorie(true)
      setModalAddSubCategorie(true);
    }
  }, [modalAddSubCategorie]);
  

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const handleOrderClick = useCallback((arg: any) => {
    const order = arg;
    setOrder({
      id: order.id,
      orderId: order.orderId,
      customer: order.customer,
      product: order.product,
      orderDate: order.orderDate,
      ordertime: order.ordertime,
      amount: order.amount,
      payment: order.payment,
      status: order.status
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);
  const animatedComponents = makeAnimated();
  const [formatedOptions,setFormatedOptions] = useState([])
    useEffect(()=>{console.log(formatedOptions);
    },[formatedOptions])
  
  const handleViewCategorie = useCallback((arg: any) => {
    console.log(arg);
    setModalView(true)

    const category = arg;
    setCategory({
      id:category._id,
      subcategory : category.subcategory,
      name: category.name,
      subCategories: category.subcategory,
      createdAt: category.createdAt,
    });
    

    //setIsEdit(true);
    //toggle();
  }, [toggle]);

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".orderCheckBox");
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
      dispatch(onDeleteOrder(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".orderCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  

  
  // Column
  const columns = useMemo(
    () => [
      {
        header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        cell: (cell: any) => {
          return <input type="checkbox" className="orderCheckBox form-check-input" value={cell.getValue()} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
        accessorKey: 'id',
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "attribut Id",
        accessorKey: "_id",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Link to={`/apps-ecommerce-order-details?id=${cell.getValue()}`} className="fw-medium link-primary">{cell.getValue()}</Link>;
        },
      },
      {
        header: "attribut Name",
        accessorKey: "name",
        enableColumnFilter: false,
      },
     
      {
        header: "createdAt",
        accessorKey: "createdAt",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            {handleValidDate(cell.getValue())},
            <small className="text-muted"> {handleValidTime(cell.getValue())}</small>
          </>
        ),
      },
    

      {
        header: "Action",
        cell: (cellProps: any) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
              <Link
                  to="#"
                  className="text-primary d-inline-block edit-item-btn"
                  onClick={() => {
                    const orderData = cellProps.row.original;
                    console.log(cellProps);

                    handleViewCategorie(orderData);

                  }}
                >
                  <i className="ri-eye-fill fs-16"></i>
                </Link>
               
              </li>
              <li className="list-inline-item edit">
                <Link
                  to="#"
                  className="text-primary d-inline-block edit-item-btn"
                  onClick={() => {
                    const orderData = cellProps.row.original;
                    handleOrderClick(orderData);

                  }}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={() => {
                    const orderData = cellProps.row.original;
                    onClickDelete(orderData);
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleOrderClick, checkedAll]
  );

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

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState<boolean>(false);

  document.title = "Orders | Velzon - React Admin & Dashboard Template";
  return (
    <div className="page-content">
      <ExportCSVModal
        show={isExportCSV}
        onCloseClick={() => setIsExportCSV(false)}
        data={companies}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
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
        <BreadCrumb title="Orders" pageTitle="Ecommerce" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Attributs </h5>
                  </div>
                  <div className="col-sm-auto">
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => { setIsEdit(false); toggle(); }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Create
                        Attribut
                      </button>
                     
                      
                      
                    
                      
                    </div>
                  </div>
                </Row>
              </CardHeader>

              <CardBody className="pt-0">
                <div>
                 

                  {attributes.length>=0 ? (
                    <TableContainer
                      columns={columns}
                      data={(attributes || [])}
                      isGlobalFilter={true}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1 mt-0"
                      tableClass="align-middle table-nowrap"
                      theadClass="table-light text-muted text-uppercase"
                      isOrderFilter={true}
                      SearchPlaceholder='Search for order ID, customer, order status or something...'
                    />
                  ) : (<Loader error={error} />)
                  }
                </div>
                <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                  <ModalHeader className="bg-light p-3" toggle={toggle}>
                    {!!isEdit ? "Edit Order" : "Add Category"}
                  </ModalHeader>
                  <Form className="tablelist-form" onSubmit={(e: any) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}>
                    <ModalBody>
                      <input type="hidden" id="id-field" />

               

                      <div className="mb-3">
                        <Label
                          htmlFor="customername-field"
                          className="form-label"
                        >
                          Attribut Name
                        </Label>
                        <Input
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Enter Attribut Name"
                          type="text"
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
                        <br></br>
                        <Col md="12">
                <Label>Description</Label>
                <Input
                          name="description"
                          id="description"
                          className="form-control"
                          placeholder="Enter Attribut description"
                          type="text"
                          validate={{
                            required: { value: true },
                          }}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.description || ""}
                          invalid={
                            validation.touched.description && validation.errors.description ? true : false
                          }
                        />
                        {validation.touched.description && validation.errors.description ? (
                          <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                        ) : null}
               
              </Col>

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

                        <button type="submit" className="btn btn-success">
                          {!!isEdit
                            ? "Update"
                            : "Add Category"}
                        </button>
                      </div>
                    </div>
                  </Form>
                </Modal>


                 <Modal id="showModal" isOpen={modalAddSubCategorie} toggle={toggleAddSubCategorie} centered>
                  <ModalHeader className="bg-light p-3" toggle={toggleAddSubCategorie}>
                    {!!isEdit ? "Edit Order" : "Add Sub Category"}
                  </ModalHeader>
                  <Form className="tablelist-form" onSubmit={(e: any) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}>
                    <ModalBody>
                      <input type="hidden" id="id-field" />

               

                      <div className="mb-3">
                        <Label
                          htmlFor="customername-field"
                          className="form-label"
                        >
                          Sub Category Name
                        </Label>
                        <Input
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Enter Category Name"
                          type="text"
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
                        <br></br>
                        <Col md="12">
               
               
              </Col>

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

                        <button type="submit" className="btn btn-success">
                          {!!isEdit
                            ? "Update"
                            : "Add Sub Category"}
                        </button>
                      </div>
                    </div>
                  </Form>
                </Modal>
                

                <Modal id="showDetailsModal" isOpen={modalView} toggle={toggleView} centered >
                <ModalHeader className="bg-light p-3" toggle={toggleView}>
                    { "View Details"}
                  </ModalHeader>     
                  <ModalBody>
                  <Label
                          htmlFor="id-field"
                          className="form-label"
                        >
                          Category Id : {category?.id}
                        </Label>
                        <br></br>
                        <Label
                          htmlFor="id-field"
                          className="form-label"
                        >
                          Category name : {category?.name}
                        </Label>
                        <br></br>

                        <Label
                          htmlFor="id-field"
                          className="form-label"
                        >
                          Sub categories  : 
                        </Label>
                        <br></br>
                        {category?.subcategory?.length==0 ? (
                          <>
                           <Label
                          htmlFor="id-field"
                          className="form-label"
                        >
                          there is no subCateogirs for this category 
                        </Label>
                          </>
                      ) : (
                        category?.subcategory?.map((value: any, i: number) => (
                          <div key={i}>
                            <Label>{value.name}</Label>
                          </div>
                        ))
                      )}
                    </ModalBody>
                </Modal>


                <ToastContainer closeButton={false} limit={1} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AttributsManagement;