import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { BalanceOverviewCharts } from "./DashboardCrmCharts";
import { getBalanceChartsData } from '../../slices/thunks';
import { createSelector } from 'reselect';

const BalanceOverview = () => {

    const dispatch :any= useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const selectDashboardData = createSelector(
        (state:any) => state.DashboardCRM,
        (balanceOverviewData) => balanceOverviewData.balanceOverviewData
      );
    // Inside your component
    const balanceOverviewData = useSelector(selectDashboardData);

    useEffect(() => {
        setchartData(balanceOverviewData);
    }, [balanceOverviewData]);

    const [seletedMonth, setSeletedMonth] = useState<any>("Current Year");
    const onChangeChartPeriod = (pType:any) => {
        setSeletedMonth(pType);
        dispatch(getBalanceChartsData(pType));
    };

    useEffect(() => {
        dispatch(getBalanceChartsData("today"));
    }, [dispatch]);


    return (
        <React.Fragment>
            <Col xxl={6}>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Balance Overview</h4>
                        <div className="flex-shrink-0">
                            <UncontrolledDropdown className="card-header-dropdown">
                                <DropdownToggle className="text-reset dropdown-btn" tag="a" role="button">
                                    <span className="fw-bold text-uppercase fs-12">Sort by: </span><span className="text-muted">{seletedMonth.charAt(0).toUpperCase() + seletedMonth.slice(1)}<i className="mdi mdi-chevron-down ms-1"></i></span>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem onClick={() => { onChangeChartPeriod("today"); }} className={seletedMonth === "today" ? "active" : ""}>Today</DropdownItem>
                                    <DropdownItem onClick={() => { onChangeChartPeriod("lastWeek"); }} className={seletedMonth === "lastWeek" ? "active" : ""}>Last Week</DropdownItem>
                                    <DropdownItem onClick={() => { onChangeChartPeriod("lastMonth"); }} className={seletedMonth === "lastMonth" ? "active" : ""}>Last Month</DropdownItem>
                                    <DropdownItem onClick={() => { onChangeChartPeriod("currentYear"); }} className={seletedMonth === "currentYear" ? "active" : ""}>Current Year</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0">
                        <ul className="list-inline main-chart text-center mb-0">
                            <li className="list-inline-item chart-border-left me-0 border-0">
                                <h4 className="text-primary">$584k <span className="text-muted d-inline-block fs-14 align-middle ms-2">Revenue</span></h4>
                            </li>
                            <li className="list-inline-item chart-border-left me-0">
                                <h4>$497k<span className="text-muted d-inline-block fs-14 align-middle ms-2">Expenses</span>
                                </h4>
                            </li>
                            <li className="list-inline-item chart-border-left me-0">
                                <h4><span data-plugin="counterup">3.6</span>%<span className="text-muted d-inline-block fs-14 align-middle ms-2">Profit Ratio</span></h4>
                            </li>
                        </ul>

                        <div id="revenue-expenses-charts" dir="ltr">
                            <BalanceOverviewCharts series={chartData} dataColors='["--vz-success", "--vz-danger"]' />
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default BalanceOverview;