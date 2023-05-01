// function to filter the data for the tables
export const getFilteredTableData = async (data, search) => {
  const filter = {};
  const filteredData =
    data && data.length > 0
      ? data
          .filter((item) => {
            return Object.keys(filter).every((key) => {
              if (filter[key].length === 0) {
                return true;
              }
              return String(item[key]).includes(filter[key]);
            });
          })
          .filter((item) => {
            return Object.keys(item).some((key) => {
              return String(item[key]).toLowerCase().includes(search.toLowerCase());
            });
          })
      : [];
  return filteredData;
};
