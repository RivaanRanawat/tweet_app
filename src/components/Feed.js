import React from "react";
import { Container, Row, Col } from "react-materialize";
import Profile from "./Profile";
import AddPost from "./AddPost";
import SinglePost from "./SinglePost";
import PostList from "./PostList";

export default ({ userDetails }) => {
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
