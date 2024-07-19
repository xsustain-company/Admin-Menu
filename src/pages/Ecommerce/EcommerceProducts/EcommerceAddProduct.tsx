import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
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
  TabContent,
  TabPane,
  Input,
  Label,
  FormFeedback,
  Form,
} from "reactstrap";

// Redux
import { useDispatch } from "react-redux";
import { addNewCompany, addNewProduct as onAddNewProduct } from "../../../slices/thunks";
import makeAnimated from "react-select/animated";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Import React FilePond
import { registerPlugin } from "react-filepond";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EcommerceAddProduct = (props: any) => {
  document.title = "Create Product ";

  const history = useNavigate();
  const dispatch: any = useDispatch();

  const [selectedMulti3, setselectedMulti3] = useState<any>(null);
  const [selectedMulti4, setselectedMulti4] = useState<any>(null);

  const dateFormat = () => {
    let d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    let h = d.getHours() % 12 || 12;
    let ampm = d.getHours() < 12 ? "AM" : "PM";
    return (
      d.getDate() +
      " " +
      months[d.getMonth()] +
      ", " +
      d.getFullYear() +
      ", " +
      h +
      ":" +
      d.getMinutes() +
      " " +
      ampm
    ).toString();
  };

  const [date, setDate] = useState<any>(dateFormat());

  const categories = [
    {
      label: "Restaurant",
      options: [
        { label: "sandwich", value: "sandwich" },
        { label: "mlewoi", value: "mlewoi" },
      ],
    },
    {
      label: "kahwa",
      options: [
        { label: "express", value: "express" },
        { label: "jus", value: "jus" },
      ],
    },
  ];
  const menues = [
    {
      label: "Restaurant",
      options: [
        { label: "Menu 1", value: "Menu 1" },
        { label: "Menu 2", value: "Menu 2" },
      ],
    },
    {
      label: "kahwa",
      options: [
        { label: "Menu 1", value: "Menu 1" },
        { label: "Menu 2", value: "Menu 2" },
      ],
    },
  ];
  const animatedComponents = makeAnimated();

  const country = [
    {
      options: [{ label: "Tunisia", value: "tunisia" }],
    },
  ];
  const tunisiaCities = [
    {
      options: [
        { label: "Tunis", value: "Tunis" },
        { label: "Sfax", value: "Sfax" },
        { label: "Sousse", value: "Sousse" },
        { label: "Kairouan", value: "Kairouan" },
        { label: "Bizerte", value: "Bizerte" },
        { label: "Gabès", value: "Gabes" },
        { label: "Ariana", value: "Ariana" },
        { label: "Gafsa", value: "Gafsa" },
        { label: "Monastir", value: "Monastir" },
        { label: "Ben Arous", value: "Ben Arous" },
        { label: "Kasserine", value: "Kasserine" },
        { label: "Tataouine", value: "Tataouine" },
        { label: "Medenine", value: "Medenine" },
        { label: "Nabeul", value: "Nabeul" },
        { label: "Beja", value: "Beja" },
        { label: "Jendouba", value: "Jendouba" },
        { label: "Kebili", value: "Kebili" },
        { label: "Siliana", value: "Siliana" },
        { label: "Tozeur", value: "Tozeur" },
        { label: "Mahdia", value: "Mahdia" },
        { label: "Zaghouan", value: "Zaghouan" },
      ],
    },
  ];

  function handleMulti3(selectedMulti3: any) {
    setselectedMulti3(selectedMulti3);
  }
  function handleMulti4(selectedMulti4: any) {
    setselectedMulti4(selectedMulti4);
  }
  const base64ToFile = (base64String: any, filename: any) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // image
  const [selectedImage, setSelectedImage] = useState<any>();

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      validation.setFieldValue("image", e.target.result);
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      price: "",
      phone:"",
      subdomain: "",
      stock: "",
      email:"",
      orders: "",
      category: "",
      publishedDate: "",
      status: "",
      rating: 4.5,
      manufacturer_name: "",
      manufacturer_brand: "",
      product_discount: "",
      product_tags: "",
      logo: "",
      Street: "",
      zip: "",
      description: "",
      facebook:"",
      instagram:"",
      city:"",
      mangerEmail:"",
      TablesNumber:"",
    },
    validationSchema: Yup.object({
      //to enable later
      /*name: Yup.string().required("Please Enter a Product Title"),
      price: Yup.string().required("Please Enter a Product Price"),
      stock: Yup.string().required("Please Enter a Product stock"),
      orders: Yup.string().required("Please Enter a Product orders"),
      category: Yup.string().required("Please Enter a Product category"),
      // status: Yup.string().required("Please Enter a Product status"),
      manufacturer_name: Yup.string().required("Please Enter a Manufacturer Name"),
      manufacturer_brand: Yup.string().required("Please Enter a Manufacturer Brand"),
      product_discount: Yup.string().required("Please Enter a Product Discount"),
      product_tags: Yup.string().required("Please Enter a Product Tags"),
      logo:Yup.string().required("Please add an logo")*/
    }),

    onSubmit: (values) => {
      const formData = new FormData();
      const imageFile = base64ToFile(selectedImage, "logo.png");
      console.log(imageFile);

      formData.append("logo", imageFile);

      console.log(values);

  /*    const newProduct = {
        name: values.name,
        description: values.description,
        subdomain: values.subdomain,
        address: {
          street: values.Street,
          city: "",
          zip: values.zip,
          country: "Tunisia",
        },
        socialMedia:{
          facebook:values.facebook,
          instagram: values.instagram
        },
        price: values.price,
        stock: values.stock,
        orders: values.orders,
        publishedDate: date,
        status: values.status,
        rating: 4.5,
        // logo: selectedImage
      };*/
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("email", values.email);

      formData.append("description", values.description);
      formData.append("subdomain", values.subdomain);
      formData.append("address[street]", values.Street);
      formData.append("address[city]", values.city); // Assuming city is empty for now
      formData.append("address[zip]", values.zip);
      formData.append("address[country]", "Tunisia");
      formData.append("socialMedia[facebook]", values.facebook);
      formData.append("socialMedia[instagram]", values.instagram);
      formData.append("price", values.price);
      formData.append("mangerEmail", values.mangerEmail);

      
      // save new product
      dispatch(addNewCompany(formData));
      history("/apps-ecommerce-products");
      validation.resetForm();
    },
  });
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Product" pageTitle="Ecommerce" />

        <Row>
          <Col lg={8}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Company Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Enter Company Name"
                      name="name"
                      value={validation.values.name || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.name && validation.touched.name
                          ? true
                          : false
                      }
                    />
                    {validation.errors.name && validation.touched.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Subdomain
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Enter subdomain"
                      name="subdomain"
                      value={validation.values.subdomain || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.subdomain &&
                        validation.touched.subdomain
                          ? true
                          : false
                      }
                    />
                    {validation.errors.subdomain &&
                    validation.touched.subdomain ? (
                      <FormFeedback type="invalid">
                        {validation.errors.subdomain}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Phone
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="Phone"
                      placeholder="Enter Phone number"
                      name="phone"
                      value={validation.values.phone || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.phone && validation.touched.phone
                          ? true
                          : false
                      }
                    />
                    {validation.errors.phone && validation.touched.phone ? (
                      <FormFeedback type="invalid">
                        {validation.errors.phone}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      email
                    </Label>
                    <Input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter company email"
                      name="email"
                      value={validation.values.email || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.email && validation.touched.email
                          ? true
                          : false
                      }
                    />
                    {validation.errors.email && validation.touched.email ? (
                      <FormFeedback type="invalid">
                        {validation.errors.email}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      website
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="website"
                      placeholder="Enter company website"
                      name="website"
                      value={validation.values.website || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.website && validation.touched.website
                          ? true
                          : false
                      }
                    />
                    {validation.errors.website && validation.touched.website ? (
                      <FormFeedback type="invalid">
                        {validation.errors.website}
                      </FormFeedback>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="mt-4">
                    <h5 className="fs-15 mb-3">categories & Menu</h5>
                    <Row>
                      <Col lg={4} md={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="choices-multiple-groups"
                            className="form-label text-muted"
                          >
                            categories
                          </Label>
                          <Select
                            value={selectedMulti3}
                            isMulti={true}
                            onChange={(selectedMulti3: any) => {
                              handleMulti3(selectedMulti3);
                            }}
                            options={categories}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="choices-multiple-groups"
                            className="form-label text-muted"
                          >
                            Menu
                          </Label>
                          <Select
                            value={selectedMulti4}
                            isMulti={true}
                            onChange={(selectedMulti4: any) => {
                              handleMulti4(selectedMulti4);
                            }}
                            options={menues}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Company Gallery</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-4">
                    <h5 className="fs-14 mb-1">Company Image</h5>
                    <p className="text-muted">Add Company Image.</p>
                    <div className="text-center">
                      <div className="position-relative d-inline-block">
                        <div className="position-absolute top-100 start-100 translate-middle">
                          <Label
                            htmlFor="customer-image-input"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            title="Select Image"
                          >
                            <div className="avatar-xs cursor-pointer">
                              <div className="avatar-title bg-light border rounded-circle text-muted">
                                <i className="ri-image-fill"></i>
                              </div>
                            </div>
                          </Label>
                          <Input
                            className="form-control d-none"
                            id="customer-image-input"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handleImageChange}
                            invalid={
                              validation.touched.logo && validation.errors.logo
                                ? true
                                : false
                            }
                          />
                        </div>
                        <div className="avatar-lg">
                          <div className="avatar-title bg-light rounded">
                            <img
                              src={selectedImage}
                              id="product-img"
                              alt=""
                              className="avatar-md h-auto"
                            />
                          </div>
                        </div>
                      </div>
                      {validation.errors.logo && validation.touched.logo ? (
                        <FormFeedback type="invalid">
                          {" "}
                          {validation.errors.logo}{" "}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </CardBody>
              </Card>

              <div className="text-end mb-3">
                <button type="submit" className="btn btn-success w-sm">
                  Submit
                </button>
              </div>
            </Form>
          </Col>

          <Col lg={4}>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Adresse</h5>
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <Label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Country
                  </Label>
                  <Input
                    name="country"
                    type="select"
                    className="form-select"
                    id="choices-publish-status-input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.country || ""}
                  >
                    {country.map((item, key) => (
                      <React.Fragment key={key}>
                        {item.options.map((item, key) => (
                          <option value={item.value} key={key}>
                            {item.label}
                          </option>
                        ))}
                      </React.Fragment>
                    ))}
                  </Input>
                  {validation.touched.country && validation.errors.country ? (
                    <FormFeedback type="invalid">
                      {validation.errors.country}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    city
                  </Label>
                  <Input
                    name="city"
                    type="select"
                    className="form-select"
                    id="choices-publish-status-input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.city || ""}
                  >
                    {tunisiaCities.map((item, key) => (
                      <React.Fragment key={key}>
                        {item.options.map((item, key) => (
                          <option value={item.value} key={key}>
                            {item.label}
                          </option>
                        ))}
                      </React.Fragment>
                    ))}
                  </Input>
                  {validation.touched.city && validation.errors.city ? (
                    <FormFeedback type="invalid">
                      {validation.errors.city}
                    </FormFeedback>
                  ) : null}
                </div>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="manufacturer-name-input"
                      >
                        Street
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="Street"
                        name="Street"
                        placeholder="Enter Street"
                        value={validation.values.Street || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.Street && validation.touched.Street
                            ? true
                            : false
                        }
                      />
                      {validation.errors.Street && validation.touched.Street ? (
                        <FormFeedback type="invalid">
                          {validation.errors.Street}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="zip">
                        Zip
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="zip"
                        name="zip"
                        placeholder="Enter Zip"
                        value={validation.values.zip || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.zip && validation.touched.zip
                            ? true
                            : false
                        }
                      />
                      {validation.errors.zip && validation.touched.zip ? (
                        <FormFeedback type="invalid">
                          {validation.errors.zip}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Social media</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="manufacturer-name-input"
                      >
                        facebook page link
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="facebook"
                        name="facebook"
                        placeholder="Enter facebook page link"
                        value={validation.values.facebook || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.facebook &&
                          validation.touched.facebook
                            ? true
                            : false
                        }
                      />
                      {validation.errors.facebook &&
                      validation.touched.facebook ? (
                        <FormFeedback type="invalid">
                          {validation.errors.facebook}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="zip">
                        Instagram
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="instagram"
                        name="instagram"
                        placeholder="Enter instagram page link"
                        value={validation.values.instagram || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.instagram &&
                          validation.touched.instagram
                            ? true
                            : false
                        }
                      />
                      {validation.errors.instagram &&
                      validation.touched.instagram ? (
                        <FormFeedback type="invalid">
                          {validation.errors.instagram}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Manager Data</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="manufacturer-name-input"
                      >
                        first name
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter firstName"
                        value={validation.values.firstName || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.firstName &&
                          validation.touched.firstName
                            ? true
                            : false
                        }
                      />
                      {validation.errors.firstName &&
                      validation.touched.firstName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.firstName}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="zip">
                        Last name
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter last Name"
                        value={validation.values.lastName || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.lastName &&
                          validation.touched.lastName
                            ? true
                            : false
                        }
                      />
                      {validation.errors.lastName &&
                      validation.touched.lastName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.lastName}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Manager email
                    </Label>
                    <Input
                      type="email"
                      className="form-control"
                      id="mangerEmail"
                      placeholder="Enter company email"
                      name="mangerEmail"
                      value={validation.values.mangerEmail || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.mangerEmail &&
                        validation.touched.mangerEmail
                          ? true
                          : false
                      }
                    />
                    {validation.errors.mangerEmail &&
                    validation.touched.mangerEmail ? (
                      <FormFeedback type="invalid">
                        {validation.errors.mangerEmail}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Company Description</h5>
              </CardHeader>
              <CardBody>
                <p className="text-muted mb-2">
                  Add short description for the company
                </p>
                <textarea
                  name="description"
                  value={validation.values.description || ""}
                  onBlur={validation.handleBlur}
                  onChange={validation.handleChange}
                  className="form-control"
                  placeholder="Must enter minimum of a 100 characters"
                  rows={3}
                ></textarea>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceAddProduct;
