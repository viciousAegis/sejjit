import React from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPosts, upvotePost, downvotePost, commentPost, unsavePost } from "./actions/postActions";
import Loading from "./Components/Loading";
import TopBar from "./TopBar";
import { Button, Badge, Form } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import { followUser } from "./actions/userActions";
import moment from "moment";
import { BsFillBookmarkXFill } from "react-icons/bs";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { MdReportProblem } from "react-icons/md";

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

const Post = ({ post, postUpdate, setPostUpdate, setErrorPost, setSuccessPost }) => {

    const dispatch = useDispatch();

    const postUpvote = useSelector((state) => state.postUpvote);
    const { loading: loadingUpvote, error: errorUpvote, post: successUpvote } = postUpvote;

    const postDownvote = useSelector((state) => state.postDownvote);
    const { loading: loadingDownvote, error: errorDownvote, post: successDownvote } = postDownvote;

    const userFollow = useSelector((state) => state.userFollow);
    const { loading: loadingFollow, error: errorFollow, userInfoCombo: successFollow } = userFollow;

    const postComment = useSelector((state) => state.postComment);
    const { loading: loadingComment, error: errorComment, comment } = postComment;

    const postUnsave = useSelector((state) => state.postUnsave);
    const { loading: loadingUnsave, error: errorUnsave, post: successUnsave, id } = postUnsave;

    const [commentContent, setCommentContent] = useState("");

    const followHandle = (id) => {
        dispatch(followUser(id));
        console.log(id);
    };

    const upvoteSubmit = (id) => {
        dispatch(upvotePost(id));
        console.log(id);
    };

    const downvoteSubmit = (id) => {
        dispatch(downvotePost(id));
        console.log(id);
    };

    const unsaveHandle = (id) => {
        dispatch(unsavePost(id));
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

    useEffect(() => {
        if (successUnsave) {
            setPostUpdate(successUnsave);
        }
    }, [successUnsave]);

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
                            <div className="row mt-3">
                                <div className="col-12 d-flex">
                                    <div className="post-sub-name">
                                        Posted in <Badge bg="dark"
                                        >s/{post.sub_name}</Badge>
                                    </div>
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
                                        <Button variant="outline-dark" className="post-btn" size="sm" onClick={() => unsaveHandle(post._id)}>
                                            {loadingUnsave && <>
                                                {id && id === post._id ? <Loading /> :
                                                    <span>
                                                        <BsFillBookmarkXFill />
                                                    </span>}
                                            </>
                                            }
                                            {!id && id !== post._id ?
                                                <span>
                                                    <BsFillBookmarkXFill />
                                                </span> : null}
                                        </Button>
                                    </div>
                                    <div className="post-footer-item">
                                        <Button variant="outline-dark" className="post-btn" size="sm" onClick={() => unsaveHandle(post._id)}>
                                            {loadingUnsave && <>
                                                {id && id === post._id ? <Loading /> :
                                                    <span>
                                                        <MdReportProblem />
                                                    </span>}
                                            </>
                                            }
                                            {!id && id !== post._id ?
                                                <span>
                                                    <MdReportProblem />
                                                </span> : null}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {errorUnsave && errorUnsave[1] === post._id && <Alert variant="danger">{errorUnsave[0]}</Alert>}
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

export default function SavedPosts() {
    const [postUpdate, setPostUpdate] = useState();
    const [errorPost, setErrorPost] = useState();
    const [successPost, setSuccessPost] = useState();

    const [postsList, setPostsList] = useState([]);

    const dispatch = useDispatch();
    const postsGetSaved = useSelector((state) => state.postsGetSaved);
    const { loading, error, posts } = postsGetSaved;

    useEffect(() => {
        dispatch(getSavedPosts());
    }, [dispatch, postUpdate]);

    useEffect(() => {
        if (posts) {
            setPostsList(posts.sort((a, b) => {
                return moment(b.createdAt).diff(moment(a.createdAt))
            }));
        }
    }, [posts]);

    return (
        <div>
            <TopBar />
            <div className="Page-container">ist
                <div className="main-sub-container">
                    <h2 className="sub-list-title">Saved Posts</h2>
                    {loading && <Loading />}
                    {error && <Alert variant="danger" >{error}</Alert>}
                    {errorPost && <Alert variant="danger" >{errorPost}</Alert>}
                    {successPost && <Alert variant="success" >{successPost}</Alert>}
                    <div className="saved-post-list-content">
                        {postsList && postsList.map((post) => (
                            <Post post={post}
                                postUpdate={postUpdate}
                                setPostUpdate={setPostUpdate}
                                setErrorPost={setErrorPost}
                                setSuccessPost={setSuccessPost}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}