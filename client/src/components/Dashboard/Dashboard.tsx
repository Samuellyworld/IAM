import Folder from "../Folder/Folder";
import File from "../FIle/File";
import Select from "react-select";

import "./dashboard.css";
import { ChangeEvent, useState } from "react";
import { Data, Options } from "../../utils/types";
import { customStyles } from "../../utils/helpers";

import { Link } from "react-router-dom";

const options: Options[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const Dashboard = () => {
  const [selectAll, setSelectAll] = useState(false);

  const [sortedArray, setSortedArray] = useState<Data[]>([]);
  const folders = [
    {
      folderName: "Development",
      noOfFiles: 17,
      fileSize: "1.3Gb",
      img: "/assets/folder-",
    },
    {
      folderName: "Data Cloud",
      noOfFiles: 20,
      fileSize: "6.3Gb",
      img: "/assets/folder-",
    },
    {
      folderName: "Game Development",
      noOfFiles: 172,
      fileSize: "190.3Gb",
      img: "/assets/folder-",
    },
  ];
  const categories = [
    {
      folderName: "Human Resources",
      noOfFiles: 16,
      fileSize: "16.3Gb",
      img: "/assets/folder-open-",
    },
    {
      folderName: "Finance",
      noOfFiles: 20,
      fileSize: "0.8Gb",
      img: "/assets/folder-open-",
    },
    {
      folderName: "Product",
      noOfFiles: 19,
      fileSize: "20.89Gb",
      img: "/assets/folder-open-",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(1);

  const data: Data[] = [
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",
      size: "1.3MB",
      lastModified: "2-01-2024",
      type: "pdf",
    },
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",
      size: "1.3MB",
      lastModified: "2-01-2024",
      type: "document",
    },
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",

      size: "1.3MB",
      lastModified: "2-01-2024",
      type: "pdf",
    },
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",
      size: "1.3MB",
      lastModified: "2-01-2024",
      type: "pdf",
    },
  ];

  const handleSortBasedOnType = (type: string) => {
    const filteredArray = data.filter((data: Data) => {
      return data.type === type;
    });
    setSortedArray(filteredArray);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="dashboard-folder-collection">
          <div className="dashboard-top-upper">
            <span>Folders</span>

            <div className="dashboard-top-upper-right">
              <div className="show-all-button">
                <span>Show all</span>
                <img src="/assets/arrow-down.png" alt="arrow_down" />
              </div>

              <div className="uplaod-button">
                <Link to="/file-upload" className="dashboard-link">
                  Upload
                </Link>
                <img src="/assets/cloud-upload.png" alt="cloud_icon" />
              </div>
              <div className="uplaod-button">
                <Link to="/folder/add" className="dashboard-link">
                  Add new folder
                </Link>
                <img src="/assets/cloud-upload.png" alt="cloud_icon" />
              </div>
            </div>
          </div>

          <div className="dashboard-folders">
            {folders.map((folder, i) => {
              return <Folder {...folder} key={i} />;
            })}
          </div>
        </div>

        <div className="dashboard-folder-collection">
          <div className="dashboard-top-upper">
            <span>Categories</span>

            <div className="dashboard-top-upper-right">
              <div className="show-all-button">
                <span>Show all</span>
                <img src="/assets/arrow-down.png" alt="arrow_down" />
              </div>
            </div>
          </div>
          <div className="dashboard-folders">
            {categories.map((folder, i) => {
              return <Folder {...folder} key={i} />;
            })}
          </div>
        </div>
      </div>
      <div className="dashboard-bottom">
        <span className="all-files-text">All Files</span>

        <div className="dashboard-nav">
          <div className="dashboard-nav-left">
            <span
              className={selectedCategory === 1 ? "dashboard-nav-selected" : ""}
              onClick={() => {
                setSelectedCategory(1);
                setSortedArray([]);
              }}
            >
              View All
            </span>
            <span
              className={selectedCategory === 2 ? "dashboard-nav-selected" : ""}
              onClick={() => {
                setSelectedCategory(2);
                handleSortBasedOnType("document");
              }}
            >
              Documents
            </span>
            <span
              className={selectedCategory === 3 ? "dashboard-nav-selected" : ""}
              onClick={() => {
                setSelectedCategory(3);
                handleSortBasedOnType("pdf");
              }}
            >
              PDFs
            </span>
            <span
              className={selectedCategory === 4 ? "dashboard-nav-selected" : ""}
              onClick={() => {
                setSelectedCategory(4);
                handleSortBasedOnType("image");
              }}
            >
              Images
            </span>
          </div>
          <div className="dashboard-nav-right">
            <div className="dashboard-input-cont">
              <img src="/assets/search.png" alt="Search" />
              <input type="text" placeholder="Search" />
            </div>

            <Select
              styles={customStyles}
              options={options}
              placeholder="Select"
            />
          </div>
        </div>

        <div className="dashboard-table-header">
          <input
            type="checkbox"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectAll(e.target.checked)
            }
          />
          <span>File name</span>
          <span>Uploaded By</span>
          <span>Size</span>
          <span>Last Modified</span>
        </div>

        <div className="dashboard-table-content">
          {selectedCategory === 1 ? (
            data.map((file: Data, index) => (
              <File selectAll={selectAll} {...file} key={index} />
            ))
          ) : selectedCategory === 2 && sortedArray.length > 0 ? (
            sortedArray.map((file: Data, index) => (
              <File selectAll={selectAll} {...file} key={index} />
            ))
          ) : selectedCategory === 3 && sortedArray.length > 0 ? (
            sortedArray.map((file: Data, index) => (
              <File selectAll={selectAll} {...file} key={index} />
            ))
          ) : selectedCategory === 4 && sortedArray.length > 0 ? (
            sortedArray.map((file: Data, index) => (
              <File selectAll={selectAll} {...file} key={index} />
            ))
          ) : selectedCategory === 2 ? (
            <span className="decline-span">There are no documents</span>
          ) : selectedCategory === 3 ? (
            <span className="decline-span">There are no PDFs</span>
          ) : selectedCategory === 4 ? (
            <span className="decline-span">There are no images</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;