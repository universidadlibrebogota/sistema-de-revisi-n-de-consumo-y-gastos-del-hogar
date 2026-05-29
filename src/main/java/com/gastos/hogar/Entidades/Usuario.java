package com.gastos.hogar.Entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(unique = true)
    private String correo;

    private String password;

    @OneToMany(mappedBy = "usuario")
    private List<Gasto> gastos;

    @OneToMany(mappedBy = "usuario")
    private List<Ingreso> ingresos;

    @OneToMany(mappedBy = "usuario")
    private List<Presupuesto> presupuestos;
}
