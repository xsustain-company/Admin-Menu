import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from '../../../Components/Common/TableContainer';
import { getTransationList } from "../../../slices/thunks";

import {
    FromCol,
    ToCol,
    DetailsCol,
    TransactionID,
    TypeCol,
    Status
} from "./TransactionsCol";
import { createSelector } from 'reselect';

const AllTransactions = () => {
    const dispatch: any = useDispatch();

    const transactionData = createSelector(
        (state: any) => state.Crypto,
        (transationList) => transationList.transationList
    );
    // Inside your component
    const transationList = useSelector(transactionData);

    useEffect(() => {
        dispatch(getTransationList());
    }, [dispatch]);


    useEffect(() => {
        setTransation(transationList);
    }, [transationList]);

    const [transation, setTransation] = useState(transationList);

    const category = (e: any) => {
        if (e === "All") {
            var filter = transationList.filter((item: any) => item.category !== e);
        } else {
            filter = transationList.filter((item: any) => item.category === e);
        }
        setTransation(filter);
    };

    const flowType = (e: any) => {
        setTransation(
            transationList.filter((item: any) => item.type === e));
    };


    const columns = useMemo(
        () => [
            {
                header: "#",
                cell: (cell: any) => (
                    <>
                        <div className="avatar-xs">
                            <div className={"avatar-title bg-" + cell.row.original.iconClass + "-subtle text-" + cell.row.original.iconClass + " rounded-circle fs-16"}>
                                <i className={cell.row.original.icon}></i>
                            </div>
                        </div>
                    </>
                ),
            },
            {
                header: "Timestamp",
                accessorKey: "time",
                enableColumnFilter: false,
                cell: (cell: any) => (
                    <>
                        {cell.row.original.date}{" "}
                        <small className="text-muted">{cell.getValue()}</small>
                    </>
                ),
            },
            {
                header: "Currency",
                accessorKey: "currency",
                enableColumnFilter: false,
                cell: (cell: any) => (
                    <>
                        <div className="d-flex align-items-center">
                            <img src={cell.row.original.image} alt="" className="avatar-xxs me-2" />
                            {cell.getValue()}
                        </div>
                    </>
                ),
            },
            {
                header: "From",
                accessorKey: "from",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <FromCol {...cell} />;
                },
            },
            {
                header: "To",
                accessorKey: "to",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <ToCol {...cell} />;
                },
            },
            {
                header: "Details",
                accessorKey: "details",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <DetailsCol {...cell} />;
                },
            },
            {
                header: "Transaction ID",
                accessorKey: "id",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <TransactionID {...cell} />;
                },
            },
            {
                header: "Type",
                accessorKey: "type",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <TypeCol {...cell} />;
                },
            },
            {
                header: "Amount",
                accessorKey: "amount",
                enableColumnFilter: false,
                cell: (cell: any) => (
                    <>
                        <h6 className={"text-" + cell.row.original.iconClass + " amount mb-1"}>-{cell.getValue()}</h6>
                        <p className="text-muted mb-0">{cell.row.original.amount1}</p>
                    </>
                ),
            },
            {
                header: "Status",
                accessorKey: "status",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <Status {...cell} />;
                },
            },
        ],
        []
    );
    return (
        <React.Fragment>
            <Row className="align-items-center mb-4 g-3">
                <Col sm={2}>
                    <div className="d-flex align-items-center gap-2">
                        <span className="text-muted flex-shrink-0">Sort by: </span>
                        <select className="form-control mb-0" data-choices data-choices-search-false name="choices-single-default" id="choices-single-default" onChange={(e) => category(e.target.value)}>
                            <option defaultValue="All">All</option>
                            <option value="USD">USD</option>
                            <option value="ETH">ETH</option>
                            <option value="BTC">BTC</option>
                            <option value="EUR">EUR</option>
                            <option value="JPY">JPY</option>
                        </select>
                    </div>
                </Col>
                <div className="col-sm-auto ms-auto">
                    <div className="d-flex gap-2">
                        <Link to="#" data-bs-toggle="modal" className="btn btn-info" onClick={() => flowType("Deposit")}>Deposite</Link>
                        <Link to="#" data-bs-toggle="modal" className="btn btn-danger" onClick={() => flowType("Withdraw")}>Withdraw</Link>
                    </div>
                </div>
            </Row>

            <Card>
                <CardHeader>
                    <Row className="align-items-center g-3">
                        <Col md={3}>
                            <h5 className="card-title mb-0">All Transactions</h5>
                        </Col>
                        <div className="col-md-auto ms-auto">
                            <div className="d-flex gap-2">
                                <div className="search-box">
                                    <input type="text" className="form-control search" placeholder="Search for transactions..." />
                                    <i className="ri-search-line search-icon"></i>
                                </div>
                                <button className="btn btn-success">
                                    <i className="ri-equalizer-line align-bottom me-1"></i>
                                    Filters
                                </button>
                            </div>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody>
                    <TableContainer
                        columns={columns}
                        data={(transation || [])}
                        customPageSize={8}
                        divClass="table-responsive table-card mb-4"
                        tableClass="align-middle table-nowrap mb-0"
                        theadClass="table-light table-nowrap"
                    />
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default AllTransactions;