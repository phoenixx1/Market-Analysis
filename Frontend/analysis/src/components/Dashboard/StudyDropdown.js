import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { loadStudies, latestStudy } from "../../actions";
import { connect } from "react-redux";
import { Studies } from "./studiesList";

function StudyDropdown({ list, name, study, loadStudies, latestStudy }) {
  const updateType = (event, item) => {
    event.preventDefault();
    loadStudies(item);
    if (Studies.includes(item)) latestStudy(item);
  };
  return (
    <DropdownButton
      id="dropdown-variants-secondary"
      variant="light"
      title={name}
      drop="right"
    >
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {list.map((item) => {
          return (
            <Dropdown.Item
              href="#"
              onClick={(event) => updateType(event, item)}
            >
              {item}
            </Dropdown.Item>
          );
        })}
      </div>
    </DropdownButton>
  );
}
const mapStateToProps = (state) => ({
  study: state.loadStudies,
  selectedStudy: state.selectedStudy,
});

export default connect(mapStateToProps, { loadStudies, latestStudy })(
  StudyDropdown
);
