package com.example.demo.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.auth.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	Optional<Usuario> findByUsuario(String usuario);

	Optional<Usuario> findByCorreo(String correo);

	boolean existsByUsuario(String usuario);

	boolean existsByCorreo(String correo);
}