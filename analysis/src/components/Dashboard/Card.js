import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import styled from "styled-components";

function Card({ title, items }) {
  return (
    <DropDownContainer>
      <DropdownButton
        id="dropdown-variants-secondary"
        variant="secondary"
        title={title}
      >
        {items.map((item) => {
          return <Dropdown.Item href="#">{item}</Dropdown.Item>;
        })}
      </DropdownButton>
    </DropDownContainer>
  );
}

export default Card;

const DropDownContainer = styled.div`
  margin-left: 20px;
`;
