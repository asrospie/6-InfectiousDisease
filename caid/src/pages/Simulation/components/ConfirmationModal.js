import React from 'react';
import { 
    Modal, 
    ModalBody, 
    Button,
} from 'react-bootstrap';

const ConfirmationModal = ({callback, show, onHide, title, message}) => {
    return (
        <Modal onHide={() => onHide()} show={show} onHidesize="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <div className="bg-dark">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{color: "white"}}>
                        {title}
                    </Modal.Title>
                </Modal.Header>
            </div>
            <ModalBody>
                <p class="lead" style={{margin: "auto", width: "100%"}}>
                    {message}
                </p>
            </ModalBody>
            <Modal.Footer>
                <Button variant="primary" onClick={ () => {
                    callback();
                } }>Confirm</Button>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;