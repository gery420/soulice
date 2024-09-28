import React, { useEffect, useState } from "react";
import Heading from "components/TopRated/Heading";
import Navbar from "components/Utils/Navbar";
import TopPysch from "components/TopRated/TopPysch";
import TopProfes from "components/TopRated/TopProfes";
import TopPyscho from "components/TopRated/TopPyscho";
import axios from "axios";
import Swal from "sweetalert2";

const TopRated = () => {
  const [docs, setDocs] = useState({
    physio: [],
    nutri: [],
    gym: [],
  });
  const [load, setLoad] = useState(false);

  const fetchTopRatedDoctors = async () => {
    try {
      setLoad(true);
      let res = await axios.get(
        "http://localhost:3001/patient/getTopRatedDocs",
        {
          withCredentials: true,
        }
      );
      console.log("resp  : ", res.data.data);
      setLoad(false);
      setDocs(res.data.data);
    } catch (err) {
      console.log("error : ", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  };

  useEffect(() => {
    fetchTopRatedDoctors();
  }, []);

  return (
    <div className="w-full flex flex-row font-body-primary">
      {/* 1. Navbar */}
      <div className="w-[16%] min-h-screen">
        <Navbar />
      </div>

      <div className="w-[84%]">
        {/* Main Container */}
        <div className="bg-gradient-to-r from-dark-100 via-dark-200 to-dark-100 min-h-screen text-white py-6 flex flex-col space-y-6">
          <div className="top-0 w-[84%] mx-auto">
            {/* Title */}
            <Heading />
          </div>

          <div
            className="w-[25%] mx-auto border border-solid border-blueGray-100 py-3 pl-10 border-l-0 border-r-0"
            style={{ marginTop: 40, fontSize: 22 }}
          >
            Top Rated Pyschiatrists
          </div>

          {/* Top Rated Physios */}
          <div className="w-[85%] mx-auto h-full flex items-center justify-start gap-6 relative">
            {load ? (
              <p className="text-center">Loading...</p>
            ) : docs["physio"].length !== 0 ? (
              docs["physio"].map((item, i) => {
                return (
                  <div key={i}>
                    <TopPysch info={item} />
                  </div>
                );
              })
            ) : (
              <p>No pyschiatrists available right now!</p>
            )}
          </div>
          <div
            className="w-[25%] mx-auto border border-solid border-blueGray-100 py-3 pl-16 border-l-0 border-r-0"
            style={{ marginTop: 75, fontSize: 22 }}
          >
            Top Rated Professionals
          </div>

          {/* Top rated Professionals */}
          <div
            className="w-[85%] mx-auto h-full flex items-center justify-start overflow-x-auto gap-6 relative"
            style={{ marginTop: -22 }}
          >
            {load ? (
              <p className="text-center">Loading...</p>
            ) : docs["nutri"].length !== 0 ? (
              docs["nutri"].map((item, i) => {
                return (
                  <div key={i}>
                    <TopProfes info={item} />
                  </div>
                );
              })
            ) : (
              <p>No Professionals available right now!</p>
            )}
          </div>

          <div
            className="w-[25%] mx-auto border border-solid border-blueGray-100 py-3 pl-16 border-l-0 border-r-0"
            style={{ marginTop: 75, fontSize: 22 }}
          >
            Top Rated Pyschologists
          </div>

          {/* Top rated Pyschologists */}
          <div
            className="w-[85%] mx-auto h-full flex items-center justify-start overflow-x-auto gap-6 relative"
            style={{ marginTop: -22 }}
          >
            {load ? (
              <p className="text-center">Loading...</p>
            ) : docs["gym"].length !== 0 ? (
              docs["gym"].map((item, i) => {
                return (
                  <div key={i}>
                    <TopPyscho info={item} />
                  </div>
                );
              })
            ) : (
              <p>No Pyschologists available right now!</p>
            )}
          </div>

          {/* <div className="mx-auto flex">
            <Pagination />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TopRated;
