import React from "react";
import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../Firebase";
import { connect } from "react-redux";
import { setName } from "../../actions";
// import ClearIcon from "@material-ui/icons/Clear";

function WatchList({ currentCompanyName, setName }) {
  const [companies] = useCollection(
    db
      .collection("watchlist")
      .doc("list")
      .collection("companies")
      .orderBy("timestamp", "asc")
  );
  // console.log(companies.docs());

  const updateCompany = (event, company) => {
    // event.preventDefault();
    setName(company);
  };

  return (
    <WatchListContainer>
      {companies?.docs.map((allCompany) => {
        const { company } = allCompany.data();
        return (
          <CompanyContainer onClick={(event) => updateCompany(event, company)}>
            {company}
            {/* <span>
              <ClearIcon />
            </span> */}
          </CompanyContainer>
        );
      })}
    </WatchListContainer>
  );
}
const mapStateToProps = (state) => ({
  currentCompanyName: state.currentCompany,
});
export default connect(mapStateToProps, { setName })(WatchList);

const WatchListContainer = styled.div`
  margin-top: 10px;
  width: 100%;
`;

const CompanyContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 5px;
  color: #fff;
  background: rgb(94, 108, 130);
  margin-top: 10px;
  cursor: pointer;

  :hover {
    background: rgba(86, 92, 97, 0.6);
    transform: scale(1.01);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
