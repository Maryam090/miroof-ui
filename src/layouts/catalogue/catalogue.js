// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { faSort, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { getFilteredTableData } from "../../utils";

const Catalogue = (props) => {
  const { data } = props;
  const [filter, setFilter] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  // commenting it temporarily
  // const handleSearch = async (event) => {
  //   setSearch(event.target.value);
  //   const companiesData = await getFilteredTableData(data, event.target.value);
  //   setFilteredData(companiesData);
  // };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (data) {
      async function fetchData() {
        const companiesData = await getFilteredTableData(data, search);
        setFilteredData(companiesData);
      }
      fetchData();
    }
  }, [data]);

  const columns = [
    {
      dataField: "company",
      text: "Company",
      filter: textFilter({
        placeholder: "Filter By Company...",
      }),
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return <FontAwesomeIcon icon={faSort} className="ms-2" width={10} height={15} />;
        else return <FontAwesomeIcon icon={faSort} className="ml-2" width={10} height={15} />;
      },
    },
    {
      dataField: "product",
      text: "Product",
      filter: textFilter({
        placeholder: "Filter By Product...",
      }),
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return <FontAwesomeIcon icon={faSort} className="ms-2" width={10} height={15} />;
        else return <FontAwesomeIcon icon={faSort} className="ml-2" width={10} height={15} />;
      },
    },
    {
      dataField: "price",
      text: "Price",
      filter: textFilter({
        placeholder: "Filter By Price...",
      }),
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return <FontAwesomeIcon icon={faSort} className="ms-2" width={10} height={15} />;
        else return <FontAwesomeIcon icon={faSort} className="ml-2" width={10} height={15} />;
      },
    },
    {
      dataField: "installationPrice",
      text: "Installation Price",
      filter: textFilter({
        placeholder: "Filter By Installation Price...",
      }),
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return <FontAwesomeIcon icon={faSort} className="ms-2" width={10} height={15} />;
        else return <FontAwesomeIcon icon={faSort} className="ml-2" width={10} height={15} />;
      },
    },
    {
      dataField: "description",
      text: "Description",
      filter: textFilter({
        placeholder: "Filter By Description...",
      }),
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return <FontAwesomeIcon icon={faSort} className="ms-2" width={10} height={15} />;
        else return <FontAwesomeIcon icon={faSort} className="ml-2" width={10} height={15} />;
      },
    },
    {
      text: "Actions",
      formatter: (cell, row) => (
        <div className="d-flex">
          <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(row.id)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
      headerStyle: { textAlign: "center", width: "100px" },
      style: { textAlign: "center" },
    },
  ];

  const handleEdit = (id) => {
    handleShowModal();
  };

  const handleDelete = (id) => {
    // handle delete functionality
  };

  const paginationOptions = {
    paginationSize: 4,
    pageStartIndex: 1,
    paginationTotalRenderer: customTotal,
    showTotal: true,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
      {
        text: "25",
        value: 25,
      },
      { text: "50", value: 50 },
    ],

    sizePerPage: 10,
    sizePerPageDropDown: {
      className: "pagination-select",
      style: {
        position: "absolute",
        right: "10px",
        bottom: "-35px",
      },
    },
    dropup: true,
  };

  function customTotal(from, to, size) {
    return (
      <span className="react-bootstrap-table-pagination-total">
        Showing {from} to {to} of {size} Results
      </span>
    );
  }

  return (
    <SoftBox
      sx={{
        "& .MuiTableRow-root:not(:last-child)": {
          "& td": {
            borderBottom: ({ borders: { borderWidth, borderColor } }) =>
              `${borderWidth[1]} solid ${borderColor}`,
          },
        },
      }}
    >
      <div>
        <BootstrapTable
          bootstrap4
          bordered={false}
          keyField="id"
          data={filteredData}
          columns={columns}
          filter={filterFactory({ onFilter: handleFilter })}
          pagination={paginationFactory(paginationOptions)}
          noDataIndication="No data found"
        />
      </div>
    </SoftBox>
  );
};
Catalogue.propTypes = {
  data: PropTypes.array.isRequired,
  dataFilter: PropTypes.shape({
    company: PropTypes.string,
    product: PropTypes.string,
    price: PropTypes.number,
    installationPrice: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handleResetFilters: PropTypes.func.isRequired,
};
export default Catalogue;
