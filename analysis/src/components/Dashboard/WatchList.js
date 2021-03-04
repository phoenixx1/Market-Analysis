import React from "react";
import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "../../Firebase";
// import ClearIcon from "@material-ui/icons/Clear";

function WatchList() {
  const [companies] = useCollection(
    db
      .collection("watchlist")
      .doc("list")
      .collection("companies")
      .orderBy("timestamp", "asc")
  );
  // console.log(companies.docs());

  return (
    <WatchListContainer>
      {companies?.docs.map((allCompany) => {
        const { company } = allCompany.data();
        return (
          <CompanyContainer>
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

export default WatchList;

const WatchListContainer = styled.div`
  margin-top: 10px;
`;

const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  color: #fff;
  background: rgb(46, 53, 59);
  margin-top: 10px;
  cursor: pointer;
  width: 250px;

  :hover {
    background: rgba(86, 92, 97, 0.6);
    transform: scale(1.01);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
