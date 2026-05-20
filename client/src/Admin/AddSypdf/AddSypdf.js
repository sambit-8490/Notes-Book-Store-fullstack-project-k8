// client/src/Admin/AddSypdf/AddSypdf.js

import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

import "./AddSypdf.css";

import { API_URL } from "../../util/config";

function AddSypdf() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdfUrl, setPdfurl] = useState("");
  const [imgUrl, setImgurl] = useState("");
  const [year, setYear] = useState("Second-Year");
  const [faculty, setFaculty] = useState("computer-science");

  async function addPdf() {

    try {

      const response = await axios.post(
        `${API_URL}/createSyPdf`,
        {
          title,
          description,
          pdfUrl,
          imgUrl,
          year,
          faculty,
        }
      );

      if (response.data.success) {

        await swal({
          title: "Success",
          text: response.data.message,
          icon: "success",
          button: "Ok!",
        });

        window.location.reload();

      } else {

        swal({
          title: "Error",
          text: response.data.message,
          icon: "error",
          button: "Try Again",
        });

      }

    } catch (error) {

      console.log(error);

      swal({
        title: "Server Error",
        text: "Unable to add PDF",
        icon: "error",
        button: "Ok",
      });

    }
  }

  return (
    <>
      <div className="AddFypdf-form-container px-5 mt-5">

        <input
          type="text"
          className="form-control-sm"
          placeholder="Enter Subject Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control-sm"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control-sm"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={(e) => {
            setImgurl(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control-sm"
          placeholder="pdfUrl"
          value={pdfUrl}
          onChange={(e) => {
            setPdfurl(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control-sm"
          placeholder="year"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control-sm"
          placeholder="faculty"
          value={faculty}
          onChange={(e) => {
            setFaculty(e.target.value);
          }}
        />

        <div className="d-flex justify-content-center align-items-center">

          <button
            className="btn add-pdf-btn"
            type="button"
            onClick={addPdf}
          >
            Add SY Pdf
          </button>

        </div>

      </div>
    </>
  );
}

export default AddSypdf;
