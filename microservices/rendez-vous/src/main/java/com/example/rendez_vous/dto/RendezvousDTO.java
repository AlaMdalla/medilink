package com.example.rendez_vous.dto;

import com.example.rendez_vous.Enum.Status; // Correct import
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RendezvousDTO {
    private Long id;
    private Long patientId;
    private LocalDate date;
    private Status status; // Now refers to com.example.rendez_vous.Enum.Status
}