package com.example.demo.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
	@NotBlank @Size(min = 3, max = 50) String usuario,
	@NotBlank @Size(min = 6, max = 100) String contrasena,
	@NotBlank @Email String correo,
	@NotBlank @Size(max = 80) String nombres,
	@NotBlank @Size(max = 80) String apellidos,
	@NotBlank @Size(max = 20) String numDocumento,
	@Size(max = 20) String telefono
) {}