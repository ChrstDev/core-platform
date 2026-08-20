package com.example.demo.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.auth.entity.Persona;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
}