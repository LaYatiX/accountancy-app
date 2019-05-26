// import { Alert, Button, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
// import { AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import * as React from 'react';

export interface InvoiceSendModalProps {
  showModal: boolean;
  handleSendMail: Function;
  handleClose: () => void;
}

class InvoiceSendModal extends React.Component<InvoiceSendModalProps> {
  // handleSubmit = (event, errors, { email }) => {
  //   const { handleSendMail } = this.props;
  //   handleSendMail(email);
  // };
  //
  // render() {
  //   const { handleClose } = this.props;
  //
  //   return (
  //     <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" autoFocus>
  //       <AvForm onSubmit={this.handleSubmit}>
  //         <ModalHeader id="login-title" toggle={handleClose}>
  //           Wyśłij fakturę
  //         </ModalHeader>
  //         <ModalBody>
  //           <Row>
  //             <Col md="12">
  //               <AvField
  //                 name="email"
  //                 label="Email"
  //                 placeholder="Email"
  //                 required
  //                 errorMessage="Pole email nie może być puste"
  //                 autoFocus
  //               />
  //             </Col>
  //           </Row>
  //         </ModalBody>
  //         <ModalFooter>
  //           <Button color="secondary" onClick={handleClose} tabIndex={1}>
  //             Zakończ
  //           </Button>{' '}
  //           <Button color="primary" type="submit">
  //             Zaloguj
  //           </Button>
  //         </ModalFooter>
  //       </AvForm>
  //     </Modal>
  //   );
  // }
}

export default InvoiceSendModal;
