import React from 'react';
import { projectsWidgets } from '../../common/data';
import CountUp from "react-countup";

//Import Icons
import FeatherIcon from "feather-icons-react";
import { Card, CardBody, Col, Row } from 'reactstrap';

const Widgets = () => {
    return (
        <React.Fragment>
            <Row>
                {(projectsWidgets || []).map((item, key) => (
                    <Col xl={4} key={key}>
                        <Card className="card-animate">
                            <CardBody>
                                <div className="d-flex align-items-center">
                                    <div className="avatar-sm flex-shrink-0">
                                        <span className={`avatar-title bg-${item.feaIconClass}-subtle text-${item.feaIconClass} rounded-2 fs-2`}>
                                            <FeatherIcon icon={item.feaIcon} className={`text-${item.feaIconClass}`} />
                                        </span>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden ms-3">
                                        <p className="text-uppercase fw-semibold text-muted mb-3">{item.label}</p>
                                        <div className="d-flex align-items-center mb-3">
                                            <h4 className="fs-4 flex-grow-1 mb-0">
                                                {item.subCounter.map((item:any,key:any)=>(<span className="counter-value me-1" data-target="825" key={key}>
                                                    <CountUp
                                                        start={0}
                                                        suffix={item.suffix}
                                                        end={item.counter}
                                                        duration={4}
                                                    />
                                                </span>))}
                                            </h4>
                                            <span className={`fs-12 badge bg-${item.badgeClass}-subtle text-${item.badgeClass}`}><i className={"fs-13 align-middle me-1 " + item.icon}></i>{item.percentage}</span>
                                        </div>
                                        <p className="text-muted text-truncate mb-0">{item.caption}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
};

export default Widgets;