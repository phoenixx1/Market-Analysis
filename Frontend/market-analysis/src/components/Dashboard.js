import React from "react";
import "./Dashboard.css";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import Navbar from "./Navbar";
import SplineAreaChart from "./SplineAreaChart";
import Sidebar from "./Sidebar";
// import Search from "./Search";

class Dashboard extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "#E9EDF5" }}>
        <Navbar />
        <div className="company-header">
          <h1>ITC Ltd.</h1>
          <p className="company-info">
            <strong>NSE: ITC</strong>&nbsp;&nbsp;
            <strong>SECTOR: Cigarettes/Tobacco</strong>
          </p>
        </div>
        <Card>
          <CardBody>
            <Container fluid>
              <Row>
                <Col xs={2} style={{ margin: 30 }}>
                  <Card style={{ height: "150%" }}>
                    <CardBody>
                      <div class="ui medium icon input focus">
                        <input
                          style={{ width: "28vh", borderRadius: "25px" }}
                          type="text"
                          placeholder="Search..."
                        />
                        <i class="search icon"></i>
                      </div>
                      <Sidebar />
                    </CardBody>
                  </Card>
                </Col>

                <Col xs={4}>
                  <Card style={{ margin: 30 }}>
                    <CardBody>
                      <div className="cardscreen card">
                        <h3>Price Summary</h3>
                        <div class="row no-gutters">
                          <div class="col-6 col-md-3 compess">
                            <small>High</small>
                            <p class="mb-3 mb-md-0">
                              ₹&nbsp;
                              <span class="Number" value="212.45">
                                212.45
                              </span>
                            </p>
                          </div>
                          <div class="col-6 col-md-3 compess">
                            <small>Low</small>
                            <p class="mb-3 mb-md-0">
                              ₹&nbsp;
                              <span class="Number" value="206.9">
                                206.90
                              </span>
                            </p>
                          </div>
                          <div class="col-6 col-md-3 compess">
                            <small>52 Week High</small>
                            <p class="mb-3 mb-md-0">
                              ₹&nbsp;
                              <span class="Number" value="239.25">
                                239.25
                              </span>
                            </p>
                          </div>
                          <div class="col-6 col-md-3 compess">
                            <small>52 Week Low</small>
                            <p class="mb-3 mb-md-0">
                              ₹&nbsp;
                              <span class="Number" value="134.95">
                                134.95
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card style={{ height: "50%" }}>
                    <CardBody>
                      <h3 className="ui center aligned header">Analysis</h3>
                    </CardBody>
                  </Card>
                </Col>

                <Col xs={5}>
                  <Card style={{ margin: 30 }}>
                    <CardBody>
                      <div className="cardscreen card">
                        <h3>Price Trend</h3>
                        <SplineAreaChart
                          name="itc"
                          label="ITC"
                          type="splineArea"
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xs={9} sm={{ offset: 2 }}>
                  <Card style={{ margin: 30 }}>
                    <CardBody>
                      <div className="cardscreen card">
                        <h3>NIFTY50 Price Trend</h3>
                        <SplineAreaChart
                          name="data"
                          label="NIFTY50"
                          type="line"
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Dashboard;
