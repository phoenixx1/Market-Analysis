import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { fetchNames, setName } from "../../actions";
import { withRouter } from "react-router-dom";

class Search extends React.Component {
  componentDidMount() {
    this.props.fetchNames();
  }

  showResult(event, value) {
    const { history } = this.props;
    if (history) history.push("/dashboard");
    let fullName = value.split(":").map((item) => item.trim());

    this.props.setName(fullName[1]);
  }

  render() {
    let companyList = [];
    this.props.names.map((name) => {
      return name.map((n) => {
        companyList.push(n.COMPANY + " : " + n.SYMBOL);
      });
    });

    return (
      <SearchContainer className="shadow-lg p-3 mb-5 rounded">
        <SearchInnerContainer>
          <h1>Search</h1>

          <AutocompleteContainer
            freeSolo
            onChange={(event, value) => this.showResult(event, value)}
            disableClearable
            options={companyList}
            renderInput={(params) => (
              <AutoTextField
                id="standard-secondary"
                {...params}
                label="Search Company Name"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
        </SearchInnerContainer>
      </SearchContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { names: state.company, currentCompanyName: state.currentCompany };
};

export default withRouter(
  connect(mapStateToProps, { fetchNames, setName })(Search)
);

const AutocompleteContainer = styled(Autocomplete)`
  width: 600px;
  border-radius: 50px;
`;

const AutoTextField = styled(TextField)`
  background-color: lightgray;
  border-radius: 50px;
`;

const SearchContainer = styled.div`
  /* Use rgba value for not applying opacity property to child elements */
  /* background: rgba(54, 62, 74, 0.5); */
  height: 35vh;
  display: grid;
  place-items: center;
`;

const SearchInnerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 100px;

  > h1 {
    color: #000;
    font-size: 80px;
    margin-top: -100px;

    @media screen and (max-width: 960px) {
      font-size: 50px;
      margin-top: -150px;
    }
    @media screen and (max-width: 768px) {
      font-size: 30px;
      margin-top: -100px;
    }
  }
`;
