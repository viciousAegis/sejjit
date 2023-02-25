import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReports, blockUser, ignoreReport, deleteReport } from "../actions/reportActions";
import { deletePost } from "../actions/postActions";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import moment from "moment";
import { Button } from "react-bootstrap";

const Report = ({ report, setReportSuccess, setReportError, setLoadingReports }) => {

    const dispatch = useDispatch();
    const reportBlockUser = useSelector((state) => state.reportBlockUser);
    const { loading, error, success } = reportBlockUser;

    const reportIgnore = useSelector((state) => state.reportIgnore);
    const { loading: loadingIgnore, error: errorIgnore, success: successIgnore } = reportIgnore;

    const postDelete = useSelector((state) => state.postDelete);
    const { loading: loadingPostDelete, error: errorPostDelete, success: successPostDelete } = postDelete;

    const [countdown, setCountdown] = useState(-1);
    const [interval, setInterval] = useState(null);
    const [disableBlock, setDisableBlock] = useState(report.status.includes("blocked"));
    const [disableButtons, setDisableButtons] = useState(report.status.includes("ignored"));

    const deleteReportHandler = (report_id, post_id) => {
        dispatch(deletePost(post_id));
    };

    const blockUserHandler = (sub_id, user_id, report_id) => {
        const final = moment().add(4500, "milliseconds");

        const interval = window.setInterval(() => {
            const now = moment();
            const diff = final.diff(now, "seconds");
            setCountdown(diff);
            if (diff <= 0) {
                clearInterval(interval);
                setCountdown(-1);
                console.log("countdown finished");
                dispatch(blockUser(sub_id, user_id, report_id));
            }
        }, 500, sub_id, user_id, report_id);
        setInterval(interval);
    };

    const cancelBlockHandler = (interval) => {
        clearInterval(interval);
        alert("Block cancelled")
        setCountdown(-1);
    };

    const ignoreReportHandler = (report_id) => {
        dispatch(ignoreReport(report_id));
    };

    useEffect(() => {
        if (loadingIgnore) {
            setLoadingReports(true);
        }
    }, [loadingIgnore]);

    useEffect(() => {
        if (successIgnore) {
            setReportSuccess("Report ignored successfully");
            setDisableButtons(report.status.includes("ignored"));
            setLoadingReports(false);
        }
        if (errorIgnore) {
            setReportError(errorIgnore);
            setDisableButtons(report.status.includes("ignored"));
            setLoadingReports(false);
        }
    }, [successIgnore, errorIgnore]);

    useEffect(() => {
        if (loading) {
            setLoadingReports(true);
        }
    }, [loading]);

    useEffect(() => {
        if (success) {
            setReportSuccess("User blocked successfully");
            setLoadingReports(false);
            setDisableBlock(report.status.includes("blocked"));
        }
        if (error) {
            setReportError(error);
            setDisableBlock(report.status.includes("blocked"));
            setLoadingReports(false);
        }
    }, [success, error]);

    useEffect(() => {
        if (loadingPostDelete) {
            setLoadingReports(true);
        }
    }, [loadingPostDelete]);

    useEffect(() => {
        console.log("successPostDelete", successPostDelete);
        console.log("errorPostDelete", errorPostDelete);
        if (successPostDelete) {
            setReportSuccess("Report deleted successfully");
            setLoadingReports(false);
        }
        if (errorPostDelete) {
            setReportError(errorPostDelete);
            setLoadingReports(false);
        }
    }, [successPostDelete, errorPostDelete]);

    return (
        <div className="container m-0 p-1">
            <div className="row report-header">
                <div className="col-12">
                    <b>Reported by:</b> {report.reported_by_name}
                </div>
                <div className="col-12">
                    <b>Reported on:</b> {moment(report.reported_on).format("DD/MM/YYYY")}
                </div>
                <div className="col-12">
                    <b>Reported user:</b> {report.reported_user_name}
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="report-post">
                            <div className="post-title">{report.post_title}
                            </div>
                            <hr />
                            <div className="post-content">{report.post_content}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <b>Concern:</b> {report.concern}
                </div>
                <div className="col-12 report-btns" style={{
                    display: "flex",
                    direction: "row",
                    gap: "0.5rem",
                    marginTop: "0.5rem"
                }}>
                    <Button variant="danger"
                        disabled={disableButtons}
                        onClick={() => {
                            deleteReportHandler(report._id, report.post);
                        }}
                    >
                        Delete Post
                    </Button>
                    <Button variant="success"
                        disabled={disableBlock || disableButtons}
                        onClick={() => {
                            if (countdown < 0) {
                                blockUserHandler(report.sub, report.reported_user, report._id);
                            }
                            else {
                                cancelBlockHandler(interval);
                            }
                        }}
                    >
                        {countdown < 0 && <span>
                            Block User
                        </span>}
                        {countdown > 0 && <span>
                            Cancel in {countdown}
                        </span>}
                    </Button>
                    <Button variant="warning"
                        disabled={disableButtons}
                        onClick={() => {
                            ignoreReportHandler(report._id);
                        }}
                    >
                        Ignore
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default function ReportsPage({ sub }) {

    const dispatch = useDispatch();
    const reportsGet = useSelector((state) => state.reportsGet);
    const { loading, reports, error } = reportsGet;

    const [reportSuccess, setReportSuccess] = useState();
    const [reportError, setReportError] = useState();
    const [loadingReports, setLoadingReports] = useState(false);

    useEffect(() => {
        if(reportError)
            console.log(reportError);
        if(reportSuccess)
            console.log(setReportSuccess);
            
        dispatch(getReports(sub._id));
    }, [dispatch, sub, setReportSuccess, setReportError]);

    return (
        <div>
            {loading && <Loading />}
            {loadingReports && <Loading />}
            {reportSuccess && <div className="alert alert-success">{reportSuccess}</div>}
            {reportError && <div className="alert alert-danger">{reportError}</div>}
            {reports &&
                <ul className="list-group list-group-flush">
                    {reports.map(report =>
                        <li className="list-group-item">
                            <Report report={report}
                                setReportSuccess={setReportSuccess}
                                setReportError={setReportError}
                                setLoadingReports={setLoadingReports}
                            />
                        </li>
                    )}
                </ul>}
        </div>
    )
}