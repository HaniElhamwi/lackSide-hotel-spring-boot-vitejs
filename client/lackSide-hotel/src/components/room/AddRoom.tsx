import { useState } from "react";
import { addNewRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { IRoom } from "../../types";

function AddRoom() {
  const [newRoom, setNewRoom] = useState<IRoom>({
    roomPrice: "",
    roomType: "",
    photo: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [sucessMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    console.log(e.target.value);

    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        setNewRoom({
          ...newRoom,
          [name]: value,
        });
      } else {
        setNewRoom({
          ...newRoom,
          [name]: value,
        });
        value = "";
      }
    }
    setNewRoom({
      ...newRoom,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    console.log(e.target.value);

    const selectedImage = e.target.files[0];
    setNewRoom({
      ...newRoom,
      photo: selectedImage,
    });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newRoom);

    try {
      const success = await addNewRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );

      if (success !== undefined) {
        setSuccessMessage("Room added successfully");
        setErrorMessage("");
        setNewRoom({
          roomPrice: "",
          roomType: "",
          photo: null,
        });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding room");
      }
    } catch (error) {
      setErrorMessage(error.message as string);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Add New Room</h2>

            {sucessMessage && (
              <div className="alert alert-success fade show">
                {sucessMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ marginBottom: 10 }}
                  htmlFor="roomType">
                  Room Type
                </label>
                <div>
                  <RoomTypeSelector
                    newRoom={newRoom}
                    handleRoomInputChange={handleRoomInputChange}
                  />
                </div>
              </div>

              <div className="mb-3 flex flex-col flex-center">
                <label className="form-label mb-2" htmlFor="roomPrice">
                  Room Price
                </label>
                <input
                  className="form-control"
                  required
                  id="roomPrice"
                  name="roomPrice"
                  onChange={handleRoomInputChange}
                  value={newRoom.roomPrice}
                  type="number"
                />
              </div>

              <div className="mb-3 flex flex-col flex-center">
                <label className="form-label mb-2" htmlFor="photo">
                  Room Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="room"
                    className="mb-3"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                  />
                )}
              </div>

              <div className="d-grid d-flex mt-2">
                <button className="btn btn-outline-primary ml-5">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddRoom;
