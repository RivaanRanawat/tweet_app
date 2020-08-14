import React, { useState } from "react";
import { Container, Row, Col } from "react-materialize";
import Profile from "./Profile";
import AddPost from "./AddPost";
import PostList from "./PostList";
import ProfilePage from "./ProfilePage";

export default ({ userDetails }) => {
  console.log(userDetails);
  return (
    <Container>
      <Row>
        <Col s={12} m={5}>
          <Profile userDetails={userDetails} />
        </Col>
        <Col s={12} m={7}>
          <AddPost />
          <PostList />
        </Col>
      </Row>
    </Container>
  );
};
