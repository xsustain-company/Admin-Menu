import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Form, FormFeedback, Input, Row } from 'reactstrap';
import ParticlesAuth from "../ParticlesAuth";

//import images
import logoLight from "../../../assets/images/logo-light.png";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BasicLockScreen = () => {
    document.title = "Lock Screen | Velzon - React Admin & Dashboard Template";

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
            <div className="auth-page-content">
                <div className="auth-page-wrapper">
                    <ParticlesAuth>
                        <div className="auth-page-content">
                            <Container>
                                <Row>
                                    <Col lg={12}>
                                        <div className="text-center mt-sm-5 mb-4 text-white-50">
                                            <div>
                                                <Link to="/dashboard" className="d-inline-block auth-logo">
                                                    <img src={logoLight} alt="" height="20" />
                                                </Link>
                                            </div>
                                            <p className="mt-3 fs-16 fw-semibold">Premium Admin & Dashboard Template</p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md={8} lg={6} xl={5}>
                                        <Card className="mt-4">
                                            <CardBody className="p-4">
                                                <div className="text-center mt-2">
                                                    <h5 className="text-primary">Lock Screen</h5>
                                                    <p className="text-muted">Enter your password to unlock the screen!</p>
                                                </div>
                                                <div className="user-thumb text-center">
                                                    <img src={avatar1} className="rounded-circle img-thumbnail avatar-lg" alt="thumbnail" />
                                                    <h5 className="font-size-15 mt-3">Anna Adame</h5>
                                                </div>
                                                <div className="p-2 mt-4">
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
                                            </CardBody>
                                        </Card>
                                        <div className="mt-4 text-center">
                                            <p className="mb-0">Not you ? return <Link to="/auth-signin-basic" className="fw-bold text-primary text-decoration-underline"> Signin </Link> </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </ParticlesAuth>
                </div>
            </div>
        </React.Fragment>
    );
};

export default BasicLockScreen;