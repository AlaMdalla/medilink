package com.example.ordenance.DTO;


import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrescriptionDTO {
    private Long id;
    private Long doctorId;
    private Long patientId;
    private LocalDate date;
    private List<String> medicationList;
}

