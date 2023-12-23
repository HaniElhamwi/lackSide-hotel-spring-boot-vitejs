package com.lackSide.lackSide.service;

import com.lackSide.lackSide.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

public interface IRoomService {

    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws SQLException, IOException;

    List<String> getRoomTypes();

    List<Room> getAllRooms();

    byte[] getRoomPhotoById(Long id) throws SQLException;

}
