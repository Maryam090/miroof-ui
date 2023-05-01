import React, { useState } from "react";
import Select from "react-select";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import SoftButton from "components/SoftButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { postData } from "../../api";
import { SAVE_COMPANY } from "../../constants";

function CatalogueModal(props) {
  const { showModal, handleCloseModal } = props;
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    product: "",
    price: "",
    installationPrice: "",
    description: "",
  });

  const companyOptions = [
    { label: "Option 1", value: "option-1" },
    { label: "Option 2", value: "option-2" },
    { label: "Option 3", value: "option-3" },
    { label: "Option 4", value: "option-4" },
  ];
  const productOptions = [
    { label: "Option 1", value: "option-1" },
    { label: "Option 2", value: "option-2" },
    { label: "Option 3", value: "option-3" },
    { label: "Option 4", value: "option-4" },
  ];

  const handleCompanyChange = (option) => {
    setSelectedCompany(option);
  };
  const handleProductChange = (option) => {
    setSelectedProduct(option);
  };

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
        <Modal.Title> Add Catalogues </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="formCompany">
            <Form.Label>Company</Form.Label>
            <Select
              options={companyOptions}
              value={selectedCompany}
              onChange={handleCompanyChange}
              placeholder="Select company..."
              isSearchable
              isClearable
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: 38,
                  borderRadius: 6,
                  borderColor: "#ced4da",
                }),
              }}
            />
            <Form.Control.Feedback type="invalid">Company is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProduct">
            <Form.Label>Product</Form.Label>
            <Select
              options={productOptions}
              value={selectedProduct}
              onChange={handleProductChange}
              placeholder="Select product..."
              isSearchable
              isClearable
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: 38,
                  borderRadius: 6,
                  borderColor: "#ced4da",
                }),
              }}
            />
            <Form.Control.Feedback type="invalid">Product is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              name="price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">Price is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formInstallationPrice">
            <Form.Label>Installation Price</Form.Label>
            <Form.Control
              required
              name="installationPrice"
              type="number"
              placeholder="Enter installation price"
              value={formData.installationPrice}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Installation Price is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescriptionAddress">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              name="description"
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
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

CatalogueModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};
export default CatalogueModal;
