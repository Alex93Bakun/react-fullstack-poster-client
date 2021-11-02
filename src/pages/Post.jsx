import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(`http://localhost:3001/posts/byId/${id}`)
                .then((response) => {
                    setPostObject(response.data);
                });
            await axios
                .get(`http://localhost:3001/comments/${id}`)
                .then((response) => {
                    setComments(response.data);
                });
        };
        fetchData();
    }, []);

    const addComment = () => {
        axios
            .post(`http://localhost:3001/comments`, {
                commentBody: newComment,
                PostId: id,
            })
            .then((response) => {
                const commentToAdd = { commentBody: newComment };
                setComments([...comments, commentToAdd]);
                setNewComment('');
            });
    };

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title"> {postObject.title} </div>
                    <div className="body">{postObject.postText}</div>
                    <div className="footer">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input
                        type="text"
                        placeholder="Comment..."
                        autoComplete="off"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment) => {
                        return (
                            <div key={comment.id} className="comment">
                                {comment.commentBody}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Post;