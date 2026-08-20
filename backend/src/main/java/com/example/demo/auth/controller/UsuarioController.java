package com.example.demo.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.auth.dto.UsuarioResponse;
import com.example.demo.auth.exception.ApiException;
import com.example.demo.auth.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

	private final UsuarioRepository usuarioRepository;

	@GetMapping("/me")
	public UsuarioResponse me(@AuthenticationPrincipal UserDetails principal) {
		if (principal == null) {
			throw new ApiException("NO_AUTENTICADO", "No autenticado", HttpStatus.UNAUTHORIZED);
		}
		return usuarioRepository.findByUsuario(principal.getUsername())
			.map(UsuarioResponse::of)
			.orElseThrow(() -> new ApiException("USUARIO_NO_ENCONTRADO", "Usuario no encontrado", HttpStatus.NOT_FOUND));
	}
}