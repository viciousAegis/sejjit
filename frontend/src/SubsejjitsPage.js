import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubs, requestFollow, leaveSub } from "./actions/subActions";
import Loading from "./Components/Loading";
import TopBar from "./TopBar";
import { Badge, Button, Form, ButtonGroup, ToggleButton, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import fuzzy from "fuzzysearch";
import moment from "moment";

const SubSejjit = ({ sub, setSubUpdate }) => {

    const name = sub.name;
    const description = sub.description;
    const banned_words = sub.banned_words;
    const followers = sub.followers;
    const banned_users = sub.banned_users;
    const moderator = sub.moderator;
    const tags = sub.tags;

    const user = JSON.parse(localStorage.getItem('user'));

    const [isModerator, setIsModerator] = useState(() => {
        return user._id === moderator;
    }
    );
    const [isBanned, setIsBanned] = useState(
        () => {
            return banned_users.includes(user._id);
        }
    );
    const [isFollowing, setIsFollowing] = useState(
        () => {
            return followers.includes(user._id);
        }
    );
    const [newUser, setNewUser] = useState(
        () => {
            if (!isBanned && !isFollowing && !isModerator) {
                return true;
            } else {
                return false;
            }
        }
    );

    useEffect(() => {
        setIsModerator(() => {
            return user._id === moderator;
        }
        );
        setIsBanned(
            () => {
                return banned_users.includes(user._id);
            }
        );
        setIsFollowing(
            () => {
                return followers.includes(user._id);
            }
        );
    }, [sub]);

    useEffect(() => {
        setNewUser(
            () => {
                if (!isBanned && !isFollowing && !isModerator) {
                    return true;
                } else {
                    return false;
                }
            }
        );
    }, [isBanned, isFollowing, isModerator]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const subRequestFollow = useSelector((state) => state.subRequestFollow);
    const { loading, id, error, success } = subRequestFollow;

    const subLeave = useSelector((state) => state.subLeave);
    const { loading: loadingLeave, id: idLeave, error: errorLeave, success: successLeave } = subLeave;

    const clickHandle = () => {
        console.log("clicked");
        navigate(`/subsejjits/${sub._id}`);
    };

    const joinHandle = () => {
        console.log("join clicked");
        dispatch(requestFollow(sub._id));
    };

    const leaveHandle = () => {
        console.log("leave clicked");
        dispatch(leaveSub(sub._id));
    };

    useEffect(() => {
        if (success) {
            console.log(success);
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    useEffect(() => {
        if (id) {
            console.log(id);
        }
    }, [id]);

    useEffect(() => {
        if (successLeave) {
            console.log(successLeave);
            setSubUpdate(successLeave);
        }
    }, [successLeave]);

    useEffect(() => {
        if (errorLeave) {
            console.log(errorLeave);
            setSubUpdate(errorLeave);
        }
    }, [errorLeave]);

    return (
        <div className="sub-sejjit-container">
            {error && error[1] === sub._id && <div className="alert alert-danger" role="alert">
                {error[0]}
            </div>
            }
            {success && success.id === sub._id && <div className="alert alert-success" role="alert">
                Join request sent!
            </div>
            }
            <div className="sub-sejjit-header row justify-content-between">
                <div className="col-8 sub-sejjit-title d-flex align-items-center">
                    s/<span className='sub-sejjit-name'>{name}</span>
                </div>
                <div className="col-4 d-flex justify-content-end">
                    <Button variant="primary" className='follow-button' disabled={isModerator}
                        onClick={() => {

                            console.log("isFollowing", isFollowing);

                            if (newUser || isBanned) {
                                joinHandle();
                            }
                            if (isFollowing) {
                                console.log("leaving", sub.name)
                                leaveHandle();
                            }
                        }}
                    >
                        {newUser && <>
                            {loading && <>
                                {id && id === sub._id ? <Loading /> : <span>Join</span>}
                            </>
                            }
                            {!id && id !== sub._id ? <span>Join</span> : null}
                        </>}
                        {isModerator && <>
                            {<span>Leave</span>}
                        </>}
                        {isFollowing && !isModerator && <>
                            {loadingLeave && <>
                                {idLeave && idLeave === sub._id ? <Loading /> : <span>Leave</span>}
                            </>
                            }
                            {!idLeave && idLeave !== sub._id ? <span>Leave</span> : null}
                        </>}
                        {isBanned && <>
                            {loading && <>
                                {id && id === sub._id ? <Loading /> : <span>Join</span>}
                            </>
                            }
                            {!id && id !== sub._id ? <span>Join</span> : null}
                        </>}
                    </Button>
                </div>
            </div>
            <div className="sub-sejjit-description">
                {description}
            </div>
            <div className="sub-sejjit-content">
                <div className='row sub-sejjit-stats mb-3'>
                    <div className="col-md-5 d-flex juswtify-content-start">
                        <Badge variant="primary"
                            className='align-self-center follower-number'>{sub.followers.length} Followers</Badge>
                    </div>
                    <di className="col-md-4 d-flex justify-content-start">
                        <Badge variant="primary"
                            className='align-self-center
                        follower-number'>{sub.num_posts} Posts</Badge>
                    </di>
                </div>
                <div>

                    {tags.map((tag) => (
                        <Badge variant="primary" bg='success' className='tag me-1'>{tag}</Badge>
                    ))}
                </div>
                <div>
                    {banned_words.map((word) => (
                        <Badge variant="primary" bg='danger' className='banned-word me-1'>{word}</Badge>
                    ))}
                </div>
            </div>
            <hr />
            <div className="sub-sejjit-footer">
                <div className="row justify-content-end mb-2">
                    <div className="col-3 d-flex justify-content-end">
                        <Button variant="primary" className='follow-button'
                            onClick={clickHandle}
                        >
                            <span>View</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FilterList = ({ subList, tags, showFilter, setShowFilter, filteredList, setFilteredList }) => {

    const [tagList, updateTagList] = useState([])

    const setFilteredSubs = () => {
        const selectedList = []
        subList.forEach(sub => {
            tagList.forEach(tag => {
                if (sub.tags.includes(tag)) {
                    selectedList.push(sub)
                    return true;
                }
            })
            return false
        })
        setFilteredList(selectedList)
        console.log(filteredList)
    }

    const handleFilter = (tag) => {
        const tagButton = document.getElementById(tag);

        if (tagList.includes(tag)) {
            const newTagList = tagList.filter(item => { return item != tag })
            updateTagList(newTagList)
            tagButton.classList.remove("tag-filter-active")
        } else {
            updateTagList([
                ...tagList,
                tag
            ])
            tagButton.classList.add("tag-filter-active")
        }

        console.log(tagList)
    }

    const handleSubmit = () => {
        setFilteredSubs()
    }

    return (
        <div className="filter-list">
            <div className="filter-list-header">
                Filter by tags
            </div>
            <div className="filter-list-content">
                {tags.map((tag) => (
                    <Badge id={tag} key={tag} variant="primary" bg='success' className='tag-filter me-1' onClick={() => handleFilter(tag)}>{tag}</Badge>
                ))}
            </div>
            <div>
                <Button variant="primary" className='filter-button'
                    onClick={handleSubmit}
                >
                    <span>Apply</span>
                </Button>
                <Button variant="primary" className='filter-button'
                    onClick={() => setShowFilter(!showFilter)}
                >
                    <span>Close</span>
                </Button>
            </div>

        </div>
    )
}

const SortList = ({ sort, setSort, showSort, setShowSort }) => {
    console.log(sort)
    const [radioValue, setRadioValue] = useState(sort);

    const radios = [
        { name: 'Default', value: '1' },
        { name: 'by Name (asc)', value: '2' },
        { name: 'by Name (desc)', value: '3' },
        { name: 'by Follower Count', value: '4' },
        { name: 'by Creation Date', value: '5' }
    ];

    const handleSubmit = () => {
        setSort(radioValue)
        setShowSort(!showSort)
    }

    return (
        <div className="filter-list">
            <div className="filter-list-header">
                Sort
            </div>
            <div className="filter-list-content">
                <ButtonGroup className="mb-2" vertical={true} >
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </div>
            <div>
                <Button variant="primary" className='filter-button'
                    onClick={handleSubmit}
                >
                    <span>Apply</span>
                </Button>
                <Button variant="primary" className='filter-button'
                    onClick={() => setShowSort(!showSort)}
                >
                    <span>Close</span>
                </Button>
            </div>

        </div>
    )
}

const Search = ({ subList, setSubList, filteredList, setFilteredList, searchTermParent, setSearchTermParent, sort, setSort }) => {

    const getUniqeTags = (tags) => {
        const uniqueTags = [...new Set(tags?.flat())];
        return uniqueTags;
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);

    const subList_ = subList?.subs
    const tags = getUniqeTags(subList_?.map((sub) => sub.tags));

    const handleSearch = event => {
        event.preventDefault();
        console.log('subList', subList_);
        console.log('searchTerm', searchTerm);
        const filtered = subList_.filter(item =>
            fuzzy(searchTerm?.toLowerCase(), item?.name.toLowerCase())
        );
        console.log('filtered', filtered);
        setFilteredList(filtered);
        setSearchTermParent(searchTerm);
    };

    return (
        <div>
            <Accordion>

                <Form onSubmit={handleSearch}>
                    <div className="row search-row align-items-center">
                        <div className="col-md-6">
                            <Form.Control
                                className="search-bar"
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={event => setSearchTerm(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6 search-btns">
                            <Button type="submit">Search</Button>
                            <Button onClick={() => setShowFilter(!showFilter)}>Filter</Button>
                            <Button onClick={() => setShowSort(!showSort)}>Sort</Button>
                        </div>
                    </div>
                </Form>
                <div className="row">
                    <div className="col-md-6">
                        {showFilter && <FilterList
                            subList={subList_}
                            tags={tags}
                            showFilter={showFilter}
                            setShowFilter={setShowFilter}
                            filteredList={filteredList}
                            setFilteredList={setFilteredList} />}
                    </div>
                    <div className="col-md-6">
                        {showSort &&
                            <SortList
                                sort={sort}
                                setSort={setSort}
                                showSort={showSort}
                                setShowSort={setShowSort}
                            />
                        }
                    </div>
                </div>
            </Accordion>
        </div>
    );
}

const sortSubs = (subs, type, defaultSort = undefined) => {
    switch (type) {
        case '1':
            if (defaultSort !== undefined) {
                console.log('defaultSort', defaultSort)
                return defaultSort
            } else {
                console.log('subs', subs)
                return subs
            }
        case '2':
            return subs?.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
        case '3':
            return subs?.sort((a, b) => {
                return b.name.localeCompare(a.name)
            })
        case '4':
            return subs?.sort((a, b) => {
                return b.followers.length - a.followers.length
            }
            )
        case '5':
            return subs?.sort((a, b) => {
                return moment(b.createdAt).diff(moment(a.createdAt))
            })
    }
}

const AllSubSejjits = ({ loading, error, subs, defaultSorting, sort, setSubUpdate }) => {

    const subList_ = sortSubs(subs?.subs, sort, defaultSorting)

    return (
        <div>
            {loading && <Loading />}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="sub-list-content-public">
                {subs &&
                    subList_?.map((sub) => (
                        <SubSejjit sub={sub}
                            setSubUpdate={setSubUpdate}
                        />
                    ))}
            </div>
        </div>
    );
};

const FilteredSubSejjits = ({ filteredList, sort, defaultSorting, setSubUpdate }) => {
    console.log('filteredList', filteredList);
    const subList_ = sortSubs(filteredList, sort, undefined)
    console.log('subList_ Filtered', subList_);
    return (
        <div>
            <div className="sub-list-content-public">
                {subList_?.map((sub) => (
                    <SubSejjit sub={sub}
                        setSubUpdate={setSubUpdate}
                    />
                ))}
            </div>
        </div>
    );
}

const sortDefaultSubs = (subs) => {
    // first show joined subs then show the rest
    const user = JSON.parse(localStorage.getItem('user'))
    const joinedSubs = subs?.filter(sub => sub.followers.includes(user._id))
    const notJoinedSubs = subs?.filter(sub => !sub.followers.includes(user._id))

    console.log('joinedSubs', joinedSubs)
    console.log('notJoinedSubs', notJoinedSubs)

    const sortedSubs = joinedSubs?.concat(notJoinedSubs)

    console.log(sortedSubs)

    return sortedSubs
}

export default function SubSejjitDisplayPage() {
    const [subList, setSubList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState("1");
    const [defaultSorting, setDefaultSorting] = useState([])
    const [subUpdate, setSubUpdate] = useState("");

    const dispatch = useDispatch();

    const subGetAllPublic = useSelector((state) => state.subGetAllPublic);
    const { loading, error, subs } = subGetAllPublic;

    useEffect(() => {
        dispatch(getAllSubs());
    }, [dispatch, subUpdate]);

    useEffect(() => {
        setSubList(subs)
        setDefaultSorting(sortDefaultSubs(subs?.subs))
    }, [subs])

    return (
        <div>
            <TopBar />
            <div className="Page-container">
                <div className="search-container">
                    <Search
                        subList={subList}
                        setSubList={setSubList}
                        filteredList={filteredList}
                        setFilteredList={setFilteredList}
                        searchTermParent={searchTerm}
                        setSearchTermParent={setSearchTerm}
                        sort={sort}
                        setSort={setSort}
                    />
                </div>
                <div className="main-sub-container">
                    {(filteredList.length > 0) &&
                        <FilteredSubSejjits
                            filteredList={filteredList}
                            setFilteredList={setFilteredList}
                            sort={sort}
                            defaultSorting={defaultSorting}
                            setSubUpdate={setSubUpdate}
                        />
                    }
                    {(filteredList.length === 0 && searchTerm === "") &&
                        <AllSubSejjits loading={loading}
                            error={error}
                            defaultSorting={defaultSorting}
                            subs={subs}
                            sort={sort}
                            setSubUpdate={setSubUpdate}
                        />
                    }
                    {
                        (filteredList.length === 0 && searchTerm !== "") &&
                        <div className="no-results">
                            <h1>No results found</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    );

}