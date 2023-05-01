// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useEffect, useState } from "react";
import Products from "./products";
import ProductModal from "./productModal";
import { fetchData } from "../../api";
import { GET_ALL_COMPANIES } from "../../constants";

function ProductsIndex() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [companiesData, setCompaniesData] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    handleShowModal();
  };

  // const companiesData = [
  //   {
  //     id: 1,
  //     name: "ABC Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 5000000,
  //   },
  //   {
  //     id: 1,
  //     name: "ABC Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 5000000,
  //   },
  //   {
  //     id: 1,
  //     name: "ABC Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 5000000,
  //   },
  //   {
  //     id: 1,
  //     name: "ABC Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 5000000,
  //   },
  //   {
  //     id: 1,
  //     name: "ABC Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 5000000,
  //   },
  //   {
  //     id: 1,
  //     name: "ABC Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 5000000,
  //   },
  //   {
  //     id: 1,
  //     name: "ABC Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 5000000,
  //   },
  //   {
  //     id: 1,
  //     name: "ABC Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 5000000,
  //   },
  //   {
  //     id: 1,
  //     name: "ABC Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 5000000,
  //   },
  //   {
  //     id: 1,
  //     name: "ABC Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 3,
  //   },
  //   {
  //     id: 1,
  //     name: "xyz Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 5000000,
  //   },
  //   {
  //     id: 1,
  //     name: "ABC Company",
  //     websiteUrl: "San Francisco",
  //     email: "Technology",
  //     phone: 5000000,
  //   },
  //   // Add more data objects as needed
  // ];
  const dataFilter = {
    name: "",
    description: "",
  };

  const handleFilterChange = (event) => {
    // handle changes to filter values here
  };

  const handleResetFilters = () => {
    // reset filters to initial values here
  };

  useEffect(() => {
    async function fetchCompaniesData() {
      const companiesData = await fetchData(GET_ALL_COMPANIES);
      if (companiesData && companiesData.data) {
        setCompaniesData(companiesData.data);
      }
    }
    fetchCompaniesData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Products</SoftTypography>
            <SoftBox display="flex">
              {/* <SoftBox pr={1}>
              We will use download button here
                <SoftInput
                  placeholder="Search here..."
                  icon={{ component: "search", direction: "left" }}
                  value={search}
                  onChange={handleSearch}
                />
              </SoftBox> */}
              <SoftBox ml="auto">
                <SoftButton
                  component="button"
                  variant="gradient"
                  color="dark"
                  onClick={handleOpenModal}
                >
                  Add Product
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>
          <Products
            data={companiesData}
            dataFilter={dataFilter}
            handleFilterChange={handleFilterChange}
            handleResetFilters={handleResetFilters}
          />
        </Card>
        <ProductModal showModal={showModal} handleCloseModal={handleCloseModal} />
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductsIndex;
