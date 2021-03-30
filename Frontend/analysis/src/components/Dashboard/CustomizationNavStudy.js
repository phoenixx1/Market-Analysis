import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import styled from "styled-components";
import { loadStudies } from "../../actions";
import {
  CycleIndicators,
  MomentumIndicators,
  OverlapStudies,
  PriceTransform,
  VolatilityIndicators,
  VolumeIndicators,
} from "./studiesList";
import StudyDropdown from "./StudyDropdown";

function CustomizationNav({ title, study, loadStudies }) {
  const updateType = (event, item) => {
    event.preventDefault();
    loadStudies(item);
  };

  return (
    <DropDownContainer>
      <DropdownButton
        id="dropdown-variants-secondary"
        variant="secondary"
        title={title}
        style={{ display: "flex" }}
      >
        <StudyDropdown name={"Overlap Studies"} list={OverlapStudies} />
        <StudyDropdown name={"Momentum Indicators"} list={MomentumIndicators} />
        <StudyDropdown name={"Volume Indicators"} list={VolumeIndicators} />
        <StudyDropdown
          name={"Volatility Indicators"}
          list={VolatilityIndicators}
        />
        <StudyDropdown name={"Price Transform"} list={PriceTransform} />
        <StudyDropdown name={"Cycle Indicators"} list={CycleIndicators} />

        <Dropdown.Divider />

        <Dropdown.Item href="#" onClick={(event) => updateType(event, "Clear")}>
          Clear
        </Dropdown.Item>
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
