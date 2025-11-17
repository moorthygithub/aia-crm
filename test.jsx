const [selectedIds, setSelectedIds] = useState([]);

const columns = [
  {
    name: "select",
    label: "",
    options: {
      filter: false,
      sort: false,
      customBodyRenderLite: (dataIndex) => {
        const rowId = inspectionTListData?.[dataIndex]?.id;
        const isChecked = selectedIds.includes(rowId);

        return (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer"
            checked={isChecked}
            onChange={() => {
              if (isChecked) {
                setSelectedIds(selectedIds.filter((id) => id !== rowId));
              } else {
                setSelectedIds([...selectedIds, rowId]);
              }
            }}
          />
        );
      },
    },
  },

  // ✨ Your Remaining Columns
  {
    name: "task_from_date",
    label: "Assign Date",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => moment(value).format("DD-MM-YYYY"),
    },
  },
  ...
];

const handleSubmitSelected = async () => {
  if (selectedIds.length === 0) {
    alert("Please select at least one task!");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await axios.post(
      `${BASE_URL}/api/submit-selected-inspection`,
      { selected: selectedIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Selected items submitted successfully!");
  } catch (error) {
    console.error("Error submitting selected items", error);
  }
};

const options = {
  selectableRows: "none",
  elevation: 0,
  responsive: "standard",
  viewColumns: true,
  download: true,
  filter: false,
  print: true,

  customToolbar: () => {
    return (
      <button
        onClick={handleSubmitSelected}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
      >
        Submit Selected
      </button>
    );
  },
};
