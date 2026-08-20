package com.example.demo.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.auth.entity.TokenRefresco;

public interface TokenRefrescoRepository extends JpaRepository<TokenRefresco, Long> {

	Optional<TokenRefresco> findByToken(String token);

	void deleteByUsuarioId(Long usuarioId);
}