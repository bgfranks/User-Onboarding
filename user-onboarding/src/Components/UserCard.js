import React from "react";
import styled from "styled-components";

export default function UserCard(props) {
  return (
    <div>
      {props.user.map(newUser => (
        <div key={newUser.id}>
          <h3>{newUser.name}</h3>
          <h4>{newUser.email}</h4>
        </div>
      ))}
    </div>
  );
}
