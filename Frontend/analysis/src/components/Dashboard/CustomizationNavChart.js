import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import styled from "styled-components";
import { setChartType } from "../../actions";

function CustomizationNav({ items, title, currentType, setChartType }) {
  const updateType = (event, item) => {
    event.preventDefault();

    setChartType(item);
  };
  const direction = "right";
  return (
    <DropDownContainer>
      <DropdownButton
        id="dropdown-variants-secondary"
        variant="secondary"
        title={title}
      >
        {/* <DropdownButton
          id="dropdown-variants-secondary"
          variant="secondary"
          title={title}
          drop="right"
        >
          <Dropdown.Item>Hi</Dropdown.Item>
        </DropdownButton> */}
        {/* <Dropdown.Header>Head</Dropdown.Header>
        <Dropdown.Divider /> */}
        {items.map((item) => {
          return (
            <Dropdown.Item
              href="#"
              onClick={(event) => updateType(event, item)}
            >
              {item}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </DropDownContainer>
  );
}

const mapStateToProps = (state) => ({
  currentType: state.currentChartType,
});

export default connect(mapStateToProps, { setChartType })(CustomizationNav);

const DropDownContainer = styled.div`
  margin-left: 20px;
`;
