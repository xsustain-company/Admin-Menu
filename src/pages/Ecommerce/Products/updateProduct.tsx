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
import { useLocation, useParams } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { addNewCompany, addProduct, getAttributs, getCategoriess, getOneProductss, getSubCategoriess, addNewProduct as onAddNewProduct, updateProducte } from "../../../slices/thunks";
import makeAnimated from "react-select/animated";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { createSelector } from "reselect";

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
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UpdateProduct = (props: any) => {
  const [subCategories, setSubCategories] = useState<any>([]);
  const [formatedOptions,setFormatedOptions] = useState([])
  const   [formatedCategories,setFormatedCategories] = useState([])
  const [formatedAttributes,setFormatedAttributes] = useState([])
  const query = useQuery();
  const id = query.get('id');
  const [changedImage,setChangedImage] = useState(false)
  document.title = "Create Product ";
  const slectedCategories = createSelector(
    (state: any) => state.Companies,
    (Companies) => Companies.categories
  );
  const slectedAttributes = createSelector(
    (state: any) => state.Companies,
    (Companies) => Companies.attributs
  );

  const slectedSubCategories = createSelector(
    (state: any) => state.Companies,
    (Companies) => Companies.subCategories
  );

  const selectedOneProduct = createSelector(
    (state: any) => state.Companies,
    (Companies) => Companies.oneProduct
  );
  // Inside your component
  const categories = useSelector(slectedCategories);
  const attributes = useSelector(slectedAttributes);
  const oneProduct = useSelector(selectedOneProduct)
  const subCategoriess = useSelector(slectedSubCategories)
 
  useEffect(()=>{
    console.log(oneProduct);
    
  },[oneProduct])
  const history = useNavigate();
  const dispatch: any = useDispatch();
  useEffect(() => {
    console.log(subCategoriess);
    
    if (subCategoriess && !subCategoriess.length) {
      dispatch(getSubCategoriess());
      let data = subCategories.map((item:any) => ({
        value: item._id,
        label: item.name,
      }))
      console.log(data);
      
     // setFormatedOptions()
    }

  }, [dispatch, subCategoriess]);

  useEffect(() => {
    if (categories && !categories.length) {
      dispatch(getCategoriess());
    }
  }, [dispatch, categories]);
  useEffect(() => {
    if (attributes && !attributes.length) {
      dispatch(getAttributs());
    }
  }, [dispatch, attributes]);

  useEffect(() => {
    console.log();
    
    let data = subCategoriess.map((item:any) => ({
      value: item._id,
      label: item.name,
    }))
    console.log(data);
    
   setFormatedOptions(data)
  

}, [subCategoriess]);

useEffect(() => {
  console.log();
  
  let data = categories.map((item:any) => ({
    value: item._id,
    label: item.name,
  }))
  console.log(data);
  
 setFormatedCategories(data)


}, [categories]);



useEffect(() => {
  console.log();
  
  let data = attributes.map((item:any) => ({
    value: item._id,
    label: item.name,
  }))
  console.log(data);
  
 setFormatedAttributes(data)


}, [attributes]);


  const [selectedMulti3, setselectedMulti3] = useState<any>(null);
  const [selectedMulti4, setselectedMulti4] = useState<any>(null);
  const [selectedMulti5, setselectedMulti5] = useState<any>(null);

  useEffect(()=>{
    if(id){
      dispatch(getOneProductss(id))
    }
  },[id])  
 
  const animatedComponents = makeAnimated();

 useEffect(()=>{console.log(selectedMulti3);
 },[selectedMulti3])
 

  function handleMulti3(selectedMulti3: any) {
    setselectedMulti3(selectedMulti3);
  }
  function handleMulti4(selectedMulti4: any) {
    setselectedMulti4(selectedMulti4);
  }
  function handleMulti5(selectedMulti4: any) {
    setselectedMulti5(selectedMulti4);
  }
  useEffect(() => {

    if (oneProduct._id) {
      let x = oneProduct?.attributs?.map((attr :any) => ({
        value: attr._id,
        label: attr.name,
      }));
      console.log(oneProduct?.subcategory);
      
      let subCatFormated ={
        value: oneProduct?.subcategory._id,
        label: oneProduct?.subcategory.name,
      }
      setSelectedImage(`${process.env.REACT_APP_API_UPLOAD_URL}${oneProduct?.image}`)
      let catFormated ={
        value: oneProduct?.category._id,
        label: oneProduct?.category.name,
      }
     setselectedMulti3(catFormated)

      setselectedMulti4(subCatFormated)

      setselectedMulti5(x)

      validation.setValues({
        name: oneProduct.name || '',
        price: oneProduct.price || '',
        quantity: oneProduct.quantity || '',
        logo: "",
        description: oneProduct.description || ''
      });
    }
  }, [oneProduct]);
  
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
    setChangedImage(true)
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
      name: oneProduct?.name || '',
      price: oneProduct?.price || '',
      quantity: oneProduct?.quantity || '',
      logo: "",
      description: oneProduct?.description || '',
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
     
        console.log(selectedImage);
        
        if (selectedImage) {
          if (changedImage) {
            const imageFile = base64ToFile(selectedImage, "logo.png");
            if (imageFile) {
              alert("aa")
              formData.append("image", imageFile);
            }
          } 
        }
      formData.append("name", values.name);
      alert(values.name)
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      formData.append("category", selectedMulti3.value);
      formData.append("subcategory", selectedMulti4.value);
      selectedMulti5.forEach((item:any, index:any) => {
        formData.append(`attributs[${index}]`, item.value);
      });
      let data = {
        formData,id
      }
      dispatch(updateProducte(data));

      
      // save new product
      //history("/apps-ecommerce-products");
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
                      Product Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Enter Product Name"
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
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="mt-4">
                    <h5 className="fs-15 mb-3">categories & Sub Categories</h5>
                    <Row>
                      <Col lg={4} md={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="choices-multiple-groups"
                            className="form-label text-muted"
                          >
                            category
                          </Label>
                          <Select
                            value={selectedMulti3}
                            isMulti={false}
                            onChange={(selectedMulti3: any) => {
                              handleMulti3(selectedMulti3);
                            }}
                            options={formatedCategories}
                            closeMenuOnSelect={true}
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
                            Sub Category
                          </Label>
                          <Select
                            value={selectedMulti4}
                            isMulti={false}
                            onChange={(selectedMulti4: any) => {
                              handleMulti4(selectedMulti4);
                            }}
                            options={formatedOptions}
                            closeMenuOnSelect={true}
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
                            Attributes
                          </Label>
                          <Select
                            value={selectedMulti5}
                            isMulti={true}
                            onChange={(selectedMulti5: any) => {
                              handleMulti5(selectedMulti5)
                            }}
                            options={formatedAttributes}
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
                  <h5 className="card-title mb-0">Product Gallery</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-4">
                    <h5 className="fs-14 mb-1">Product Image</h5>
                    <p className="text-muted">Add Product Image.</p>
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
                <h5 className="card-title mb-0">Price & qunatity</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="manufacturer-name-input"
                      >
                        price
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        placeholder="Enter the price"
                        value={validation.values.price || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.price &&
                          validation.touched.price
                            ? true
                            : false
                        }
                      />
                      {validation.errors.price &&
                      validation.touched.price ? (
                        <FormFeedback type="invalid">
                          {validation.errors.price}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="zip">
                      quantity
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        placeholder="Enter quantity"
                        value={validation.values.quantity || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.quantity &&
                          validation.touched.quantity
                            ? true
                            : false
                        }
                      />
                      {validation.errors.quantity &&
                      validation.touched.quantity ? (
                        <FormFeedback type="invalid">
                          {validation.errors.quantity}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

          

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Product Description</h5>
              </CardHeader>
              <CardBody>
                <p className="text-muted mb-2">
                  Add short description for the Product
                </p>
                <textarea
                  name="description"
                  value={validation.values.description || oneProduct?.description}
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

export default UpdateProduct;
