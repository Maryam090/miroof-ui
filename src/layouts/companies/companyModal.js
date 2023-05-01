import React from "react";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import SoftButton from "components/SoftButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { postData } from "../../api";
import { SAVE_COMPANY } from "../../constants";

function CompanyModal(props) {
  const { showModal, handleCloseModal } = props;
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    websiteURL: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      setIsLoading(true);
      const { message, isError, isSuccess } = await postData(SAVE_COMPANY, formData);
      setMessage(message);
      setError(isError);
      setIsLoading(false);
      if (isSuccess) {
        props.handleCloseModal();
      }
    }

    setValidated(true);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton onClick={handleCloseModal}>
        <Modal.Title> Add Company </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="formCompanyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">Company name is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCompanyAddress">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">Email is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCompanyPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              type="text"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCompanyAddress">
            <Form.Label>Website Url</Form.Label>
            <Form.Control
              name="websiteURL"
              type="text"
              placeholder="Enter website url"
              value={formData.websiteURL}
              onChange={handleChange}
            />
          </Form.Group>
          {hasError && !isLoading && (
            <Stack sx={{ width: "100%" }} spacing={2} pb={3}>
              <Alert severity="error" variant="outlined" size="md">
                {message}
              </Alert>
            </Stack>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end w-100">
          <Button onClick={handleCloseModal} className="me-2" variant="light">
            Close
          </Button>
          <SoftButton
            component="button"
            disabled={isLoading}
            variant="gradient"
            color="dark"
            type="submit"
          >
            {isLoading ? "Saving..." : "Save"}
          </SoftButton>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

CompanyModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};
export default CompanyModal;
