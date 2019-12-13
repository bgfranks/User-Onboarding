import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Card = styled.div`
  width: 80%;
  height: 60px;
  background: #006daa;
  border-radius: 10px;
  color: #f3f3f3;
  padding-bottom: 20px;

  h3 {
    font-size: 1.4rem;
    padding: 10px 0 5px;
    margin: 0;
  }

  p {
    font-size: 1.2rem;
    margin: 0;
    padding-bottom: 20px;
  }
`;

export default function UserCard(props) {
  return (
    <CardContainer>
      {props.user.map(newUser => (
        <Card key={newUser.id}>
          <h3>{newUser.name}</h3>
          <p>{newUser.email}</p>
        </Card>
      ))}
    </CardContainer>
  );
}
