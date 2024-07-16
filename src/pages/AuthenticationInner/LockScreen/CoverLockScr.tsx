import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Form, FormFeedback, Input, Row } from 'reactstrap';

//import images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

import AuthSlider from '../authCarousel';

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';


const CoverLockScreen = () => {
    document.title="Lock Screen | Velzon - React Admin & Dashboard Template";

    const validation: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Please Enter Password")
        }),
        onSubmit: (values) => {
            // console.log(values);
        }
    });
    return (
        <React.Fragment>
                <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                    <div className="bg-overlay"></div>

                    <div className="auth-page-content overflow-hidden pt-lg-5">
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <Card className="overflow-hidden">
                                        <Row className="justify-content-center g-0">
                                            <AuthSlider />
                                            <Col lg={6}>
                                                <div className="p-lg-5 p-4">
                                                    <div>
                                                        <h4 className="text-primary">Lock Screen</h4>
                                                        <p className="text-muted">Enter your password to unlock the screen!</p>
                                                    </div>
                                                    <div className="user-thumb text-center">
                                                        <img src={avatar1} className="rounded-circle img-thumbnail avatar-lg" alt="thumbnail" />
                                                        <h5 className="mt-3">Anna Adame</h5>
                                                    </div>

                                                    <div className="mt-4">
                                                    <Form onSubmit={(e) => {
                                                        e.preventDefault();
                                                        validation.handleSubmit();
                                                        return false;
                                                    }} action="#">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="userpassword">Password</label>
                                                            <Input type="password" className="form-control" id="userpassword" placeholder="Enter password"
                                                                name="password"
                                                                value={validation.values.password}
                                                                onBlur={validation.handleBlur}
                                                                onChange={validation.handleChange}
                                                                invalid={validation.errors.password && validation.touched.password ? true : false}
                                                            />
                                                            {validation.errors.password && validation.touched.password ? (
                                                                <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-2 mt-4">
                                                            <Button color="success" className="w-100" type="submit">Unlock</Button>
                                                        </div>
                                                    </Form>
                                                    </div>

                                                    <div className="mt-5 text-center">
                                                        <p className="mb-0">Not you ? return <Link to="/auth-signin-cover" className="fw-bold text-primary text-decoration-underline"> Signin</Link></p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    <footer className="footer">
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className="text-center">
                                        <p className="mb-0">&copy; {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </footer>
                </div>
        </React.Fragment>
    );
};

export default CoverLockScreen;