package com.lackSide.lackSide.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.env.RandomValuePropertySourceEnvironmentPostProcessor;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;


@Entity
@Setter
@Getter
@AllArgsConstructor
public class Room {


    @Id
    @GeneratedValue
    private Long id;
    @Column(name = "room_type")
    private String roomType;
    @Column(name = "room_price")
    private BigDecimal roomPrice;
    private boolean isBooked=false;


    @Lob
    private Blob photo;

    @OneToMany(mappedBy = "room",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedRoom> bookings;


    public Room() {
        this.bookings = new ArrayList<>();
    }


    public void addBooking(BookedRoom booking){

        if(bookings == null){
            bookings = new ArrayList<>();
        }
        this.bookings.add(booking);
        booking.setRoom(this);
        isBooked = true;
        String bookingCode = UUID.randomUUID().toString();
        booking.setBookingConfirmationCode(bookingCode);
    }
}