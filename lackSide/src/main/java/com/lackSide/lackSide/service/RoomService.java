package com.lackSide.lackSide.service;

import com.lackSide.lackSide.Repository.IRoomRepository;
import com.lackSide.lackSide.Repository.RoomRepository;
import com.lackSide.lackSide.exception.ResourcesNotFoundException;
import com.lackSide.lackSide.model.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService {

    private final IRoomRepository roomRepository;



    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws SQLException, IOException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if (!file.isEmpty()) {
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        return roomRepository.save(room);
    }

    @Override
    public List<String> getRoomTypes() {
        return roomRepository.findDistinctRoomType();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoById(Long id) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(id);
        if (theRoom.isEmpty()) {
            throw new ResourcesNotFoundException("Room not found");
        }
            Blob photoBlob = theRoom.get().getPhoto();
            if (photoBlob != null) {
                return photoBlob.getBytes(1, (int) photoBlob.length());
            }
        return null ;
    }
}
