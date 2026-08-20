package com.example.demo.auth.dto;

import com.example.demo.auth.entity.Usuario;

public record UsuarioResponse(
	Long usuarioId,
	String usuario,
	String correo,
	String rol,
	boolean flgEstado
) {

	public static UsuarioResponse of(Usuario u) {
		return new UsuarioResponse(
			u.getId(),
			u.getUsuario(),
			u.getCorreo(),
			u.getRol().name(),
			u.isFlgEstado()
		);
	}
}