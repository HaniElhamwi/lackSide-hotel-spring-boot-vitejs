import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Col } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";

function ExistingRooms() {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilterRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [sucessMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result);
      setIsLoading(false);
    } catch (err) {
      setErrorMessage(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilterRooms(rooms);
    } else {
      const filteredRooms = rooms.filter((room) => {
        return room.roomType
          .toLowerCase()
          .includes(selectedRoomType.toLowerCase());
      });
      setFilterRooms(filteredRooms);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const calculateTotalPages = (filterRooms, roomsPerPage, rooms) => {
    const totalRooms =
      filterRooms.length > 0 ? filterRooms.length : rooms.length;
    return Math.ceil(totalRooms.length / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {!isLoading ? (
        <p>loading existing room</p>
      ) : (
        <section className="mt-5 mb-5 container">
          <div className="d-flex justify-content-center mb-3 mt-5">
            <h2>Existing Rooms </h2>
          </div>

          <Col md={6} className="mb-3 mb-md-0">
            <RoomFilter data={rooms} setFilteredData={setFilterRooms} />
          </Col>
          <table className="table table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomStatus}</td>
                  <td>{room.roomPrice}</td>
                  <td>{room.roomCapacity}</td>
                  <td>{room.roomDescription}</td>
                  <td>{room.roomImage}</td>
                  <td>
                    <button className="btn btn-hotel">Edit</button>
                    <button className="btn btn-hotel">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tbody>
              {currentRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.roomType}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td>
                    <button className="btn btn-hotel">View / Edit</button>
                    <button className="btn btn-hotel">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <RoomPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
            onPageChange={handlePaginationClick}
          />
        </section>
      )}
    </>
  );
}

export default ExistingRooms;
