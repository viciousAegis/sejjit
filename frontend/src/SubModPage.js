import React from "react";
import UsersPage from "./modPages/UsersPage";
import RequestPage from "./modPages/RequestPage";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSub } from "./actions/subActions";
import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import { Navbar, Container, Nav } from "react-bootstrap";
import ReportsPage from "./modPages/ReportsPage";

const NavBar = ({ sub, pageToShow, setPageToShow }) => {
    const [selectedPage, setSelectedPage] = useState("Users");

    const clickHandle = (name) => {
        setPageToShow(name.toLowerCase());
        setSelectedPage(name);
    };

    return (
        <div className="mod-nav-bar">
            <div
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                }}
            >
                <div className="mod-sub-name">
                    {sub.name}
                </div>
                <div
                    style={{
                        padding: "10px",
                        backgroundColor: selectedPage === "Users" ? "#eebbc3" : "",
                        cursor: "pointer",
                        borderBottom: "1px solid #232946"
                    }}
                    onClick={() => clickHandle("Users")}
                >
                    Users
                </div>
                <div
                    style={{
                        padding: "10px",
                        backgroundColor: selectedPage === "Joining Requests" ? "#eebbc3" : "",
                        cursor: "pointer",
                        borderBottom: "1px solid #232946"
                    }}
                    onClick={() => clickHandle("Joining Requests")}
                >
                    Joining Requests
                </div>
                <div
                    style={{
                        padding: "10px",
                        backgroundColor: selectedPage === "Stats" ? "#eebbc3" : "",
                        cursor: "pointer",
                        borderBottom: "1px solid #232946"
                    }}
                    onClick={() => clickHandle("Stats")}
                >
                    Stats
                </div>
                <div
                    style={{
                        padding: "10px",
                        backgroundColor: selectedPage === "Reports" ? "#eebbc3" : "",
                        cursor: "pointer",
                        borderBottom: "1px solid #232946"
                    }}
                    onClick={() => clickHandle("Reports")}
                >
                    Reports
                </div>
            </div>
        </div>
    );
};


export default function SubModPage() {
    const location = useLocation();
    const subId = location.pathname.split("/")[2];

    const [pageToShow, setPageToShow] = useState("users");
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();
    const subGetOne = useSelector(state => state.subGetOne);
    const { sub: subData } = subGetOne;
    const [sub, setSub] = React.useState({});

    useEffect(() => {
        dispatch(getOneSub(subId));
    }, [dispatch, update]);

    useEffect(() => {
        if (subData) {
            setSub(subData.sub);
        }
    }, [subData, update]);

    return (
        <div>
            <TopBar />
            <div className="Page-container">
                <div className="Mod-page-container">

                    <div className="row justify-content-between">
                        <div className="col-md-3 mb-3">
                            <NavBar
                                sub={sub}
                                pageToShow={pageToShow}
                                setPageToShow={setPageToShow}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="mod-content-container">
                                {sub &&
                                    <>
                                        {pageToShow === "users" && <UsersPage sub={sub} />}
                                        {pageToShow === "joining requests" && <RequestPage sub={sub} update={update} setUpdate={setUpdate}
                                        />}
                                        {pageToShow === "stats" && <div>Stats</div>}
                                        {pageToShow === "reports" &&
                                            <ReportsPage
                                                sub={sub}
                                            />}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}