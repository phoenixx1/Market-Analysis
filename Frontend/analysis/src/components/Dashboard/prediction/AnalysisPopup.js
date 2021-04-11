import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import RenderChart from "./RenderChart";

function AnalysisPopup() {
  const [show, setShow] = useState(false);
  const handlePopup = () => setShow(!show);

  return (
    <AnalysisPopupContainer>
      <Button variant="secondary" onClick={handlePopup}>
        ARIMA
      </Button>

      <Modal
        size="lg"
        // dialogClassName="modal-90w"
        show={show}
        onHide={handlePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>ARIMA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RenderChart />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePopup}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </AnalysisPopupContainer>
  );
}

export default AnalysisPopup;

const AnalysisPopupContainer = styled.div`
  margin-left: 20px;
`;
