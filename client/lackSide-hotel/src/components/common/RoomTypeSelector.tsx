import { ChangeEventHandler, useEffect, useState } from "react";
import { addNewRoom, getRoomTypes } from "../utils/ApiFunctions";
import { IRoom } from "../../types";

function RoomTypeSelector({
  newRoom,
  handleRoomInputChange,
}: {
  newRoom: IRoom;
  handleRoomInputChange(e: ChangeEventHandler<HTMLInputElement>): void;
}) {
  const [roomTypes, setRoomTypes] = useState<string[]>(["one"]);
  const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypesInput(false);
    }
  };

  return (
    <div>
      {roomTypes.length > -1 && (
        <div>
          <select
            name="roomType"
            id="roomType"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypesInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
            className="form-control">
            <option value={""}> select a room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter a New Room Type"
                onChange={handleRoomInputChange}
                name="roomType"
              />
              <button
                className="btn btn-hotel"
                type="button"
                onClick={handleAddNewRoomType}>
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RoomTypeSelector;
