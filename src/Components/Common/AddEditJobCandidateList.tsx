import React, { useEffect, useState } from "react";
import { Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";

import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import dummy from "assets/images/users/user-dummy-img.jpg"

import { addCandidate as onAddCandidate } from "slices/thunks";

interface modal {
    show: boolean,
    editItem: any,
    handleShow: any,
    handleClose: any,
}
interface ImgData {
    id: number,
    name: string;
    avatar: {
        src: string;
    };
}

const AddEditJobCandidateList = ({ show, handleClose, handleShow, editItem }: modal) => {

    const dispatch = useDispatch<any>();
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
            userImg: Yup.string().required("Please Enter Your Image"),
            candidateName: Yup.string().required("Please Enter Your CandidateName"),
            designation: Yup.string().required("Please Enter Your Designation"),
            location: Yup.string().required("Please Enter Location"),
            rating1: Yup.number().required("Please Enter Stars"),
            rating2: Yup.number().required("Please Enter Rating"),
            type:  Yup.string().required("Please Enter Status"),
        }),
        onSubmit: (values: any) => {
            const newCandidateadd = {
                id: (Math.floor(Math.random() * (30 - 20)) + 20),
                candidateName: values['candidateName'],
                designation: values['designation'],
                location: values['location'],
                rating1: values['rating1'],
                rating2: values['rating2'],
                // userImg: selectedImage,
                userImg: values['userImg'],
                type: values['type']
            }
            dispatch(onAddCandidate(newCandidateadd));
            validation.resetForm();

            if (values === null) {
                handleShow();
            } else {
                handleClose();
                setSelectedImage('')
                setImgStore('')
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

    return (
        <React.Fragment>
            <Modal id="showModal" isOpen={show} toggle={handleClose} centered>
                <ModalHeader className="bg-light p-3" toggle={handleClose}>
                    {/* {!!isEdit ? "Edit Order" : "Add Order"} */}
                    Add Customer
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
                                        <img src={selectedImage || dummy} alt="" id="customer-img" className="avatar-md rounded-circle object-cover" />
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
                            <select className="form-control" id="task-status-input"
                                name="type"
                                value={validation.values.type}
                                onChange={validation.handleChange}
                            >
                                <option value="all">Part Time</option>
                                <option defaultValue="New">Full Time</option>
                                <option value="Inprogress">Freelancer</option>
                            </select>
                            {validation.errors.type && validation.touched.type ? (
                                <FormFeedback type="invalid" className="d-block">{validation.errors.type}</FormFeedback>
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
                                    // setModal(false);
                                }}
                            >
                                Close
                            </button>

                            <button type="submit" className="btn btn-success">
                                {/* {!!isEdit
                                    ? "Update"
                                    : "Add Customer"} */}
                                Add Customer
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default AddEditJobCandidateList