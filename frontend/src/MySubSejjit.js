import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, Alert, Badge } from 'react-bootstrap';
import TopBar from './TopBar';
import Loading from './Components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { subRegister, getAllMySubs, deleteSub, getNumPosts } from './actions/subActions';
import { useNavigate } from 'react-router-dom';

const SubSejjitForm = ({ newSub, setNewSub }) => {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [bannedWords, setBannedWords] = useState('');

    const dispatch = useDispatch();
    const sub = useSelector((state) => state.subRegister);
    const { loading, error, subInfo } = sub;

    useEffect(() => {
        if (subInfo) {
            setNewSub(newSub + 1);
            setName('');
            setDescription('');
            setTags('');
            setBannedWords('');
            setShowForm(false);
        }
    }, [subInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const tagsList = tags.split(',').map((tag) => tag.trim().toLowerCase());
        const bannedWordsList = bannedWords.split(',').map((word) => word.trim().toLowerCase());

        console.log('Name:', name);
        console.log('Description:', description);
        console.log('Tags:', tagsList);
        console.log('Banned words:', bannedWordsList);

        dispatch(subRegister(name, description, tagsList, bannedWordsList));
    };

    return (
        <>
            {error && (
                <Alert variant="danger">{error}</Alert>
            )}
            {subInfo && (
                <Alert variant="success">Subsejjit created successfully!</Alert>
            )}
            {!showForm && (
                <div className="Sub-form">
                    <div className="form-header">
                        <h2 className="form-title">Create a SubSejjit</h2>
                    </div>
                    <div className="form-content">
                        <div className="mb-3 text-justify">
                            <div className="form-text">Create a subsejjit to share your interests with the world. Subsejjits can be anything from your favorite sports team to your favorite fandom. Subsejjits are restricted to approved users only. </div>
                        </div>

                        <Button onClick={() => setShowForm(true)}>
                            Create
                        </Button>
                    </div>
                </div>
            )}
            {showForm && (
                <Form onSubmit={handleSubmit} className="Sub-form">
                    <div className="form-header">
                        <h2 className="form-title">Create a Subsejjit</h2>
                    </div>
                    <div className="form-content">
                        <Form.Group className='mt-3'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name of the subsejjit"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description of your subsejjit"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tags:</Form.Label>
                            <Form.Control
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="Lowercase comma separated list of tags"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Banned Words:</Form.Label>
                            <FormControl
                                type="text"
                                value={bannedWords}
                                onChange={(e) => setBannedWords(e.target.value)}
                                placeholder="Comma separated list of banned words"
                            />
                        </Form.Group>

                        <div className="row justify-content-between">
                            <div className="col-4">
                                <Button type="submit" className='mt-3'>
                                    {!loading && <p className='m-0'>Create</p>}
                                </Button>
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                                <Button onClick={() => setShowForm(false)} className='mt-3'>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </>
    );
}

const SubSejjit = ({ sub, newSub, setNewSub, deleteHandlerParent }) => {

    const name = sub.name;

    const description = sub.description;

    const banned_words = sub.banned_words;

    const tags = sub.tags;

    const navigate = useNavigate();

    const deleteHandler = (id) => {
        deleteHandlerParent(id);
        console.log('Delete handler in subsejjit');
    };

    const openSubHandler = (id) => {
        console.log('Open sub handler in subsejjit');
        navigate(`/mysubsejjits/${id}`);
    };

    return (
        <div className="sub-sejjit-container">
            <div className="sub-sejjit-header row justify-content-between">
                <div className="col-8 sub-sejjit-title d-flex align-items-center">
                    s/<span className='sub-sejjit-name'>{name}</span>
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
                        follower-number'> {sub.num_posts} Posts</Badge>
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
                <div className="row justify-content-between mb-2">
                    <div className="col-1 d-flex justify-content-start">
                        <Button variant="primary" className='open-button' onClick={() => openSubHandler(sub._id)}>
                            Open
                        </Button>
                    </div>
                    <div className="col-1 d-flex justify-content-end">
                        <Button variant="primary" className='follow-button'
                            onClick={() => deleteHandler(sub._id)}
                        >
                            <span>Delete</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SubSejjitList = ({ newSub, setNewSub }) => {

    const dispatch = useDispatch();
    const subGetAll = useSelector(state => state.subGetAll);

    const { loading, error, subs } = subGetAll;

    const subDelete = useSelector((state) => state.subDelete);

    const { loading: loadingDelete, error: errorDelete, success } = subDelete;

    useEffect(() => {
        dispatch(getAllMySubs());
    }, [dispatch, newSub, success]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this subsejjit?')
        ) {
            dispatch(deleteSub(id));
        }
    };

    const subList = subs?.subs;

    return (
        <div className="sub-list">
            <div className="sub-list-header">
                <h2 className="sub-list-title text-center">Your SubSejjits</h2>
            </div>
            {error && <Alert variant='danger'>{error}</Alert>}
            {errorDelete && <Alert variant='danger'>{errorDelete}</Alert>}
            {loading && <Loading />}
            {!loading &&
                <div className="sub-list-content">
                    {subList?.map(sub => (
                        <SubSejjit sub={sub} newSub={newSub} setNewSub={setNewSub} deleteHandlerParent={deleteHandler} />
                    ))}
                </div>
            }
        </div>
    )
}

const MySubSejjit = () => {

    const [newSub, setNewSub] = useState([]);

    return (
        <div>
            <TopBar />
            <div className="Page-container">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-xl-5 mb-3">
                            <SubSejjitForm newSub={newSub} setNewSub={setNewSub} />
                        </div>
                        <div className="col-xl-7 mb-3">
                            <SubSejjitList newSub={newSub} setNewSub={setNewSub} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MySubSejjit;