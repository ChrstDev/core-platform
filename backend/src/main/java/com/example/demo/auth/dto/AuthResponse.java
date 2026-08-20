package com.example.demo.auth.dto;

public record AuthResponse(
	String accessToken,
	String refreshToken,
	String tokenType,
	long expiresIn,
	UsuarioResponse usuario
) {

	public static AuthResponse of(String access, String refresh, long expiresIn, com.example.demo.auth.entity.Usuario usuario) {
		return new AuthResponse(access, refresh, "Bearer", expiresIn, UsuarioResponse.of(usuario));
	}
}