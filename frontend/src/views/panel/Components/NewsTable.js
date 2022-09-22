import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../../services/news";

const NewsTable = ({ setMessage }) => {
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();
  const fetchNews = async () => {
    try {
      const fetchedNews = await getAll();
      console.log(fetchedNews);
      setNews(fetchedNews);
      setFiltered(fetchedNews);
    } catch (error) {
      setMessage({
        message: `${error.response.data.error}`,
        className: "error",
      });
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  useEffect(() => {
    const result = news.filter((news) =>
      news.title.toLowerCase().match(search.toLowerCase())
    );
    setFiltered(result);
  }, [search]);

  createTheme(
    "solarized",
    {
      text: {
        // primary: "#268bd2",
        primary: "#f0f2f5",

        secondary: "#2aa198",
      },
      background: {
        // default: "#002b36",
        default: "#1f2937",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Image",
      cell: (row) => <img src={row.image} alt="" width={100} height={100} />,
    },
    {
      name: "Uploaded by",
      selector: (row) => row.user.username,
    },
    {
      name: "Added date",
      selector: (row) => row.addedDate,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              navigate(`/panel/news/edit/${row.id}`);
            }}
          >
            <FaEdit className="w-6 h-6 fill-blue-800 hover:fill-blue-600" />
          </button>
          <button>
            <MdDeleteOutline className="w-7 h-7 fill-red-800 hover:fill-red-600" />
          </button>
        </div>
      ),
    },
    // {
    //   name:"Img",
    //   selector:(row)=><img width={50} height={50} src={row.img} alt=""/>
    // }
  ];
  return (
    <DataTable
      title="News List"
      columns={columns}
      data={filtered}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="450px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      actions={
        <button
        onClick={()=>navigate('/panel/news/add')}
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-thin lg:font-medium rounded-lg truncate text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add
        </button>
      }
      subHeader
      subHeaderComponent={
        <input
          type="text"
          className="block p-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      subHeaderAlign="left"
      responsive
      theme="solarized"
      onRowClicked={(row) => {
        navigate(`/news/${row.id}`);
      }}
    />
  );
};

export default NewsTable;
