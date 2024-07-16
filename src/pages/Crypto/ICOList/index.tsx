import React from 'react';
import { Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Widgets from './Widgets';
import ICO from './ICO';

const ICOList = () => {
    document.title="ICO List | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">                
                <Container fluid>
                    <BreadCrumb title="ICO List" pageTitle="Crypto" />
                    <Row>
                        <Widgets />
                    </Row>
                    <ICO />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ICOList;