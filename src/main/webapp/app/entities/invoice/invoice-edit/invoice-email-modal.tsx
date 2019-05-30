import React from 'react';
import { Button, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';

export interface InvoiceSendModalProps {
  showModal: boolean;
  handleSendMail: Function;
  handleClose: () => void;
}

export function InvoiceEmailModal(props: InvoiceSendModalProps) {
  const { handleClose } = props;

  return (
    <Modal isOpen={props.showModal} toggle={handleClose} backdrop="static" autoFocus={false}>
      <AvForm onSubmit={props.handleSendMail}>
        <ModalHeader id="login-title" toggle={handleClose}>
          Wyślij fakturę
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <AvField name="email" label="Email" placeholder="Email odbiorcy" required errorMessage="Pole email nie może być puste" />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose} tabIndex={1}>
            Zakończ
          </Button>{' '}
          <Button color="primary" type="submit">
            Wyśłij
          </Button>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
}

export default InvoiceEmailModal;
