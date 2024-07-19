import React from "react";
import { Card, CardBody, Col, Row, CardHeader, Form, Container } from "reactstrap";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Editor } from "@ckeditor/ckeditor5-core";

const FormEditor = () => {
  document.title = "Editors | Velzon - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Editors" pageTitle="Forms" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="align-items-center d-flex">
                  <h4 className="card-title mb-0">Ckeditor Classic Editor</h4>
                </CardHeader>
                <CardBody>
                  <Form method="post">
                    
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col lg={12}>
              <div className="justify-content-between d-flex align-items-center mb-3">
                <h5 className="mb-0 pb-1 text-decoration-underline">
                  Quilljs Editor
                </h5>
              </div>
              {/* Add your QuillJS editor or any other components here */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormEditor;
