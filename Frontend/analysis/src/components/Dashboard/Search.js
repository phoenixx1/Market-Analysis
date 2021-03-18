import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { fetchNames } from "../../actions";
import { db, auth } from "../../Firebase";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      companyList: [],
      // authUser: null,
    };
  }

  componentDidMount() {
    this.props.fetchNames();
    // this.listener = this.firebase.auth.useAuthState((authUser) => {
    //   authUser
    //     ? this.setState({ authUser })
    //     : this.setState({ authUser: null });
    // });
  }

  addToList(event, value) {
    event.preventDefault();

    if (value.length != 0) {
      // const companies = [];
      // db.collection("watchlist")
      //   .doc("list")
      //   .collection("companies")
      //   .get()
      //   .then((comp) => {
      //     comp.docs.forEach((doc) => {
      //       companies.push(String(doc.data().company));
      //     });
      //   });
      db.collection("watchlist").doc("list").collection("companies").add({
        company: value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  }

  render() {
    let companyList = [];
    this.props.names.map((name) => {
      return name.map((n) => {
        companyList.push(n.SYMBOL); // + " : " + n.SYMBOL);
      });
    });

    return (
      <SearchContainer>
        <AutocompleteContainer
          onChange={(event, value) => this.addToList(event, value)}
          freeSolo
          clearOnBlur
          disableClearable
          options={companyList}
          renderInput={(params) => (
            <AutoTextField
              {...params}
              id="standard-secondary"
              label="Search Company Name"
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
      </SearchContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { names: state.company };
};

export default connect(mapStateToProps, { fetchNames })(Search);

const AutocompleteContainer = styled(Autocomplete)`
  width: 230px;
  margin-top: -30px;
  height: 5vh;
`;

const AutoTextField = styled(TextField)`
  /* background-color: lightgray; */
  height: 5vh;
`;

const SearchContainer = styled.div`
  /* Use rgba value for not applying opacity property to child elements */
  background: rgba(94, 108, 130, 0.5);
  margin-top: 15px;
  width: 100%;
  height: 5vh;
  display: flex;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;
