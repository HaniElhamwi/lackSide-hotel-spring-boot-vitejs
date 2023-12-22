package com.lackSide.lackSide.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookedRoom {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

@Column(name = "check_in_date")
    private LocalDate checkInDate;
    @Column(name = "check_out_date")
    private LocalDate checkOutDate;

    @Column(name = "guest_fullName")
    private String guestFullName;
    @Column(name = "guest_email")
    private String guestEmail;
    @Column(name = "guest_phoneNumber")
    private  int numOfChildren;

    @Column(name = "number_of_adults")
    private  int NumberOfAdults;

    @Column(name = "total_number_of_guest")
    private int totalNumOfGuest;

    @Column(name = "booking_confirmation_code")
    private String bookingConfirmationCode;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;


 public void calculateTotalNumberOfGuests(){
     this.totalNumOfGuest = this.numOfChildren + this.NumberOfAdults;
 }

    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        calculateTotalNumberOfGuests();
    }

    public void setNumberOfAdults(int numberOfAdults) {
        NumberOfAdults = numberOfAdults;
        calculateTotalNumberOfGuests();
    }

    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
