import React, { useState } from "react";
import ReactPaginate from 'react-paginate';
import {Button, Form, Input, InputGroup, Card, ListGroup, ListGroupItem, CardBody, CardHeader} from "reactstrap";
import classes from "../Styles.module.css";
import ReportViewer from "./ReportViewer";
import Paginator from "../pagination/Paginator";
import '../pagination/Paginator.css'

const ReportRunner = props => {

    // const initialMessage = 'No reports were created yet';

    const [reports, setReports] = useState([]);

    const [reportId, setReportId] = useState('');

    const [reportById, setReportById] = useState('');

    const [isError, setIsError] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);

    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;
    const currentPageData = reports
        .slice(offset, offset + PER_PAGE)
        .map(report =>
            <ReportViewer report={report} />
        );
    const pageCount = Math.ceil(reports.length / PER_PAGE);

    async function showAllReports() {
        setReportById('')
        let response = await fetch('/reports', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        const allReports = await response.json();

        setReports(Object.values(allReports))
        console.log(reports)
    }

    async function getReportById() {
        console.log(reportById)
        setReports([]);
        let response = await fetch('/reports/' + reportId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        console.log(response.statusText)

        if (response.status !== 200) {
            setReportById(response.statusText)
            setIsError(true);
        } else {
            setIsError(false);
            const reportById = await response.json();
            setReportById(reportById);
        }
    }

    const userInputHandler = event => {
        setReportId(event.target.value);
    }

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    return (
        <div>

            <Form>
                <Button className={classes.button} variant="primary" onClick={showAllReports}>Show all reports</Button>
            </Form>
            <Form>
                <InputGroup>
                    <Button variant="primary" onClick={getReportById}>Show report with id</Button>
                    <Input type="number"
                           placeholder="Please enter id"
                           value={reportId}
                           onChange={userInputHandler}
                    />
                </InputGroup>
            </Form>
            <ListGroup className={classes.reportWrapper}>
                {currentPageData}
                {!isError && <ReportViewer report={reportById} />}
                {isError && <div>{reportById}</div>}
            </ListGroup>
            {/*<div><Paginator reports={reports} /></div>*/}
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={'...'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                containerClassName={'pagination'}
            />
        </div>);
};

export default ReportRunner;