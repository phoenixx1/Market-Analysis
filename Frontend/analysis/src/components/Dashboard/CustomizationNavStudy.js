import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import styled from "styled-components";
import { loadStudies } from "../../actions";

function CustomizationNav({ items, title, study, loadStudies }) {
  const updateType = (event, item) => {
    event.preventDefault();
    // setChartType(item);
    // console.log(item);
    loadStudies(item);
  };

  return (
    <DropDownContainer>
      <DropdownButton
        id="dropdown-variants-secondary"
        variant="secondary"
        title={title}
      >
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
  study: state.loadStudies,
});

export default connect(mapStateToProps, { loadStudies })(CustomizationNav);

const DropDownContainer = styled.div`
  margin-left: 20px;
`;
