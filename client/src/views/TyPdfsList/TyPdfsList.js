// client/src/views/TyPdfsList/TyPdfsList.js

import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import { currentUser } from "../../util/currentUser";
import PdfCard from "../../components/PdfCard";
import { loginRequired } from "../../util/loginRequired";

import "./TyPdfsList.css";

import { API_URL } from "../../util/config";

function TyPdfsList() {

  const [searchText, setSearchText] = useState("");
  const [currentPdfItems, setAllPdfitems] = useState([]);

  async function fetchAllItem() {

    try {

      const response = await axios.get(
        `${API_URL}/TyallPdfs`
      );

      console.log(response.data.data);

      setAllPdfitems(response.data.data);

    } catch (error) {

      console.log(error);

    }
  }

  async function fetchSpecificItems() {

    try {

      const response = await axios.get(
        `${API_URL}/Typdfsbytitle?title=${searchText}`
      );

      console.log(response.data.data);

      setAllPdfitems(response.data.data);

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {

    if (searchText.length > 0) {
      fetchSpecificItems();
    } else {
      fetchAllItem();
    }

  }, [searchText]);

  useEffect(() => {
    loginRequired();
  }, []);

  return (
    <div>

      <Navbar user={currentUser?.name} />

      <div className="search-container">

        <input
          type="text"
          placeholder="Type to search your Subject Pdf"
          className="input-search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

      </div>

      <div className="container">

        <h2 className="about-heading text-center mt-4">
          Third Year PDF's
        </h2>

        <div className="row">

          {
            currentPdfItems?.map((pdfs) => {

              return (

                <div
                  className="col-md-4 mb-4"
                  key={pdfs._id}
                >

                  <PdfCard
                    year={pdfs.year}
                    title={pdfs.title}
                    description={pdfs.description}
                    imgUrl={pdfs.imgUrl}
                    faculty={pdfs.faculty}
                    pdfUrl={pdfs.pdfUrl}
                  />

                </div>

              );

            })
          }

        </div>

      </div>

    </div>
  );
}

export default TyPdfsList;
