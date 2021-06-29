import { useState } from "react";
import { Button,Modal } from "react-bootstrap";

export default function LyricsModel() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	return (
	  <>
		<Button variant="primary" onClick={handleShow}>
		  Launch demo modal
		</Button>
  
		<Modal show={show} onHide={handleClose}>
		  
		</Modal>
	  </>
	);
}
