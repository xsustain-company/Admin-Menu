import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UsersByDevice from "../../DashboardAnalytics/UsersByDevice";
import JobSummary from "./JobSummary";
import NatworkSummary from "./NatworkSummary";
import VisitorGraph from "./VisitorGraph";
import Widgets from "./Widgets";

const Statistics = () => {
  document.title = "Statistics | Velzon -  Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="STATISTICS" pageTitle="Jobs" />

          <Row>
            <Widgets  />
          </Row>

          <Row>
            <VisitorGraph dataColors='["--vz-danger", "--vz-success", "--vz-warning", "--vz-info","--vz-secondary", "--vz-primary"]' />
            <UsersByDevice />
          </Row>

          <Row>
            <NatworkSummary dataColors='["--vz-primary", "--vz-info"]' />
            <JobSummary dataColors='["--vz-success","--vz-primary", "--vz-info", "--vz-danger"]' />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Statistics;
