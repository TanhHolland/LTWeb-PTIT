import React from "react";
import {Typography} from "@mui/material";

import "./styles.css";
import {NavLink, useParams} from "react-router-dom";

import models from "../../modelData/models";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const user = useParams();
    const person = models.userModel(user.userId);
    return (
        <>
          <Typography variant="body1">
            This should be the UserDetail view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property match.
            So this should show details of user: {user.userId}.
            You can fetch the model for the user from models.userModel.
          </Typography>
          <h2>View infor</h2>
          <ul>
            <li>ID : {person._id}</li>
            <li>Firstname : {person.first_name}</li>
            <li>LastName : {person.last_name}</li>
            <li>Location : {person.last_name}</li>
            <li>Description : {person.description}</li>
            <li>Occupation : {person.occupation}</li>
          </ul>
          <NavLink to={"/photos/"+ person._id }><button>View Photo</button></NavLink>
        </>
    );
}

export default UserDetail;
