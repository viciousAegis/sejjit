import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSub } from "./actions/subActions";
import { useEffect } from "react";
import TopBar from "./TopBar";
import Loading from "./Components/Loading";
import { useState } from "react";
import { Badge, Button, Form, Alert } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { createPost, getPosts, upvotePost, downvotePost, commentPost, savePost } from "./actions/postActions";
import { createReport } from "./actions/reportActions";
import { getUserProfile, followUser } from "./actions/userActions";
import moment from "moment";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { MdReportProblem } from "react-icons/md";

function CreatePostModal({ show, handleClose, sub, postsNum, updatePostsNum }) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const dispatch = useDispatch();
    const postCreate = useSelector((state) => state.postCreate);
    const { loading, error, post } = postCreate;

    const checkBannedWords = () => {
        let contentList = content.split(" ");
        contentList = contentList.map(word => word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());

        let titleList = title.split(" ");
        titleList = titleList.map(word => word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());

        const bannedWords = sub.banned_words;

        for (let j = 0; j < contentList.length; j++) {
            if (bannedWords.includes(contentList[j]) || bannedWords.includes(titleList[j])) {
                alert("Your post contains banned words. They will not be displayed.");
                break;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
        checkBannedWords();
        dispatch(createPost(title, content, sub._id));
        setTitle("");
        setContent("");
    }

    const closeFunc = () => {
        setTitle("");
        setContent("");
        handleClose();
    }

    useEffect(() => {
        if (post) {
            updatePostsNum(postsNum + 1);
        }
    }, [post])

    return (
        <>
            {loading && <Loading />}
            {error && <p>{error}</p>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="type away!"
                                rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeFunc}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function CreateReportModal({ showReport, handleCloseReport, reportedPost, setReportMessage, setErrorReport }) {

    const [concern, setConcern] = useState("");

    const dispatch = useDispatch();
    const reportCreate = useSelector((state) => state.reportCreate);
    const { loading, error, report, id } = reportCreate;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReport(reportedPost._id, concern));;
        handleCloseReport();
        setConcern("");
    }

    const closeFunc = () => {
        setConcern("");
        handleCloseReport();
    }

    useEffect(() => {
        if (report) {
            setReportMessage("Post reported successfully!");
        }
    }, [report])

    useEffect(() => {
        if (error) {
            setErrorReport(error[0]);
        }
    }, [error])

    return (
        <>
            {loading && <Loading />}
            {error && <p>{error}</p>}
            <Modal show={showReport} onHide={handleCloseReport}>
                <Modal.Header closeButton>
                    <Modal.Title>Report Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Concern</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter concern"
                                value={concern}
                                onChange={(e) => setConcern(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeFunc}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Report
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const SubDetailsCard = ({ loading, error, sub }) => {
    const subData = sub?.sub

    return (
        <div>
            {loading && <Loading />}
            {error && <div>{error}</div>}
            {subData && (
                <div className="card">
                    <div className="card-header p-0">
                        <img className="card-img" src={subData.pic} alt="sub pic" />
                    </div>
                    <div className="mt-2 ps-3">
                        {subData.tags.map((tag) => (
                            <Badge bg="success" className="me-2">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="mt-2 ps-3">
                        {subData.banned_words.map((word) => (
                            <Badge bg="danger" className="me-2">
                                {word}
                            </Badge>
                        ))}
                    </div>
                    <div className="card-body pt-0">
                        <div className="row">
                            <div className="col-6">
                                <div className="sub-heading mt-0">s/{subData.name}</div>
                                <div className="sub-description">{subData.description}</div>
                            </div>
                            <div className="col-6 d-flex justify-content-end align-items-center">
                                <div>

                                    <div className="sub-stats">
                                        {subData.followers.length} followers
                                    </div>
                                    <div className="sub-stats">
                                        {subData.num_posts} posts
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

const Comments = ({ comments }) => {
    if (comments.length === 0) {
        return (
            <div className="list-group-item">
                <p>No comments yet</p>
            </div>
        );
    }

    return (
        <ul className="list-group list-group-flush"
            style={{
                borderRadius: "4px",
                border: "1px solid #e6e6e6"
            }}
        >
            {comments.map((comment) => (
                <li className="list-group-item">
                    <div className="comment-header">
                        <div className="comment-user">
                            <span className="comment-username"
                                style={{ fontWeight: "bold" }}
                            >{comment[0]}</span>
                        </div>
                    </div>
                    <div className="comment-body">
                        <div className="comment-content">{comment[1]}</div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

const Post = ({ post, postUpdate, setPostUpdate, setErrorPost, setSuccessPost, handleShowReport, setReportedPost }) => {

    const dispatch = useDispatch();

    const postUpvote = useSelector((state) => state.postUpvote);
    const { loading: loadingUpvote, error: errorUpvote, post: successUpvote } = postUpvote;

    const postDownvote = useSelector((state) => state.postDownvote);
    const { loading: loadingDownvote, error: errorDownvote, post: successDownvote } = postDownvote;

    const userFollow = useSelector((state) => state.userFollow);
    const { loading: loadingFollow, error: errorFollow, userInfoCombo: successFollow } = userFollow;

    const postComment = useSelector((state) => state.postComment);
    const { loading: loadingComment, error: errorComment, comment } = postComment;

    const postSave = useSelector((state) => state.postSave);
    const { loading: loadingSave, error: errorSave, post: successSave, id } = postSave;

    const [commentContent, setCommentContent] = useState("");

    const followHandle = (id) => {
        dispatch(followUser(id));
        console.log(id);
    };

    const reportHandle = (post) => {
        console.log(post._id);
        handleShowReport(post);
    }

    const upvoteSubmit = (id) => {
        dispatch(upvotePost(id));
        console.log(id);
    };

    const downvoteSubmit = (id) => {
        dispatch(downvotePost(id));
        console.log(id);
    };

    const saveHandle = (id) => {
        dispatch(savePost(id));
        console.log(id);
    };

    const commentHandle = (id) => {
        console.log(commentContent)
        dispatch(commentPost(id, commentContent));
    }

    const checkIfUpvoted = (post) => {
        if (post.upvotes.includes(JSON.parse(localStorage.getItem("user"))._id)) {
            return true;
        }

        return false;
    }

    const checkIfDownvoted = (post) => {
        if (post.downvotes.includes(JSON.parse(localStorage.getItem("user"))._id)) {
            return true;
        }

        return false;
    }

    useEffect(() => {
        if (successUpvote) {
            setPostUpdate(successUpvote);
        }
    }, [successUpvote]);

    useEffect(() => {
        if (successDownvote) {
            setPostUpdate(successDownvote);
        }
    }, [successDownvote]);

    useEffect(() => {
        if (successFollow) {
            console.log(successFollow);
            setSuccessPost(`Successfully followed ${successFollow.updatedUserToFollow.username}`);
        }
    }, [successFollow]);

    useEffect(() => {
        if (errorFollow) {
            setErrorPost(errorFollow);
        }
    }, [errorFollow]);

    useEffect(() => {
        if (comment) {
            console.log("comment" + comment);
            setPostUpdate("success");
            setCommentContent("");
        }
    }, [comment]);

    useEffect(() => {
        if (errorComment) {
            setErrorPost(errorComment);
        }
    }, [errorComment]);

    return (
        <div>
            <div className="post-card">
                {post && (
                    <div className="post-card-body">
                        <div className="post-card-header">
                            <div className="row align-items-center">
                                <div className="col-2">
                                    <img className="post-user-pic" src={post.user_pic} alt="user pic" />
                                </div>
                                <div className="col-5">
                                    <div className="post-user-name">{post.user_name}</div>
                                    <div className="post-user-date">{moment(post.createdAt).fromNow()}</div>
                                </div>
                                <div className="col-5 d-flex justify-content-end">
                                    <Button className="post-btn" size="sm" onClick={() => followHandle(post.posted_by)}>
                                        <span>Follow</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="post-card-content">
                            <div className="row">
                                <div className="post-title">{post.title}</div>
                                <div className="post-content">{post.content}</div>
                            </div>
                        </div>
                        <div className="post-card-footer container">
                            <div className="row mb-3 justify-content-between">
                                <div className="col-7 d-flex">
                                    <div className="post-footer-item">
                                        <Button variant="outline-dark" className="post-btn" size="sm"
                                            onClick={() => upvoteSubmit(post._id)}
                                            disabled={checkIfUpvoted(post)}
                                        >
                                            <span>
                                                <BiUpvote />
                                                <Badge bg="dark" className="ms-2">
                                                    {post.upvotes.length}
                                                </Badge>
                                            </span>
                                        </Button>
                                    </div>
                                    <div className="post-footer-item">
                                        <Button variant="outline-dark" className="post-btn" size="sm"
                                            onClick={() => downvoteSubmit(post._id)}
                                            disabled={checkIfDownvoted(post)}
                                        >
                                            <span>
                                                <BiDownvote />
                                                <Badge bg="dark" className="ms-2">
                                                    {post.downvotes.length}
                                                </Badge>
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                    <div className="post-footer-item">
                                        <Button variant="outline-dark" className="post-btn" size="sm" onClick={() => saveHandle(post._id)}>
                                            {loadingSave && <>
                                                {id && id === post._id ? <Loading /> :
                                                    <span>
                                                        <BsFillBookmarkCheckFill />
                                                    </span>}
                                            </>
                                            }
                                            {!id && id !== post._id ?
                                                <span>
                                                    <BsFillBookmarkCheckFill />
                                                </span> : null}
                                        </Button>
                                    </div>
                                    <div className="post-footer-item">
                                        <Button variant="outline-dark" className="post-btn" size="sm" onClick={() => reportHandle(post)}>
                                            <span>
                                                <MdReportProblem />
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {errorSave && errorSave[1] === post._id && <Alert variant="danger">{errorSave[0]}</Alert>}
                                {successSave && successSave.post === post._id && <Alert variant="success">Post saved</Alert>}
                            </div>
                        </div>
                        <div className="post-card-comments">
                            <div className="row">
                                <div className="col-12">
                                    <div className="post-comment-input">
                                        <Form>
                                            <div className="row">
                                                <div className="col-9">
                                                    <Form.Group className="mb-3">
                                                        <Form.Control type="text" placeholder="Add a comment" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
                                                    </Form.Group>

                                                </div>
                                                <div className="col-3">
                                                    <Button variant="primary" onClick={() => commentHandle(post._id)}>
                                                        Submit
                                                    </Button>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                            <Comments comments={post.comments} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AllPosts = ({ subId, postsNum, handleShowReport, setReportedPost }) => {

    const [postUpdate, setPostUpdate] = useState();
    const [errorPost, setErrorPost] = useState();
    const [successPost, setSuccessPost] = useState();

    const dispatch = useDispatch();
    const postsGetBySub = useSelector((state) => state.postsGetBySub);

    const { loading, error, posts } = postsGetBySub;

    useEffect(() => {
        dispatch(getPosts(subId));
    }, [dispatch, postUpdate, postsNum]);

    const posts_sorted = () => {
        if (posts) {
            return posts.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
    };

    return (
        <div className="container post-container">
            {loading && <Loading />}
            {error && <div>{error}</div>}
            {posts && (
                <>
                    <div className="post-header">
                        <div className="post-heading">
                            Recent Posts
                        </div>
                    </div>

                    {errorPost && <Alert variant="danger">{errorPost}</Alert>}
                    {successPost && <Alert variant="success">{successPost}</Alert>}

                    <div className="all-posts">
                        {posts_sorted().map((post) => (
                            <Post post={post}
                                postUpdate={postUpdate}
                                setPostUpdate={setPostUpdate}
                                setErrorPost={setErrorPost}
                                setSuccessPost={setSuccessPost}
                                handleShowReport={handleShowReport}
                                setReportedPost={setReportedPost}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}


const CreatePostForm = ({ sub, handleShow }) => {

    const checkBanned = () => {
        const bannedUsers = sub.sub.banned_users;
        const user = JSON.parse(localStorage.getItem("user"));
        if (bannedUsers.includes(user._id)) {
            return true;
        }
        return false;
    };

    const checkFollowing = () => {
        const followingUsers = sub.sub.followers;
        const user = JSON.parse(localStorage.getItem("user"));
        if (followingUsers.includes(user._id)) {
            return true;
        }
        return false;
    }

    const [isUserBanned, setIsUserBanned] = useState(() => {
        checkBanned();
    });
    const [isUserFollowing, setIsUserFollowing] = useState(() => {
        checkFollowing();
    });

    useEffect(() => {
        setIsUserBanned(checkBanned());
        setIsUserFollowing(checkFollowing());
    }, [sub]);


    console.log(sub);
    return (
        <div className="card">
            <div className="m-2 ps-3 d-flex justify-content-center">
                <Button variant="primary" className="me-2"
                    onClick={handleShow}
                    disabled={isUserBanned || !isUserFollowing}
                >
                    {!isUserBanned && isUserFollowing && <span>Create A Post</span>}
                    {isUserBanned && <span>You cannot post on this sub</span>}
                    {!isUserFollowing && !isUserBanned && <span>You must follow this sub to post</span>}
                </Button>
            </div>
        </div>
    );
};

export default function SubMainPage() {

    const location = useLocation();
    const subId = location.pathname.split("/")[2];

    const dispatch = useDispatch();
    const subGetOne = useSelector((state) => state.subGetOne);
    const { loading, error, sub } = subGetOne;

    const userGet = useSelector((state) => state.userGet);
    const { userInfo } = userGet;

    useEffect(() => {
        dispatch(getOneSub(subId));
    }, [dispatch]);

    const [show, setShow] = useState(false);
    const [postsNum, updatePostsNum] = useState(0);

    const [showReport, setShowReport] = useState(false);
    const [reportedPost, setReportedPost] = useState();
    const [reportMessage, setReportMessage] = useState();
    const [errorReport, setErrorReport] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseReport = () => setShowReport(false);

    const handleShowReport = (postId) => {
        setShowReport(true)
        setReportedPost(postId)
    };

    return (
        <div>
            <TopBar />
            <div className="Page-container">
                <CreatePostModal
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    sub={sub?.sub}
                    postsNum={postsNum}
                    updatePostsNum={updatePostsNum}
                />
                <CreateReportModal
                    showReport={showReport}
                    handleCloseReport={handleCloseReport}
                    reportedPost={reportedPost}
                    setReportMessage={setReportMessage}
                    setErrorReport={setErrorReport}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 d-flex justify-content-center mb-3 p-0">
                            <SubDetailsCard loading={loading}
                                error={error}
                                sub={sub}
                            />
                        </div>

                        <div className="col-lg-6 p-3">
                            <div>
                                {reportMessage && <Alert variant="success">{reportMessage}</Alert>}
                                {errorReport && <Alert variant="danger">{errorReport}</Alert>}
                            </div>
                            <div className="d-flex justify-content-center">
                                {sub &&
                                    <CreatePostForm
                                        sub={sub}
                                        handleShow={handleShow}
                                    />}
                            </div>
                            <div>
                                <AllPosts subId={subId}
                                    postsNum={postsNum}
                                    handleShowReport={handleShowReport}
                                    setReportedPost={setReportedPost}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
