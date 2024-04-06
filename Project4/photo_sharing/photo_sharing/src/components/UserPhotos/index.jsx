import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
    const user = useParams();
    const listPhotos = models.photoOfUserModel(user.userId);
    const person = models.userModel(user.userId);
    const comments = models.comments;
    const DisPlayComment = () => {
        for (let j = 0; j < listPhotos.length; j++) {
            let photo = listPhotos[j];
            let fitlerComment = [];
            for (let i = 0; i < comments.length; i++) {
                let comment = comments[i];
                if (comment.photo_id === photo._id) {
                    fitlerComment.push(comment);
                }
            }
            for (let i = 0; i < fitlerComment.length; i++) {
                let ob = fitlerComment[i];
                return (
                  <>
                    <p>User: {ob.user.first_name}</p>
                    <p>Comment: {ob.comment}</p>
                    <p>Time : {ob.date_time}</p>
                  </>
                );
            }
        }
    };
    return (
        <>
            <Typography variant="body1">
                This should be the UserPhotos view of the PhotoShare app. Since
                it is invoked from React Router the params from the route will
                be in property match. So this should show details of user:
                {user.userId}. You can fetch the model for the user from
                models.photoOfUserModel(userId):
            </Typography>
            <h1>View Photo by {person.first_name}</h1>
            <div className="list-photo">
                {listPhotos.map((photo) => {
                    return (
                        <>
                            <hr></hr>
                            <img src={`../../images/${photo.file_name}`} alt={`Photo ${photo.file_name}`}/>
                            <p>{photo.file_name}</p>
                            <p>ID : {photo._id}</p>
                            <p>Time : {photo.date_time}</p>
                            <h3>Comment</h3>
                            {DisPlayComment()}
                        </>
                    );
                })}
            </div>
        </>
    );
}

export default UserPhotos;
