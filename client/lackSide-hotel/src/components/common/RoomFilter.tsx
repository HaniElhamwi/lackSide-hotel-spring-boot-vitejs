import { useState } from "react";

function RoomFilter({ data, setFilteredData }) {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);
    const filteredRooms = data.filter(() => {
      return data.roomType
        .toLowerCase()
        .includes(selectedRoomType.toLowerCase());
      setFilteredData(filteredRooms);
    });
  };

  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Filter rooms by tag
      </span>

      <select name="" id="" className="form-select" value={filter}>
        <option value="">select a room type to filter...</option>

        {roomTypes.map((type, index) => {
          return (
            <option value={String(type)} key={index}>
              {type as string}
            </option>
          );
        })}
      </select>

      <button className="btn btn-hotel" onClick={clearFilter} type="button">
        Clear Filter
      </button>
    </div>
  );
}

export default RoomFilter;
