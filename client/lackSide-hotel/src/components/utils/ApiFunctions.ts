import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// this function add new room to the database
export const addNewRoom = async (
  photo: File | null,
  roomType: string,
  roomPrice: number | string
): Promise<boolean> => {
  const formData = new FormData();
  formData.append("photo", photo || "");
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice.toString());

  try {
    const response = await api.post("/rooms/add/new-room", formData);

    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// this fun get all rom types from database
export const getRoomTypes = async (): Promise<string[]> => {
  try {
    const response = await api.get("/rooms/room/types");
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error("Error fetching room types");
  }
};

// ADD NEW ROOM TYPE

export const getAllRooms = async () => {
  try {
    const response = await api.get("/rooms/all-rooms");
    return response.data;
  } catch (err) {
    throw new Error("Error fetching rooms");
  }
};
