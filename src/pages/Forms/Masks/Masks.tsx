import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.in";


const Masks = () => {
  document.title="Input Masks | Velzon - React Admin & Dashboard Template";

  const [date, setDate] = useState<any>("");
  const [dateFormat, setDateFormat] = useState<any>("");
  const [time, setTime] = useState<any>("");
  const [timeFormat, setTimeFormat] = useState<any>("");
  const [creditCardNo, setCreditCardNo] = useState<any>("");
  const [delimiter, setDelimiter] = useState<any>("");
  const [delimiter2, setDelimiter2] = useState<any>("");
  const [prefix, setPrefix] = useState<any>("");
  const [phone, setPhone] = useState<any>("");
  const [number, setNumber] = useState<any>("");

  //Date 
  function onDateChange(e:any) {
    setDate(e.target.rawValue);
  }
  //Date Format
  function onDateFormatChange(e:any) {
    setDateFormat(e.target.rawValue);
  }
  //Time 
  function onTimeChange(e:any) {
    setTime(e.target.rawValue);
  }
  //Time Format
  function onTimeFormatChange(e:any) {
    setTimeFormat(e.target.rawValue);
  }
  //Credit card 
  function onCreditCardChange(e:any) {
    setCreditCardNo(e.target.rawValue);
  }

  //Delimeter
  function onDelimiterChange(e:any) {
    setDelimiter(e.target.rawValue);
  }
  //Delimeter
  function onDelimiterChange2(e:any) {
    setDelimiter2(e.target.rawValue);
  }

  //Prefix
  function onPrefixChange(e:any) {
    setPrefix(e.target.rawValue);
  }
  //Phone
  function onPhoneChange(e:any) {
    setPhone(e.target.rawValue);
  }
  //Number
  function onNumberChange(e:any) {
    setNumber(e.target.rawValue);
  }

  return (
    <React.Fragment>
      <div className="page-content">        
        <Container fluid>
          <BreadCrumb title="Input Masks" pageTitle="Forms" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Examples</h4>
                </CardHeader>

                <CardBody >
                  <form action="#">
                    <div>
                      <h5 className="fs-15 mb-3 text-muted">Date Formatting</h5>
                      <Row >
                        <Col xl={6}>
                          <div className="mb-3">
                            <label htmlFor="cleave-date" className="form-label">Date</label>
                            <Cleave
                              placeholder="DD-MM-YYYY"
                              options={{
                                date: true,
                                delimiter: '-',
                                datePattern: ['d', 'm', 'Y']
                              }}
                              value={date}
                              onChange={(e:any) => onDateChange(e)}
                              className="form-control"
                            />
                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className="mb-3">
                            <label htmlFor="cleave-date-format" className="form-label">Date Formatting</label>
                            <Cleave
                              placeholder="MM/YY"
                              options={{
                                date: true,
                                datePattern: ['m', 'y']
                              }}
                              value={dateFormat}
                              onChange={(e:any) => onDateFormatChange(e)}
                              className="form-control"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="border mt-3 border-dashed"></div>

                    <div className="mt-4">
                      <h6 className="mb-3 fs-15 text-muted">Time Formatting</h6>
                      <Row>
                        <Col xl={6}>
                          <div className="mb-3">
                            <label htmlFor="cleave-time" className="form-label">Time</label>
                            <Cleave
                              placeholder="hh:mm:ss"
                              options={{
                                time: true,
                                timePattern: ['h', 'm', 's']
                              }}
                              value={time}
                              onChange={(e:any) => onTimeChange(e)}
                              className="form-control"
                            />
                          </div>

                        </Col>

                        <Col xl={6}>
                          <div className="mb-3">
                            <label htmlFor="cleave-time-format" className="form-label">Time Formatting</label>
                            <Cleave
                              placeholder="hh:mm"
                              options={{
                                time: true,
                                timePattern: ['h', 'm']
                              }}
                              value={timeFormat}
                              onChange={(e:any) => onTimeFormatChange(e)}
                              className="form-control"
                            />
                          </div>
                        </Col>
                      </Row>         
                    </div>

                    <div className="border mt-3 border-dashed"></div>

                    <div className="mt-4">
                      <h5 className="fs-15 mb-3 text-muted">Custom Options</h5>
                      <Row>
                        <Col xl={6}>
                          <div className="mb-3">
                            <label htmlFor="cleave-ccard" className="form-label">Credit Card</label>
                            <Cleave
                              placeholder="xxxx xxxx xxxx xxxx"
                              options={{
                                creditCard: true,
                              }}
                              value={creditCardNo}
                              onChange={(e:any) => onCreditCardChange(e)}
                              className="form-control"
                            />
                          </div>

                        </Col>

                        <Col xl={6}>
                          <div className="mb-3">
                            <label htmlFor="cleave-delimiter" className="form-label">Delimiter</label>
                            <Cleave
                              placeholder="xxx·xxx·xxx"
                              options={{
                                delimiter: '·',
                                blocks: [3, 3, 3],
                                uppercase: true
                              }}
                              value={delimiter}
                              onChange={(e:any) => onDelimiterChange(e)}
                              className="form-control"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col xl={6}>
                          <div className="mb-3">
                            <label htmlFor="cleave-delimiters" className="form-label">Delimiters</label>
                            <Cleave
                              placeholder="xxx.xxx.xxx-xx"
                              options={{
                                delimiters: ['.', '.', '-'],
                                blocks: [3, 3, 3, 2],
                                uppercase: true
                              }}
                              value={delimiter2}
                              onChange={(e:any) => onDelimiterChange2(e)}
                              className="form-control"
                            />
                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className="mb-3">
                            <label htmlFor="cleave-prefix" className="form-label">Prefix</label>
                            <Cleave
                              options={{
                                prefix: 'PREFIX',
                                delimiter: '-',
                                blocks: [6, 4, 4, 4],
                                uppercase: true
                              }}
                              value={prefix}
                              onChange={(e:any) => onPrefixChange(e)}
                              className="form-control"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col xl={6}>
                          <div className="mb-3 mb-xl-0">
                            <label htmlFor="cleave-phone" className="form-label">Phone</label>
                            <Cleave
                              placeholder="xxxx xxx xxx"
                              options={{
                                phone: true,
                                phoneRegionCode: "IN"
                              }}
                              value={phone}
                              onChange={onPhoneChange}
                              className="form-control"
                            />
                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className="mb-0">
                            <label htmlFor="cleave-numeral" className="form-label">Numeral Formatting</label>
                            <Cleave
                              placeholder="Enter numeral"
                              options={{
                                numeral: true,
                                numeralThousandsGroupStyle: 'thousand'
                              }}
                              value={number}
                              onChange={(e:any) => onNumberChange(e)}
                              className="form-control"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Masks;
