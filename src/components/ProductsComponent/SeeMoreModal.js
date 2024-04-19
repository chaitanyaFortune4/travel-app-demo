import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Title } from "../Items/Title";

const SeeMoreModal = (props) => {
  const { title, body } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Title title={title} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{marginInline:'1rem'}}>{body}</Modal.Body>
    {/* <Modal.Footer>
    <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer> */}
    </Modal>
  );
};

export default SeeMoreModal;
