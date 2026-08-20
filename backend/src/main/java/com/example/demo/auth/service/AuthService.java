package com.example.demo.auth.service;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.auth.dto.AuthResponse;
import com.example.demo.auth.dto.LoginRequest;
import com.example.demo.auth.dto.LogoutRequest;
import com.example.demo.auth.dto.RefreshRequest;
import com.example.demo.auth.dto.RegisterRequest;
import com.example.demo.auth.entity.Persona;
import com.example.demo.auth.entity.Rol;
import com.example.demo.auth.entity.TokenRefresco;
import com.example.demo.auth.entity.Usuario;
import com.example.demo.auth.exception.ApiException;
import com.example.demo.auth.repository.PersonaRepository;
import com.example.demo.auth.repository.TokenRefrescoRepository;
import com.example.demo.auth.repository.UsuarioRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UsuarioRepository usuarioRepository;
	private final PersonaRepository personaRepository;
	private final TokenRefrescoRepository tokenRefrescoRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	@Transactional
	public AuthResponse register(RegisterRequest req) {
		if (usuarioRepository.existsByUsuario(req.usuario())) {
			throw new ApiException("USUARIO_DUPLICADO", "El usuario ya esta registrado", HttpStatus.CONFLICT);
		}
		if (usuarioRepository.existsByCorreo(req.correo())) {
			throw new ApiException("CORREO_DUPLICADO", "El correo ya esta registrado", HttpStatus.CONFLICT);
		}

		Persona persona = new Persona();
		persona.setNombres(req.nombres());
		persona.setApellidos(req.apellidos());
		persona.setNumDocumento(req.numDocumento());
		persona.setTelefono(req.telefono());
		Persona personaGuardada = personaRepository.save(persona);

		Usuario usuario = new Usuario();
		usuario.setUsuario(req.usuario());
		usuario.setContrasena(passwordEncoder.encode(req.contrasena()));
		usuario.setCorreo(req.correo());
		usuario.setPersona(personaGuardada);
		usuario.setRol(Rol.USUARIO);
		usuario.setFlgEstado(true);
		Usuario guardado = usuarioRepository.save(usuario);

		return emitirTokens(guardado);
	}

	@Transactional
	public AuthResponse login(LoginRequest req) {
		Usuario usuario = usuarioRepository.findByUsuario(req.usuario())
			.or(() -> usuarioRepository.findByCorreo(req.usuario()))
			.orElseThrow(() -> new BadCredentialsException("Credenciales invalidas"));

		if (!usuario.isFlgEstado()) {
			throw new ApiException("USUARIO_INACTIVO", "El usuario esta inactivo", HttpStatus.FORBIDDEN);
		}

		if (!passwordEncoder.matches(req.contrasena(), usuario.getContrasena())) {
			throw new BadCredentialsException("Credenciales invalidas");
		}

		return emitirTokens(usuario);
	}

	@Transactional
	public AuthResponse refresh(RefreshRequest req) {
		Claims claims;
		try {
			claims = jwtService.parsear(req.refreshToken());
		} catch (JwtException | IllegalArgumentException ex) {
			throw new ApiException("TOKEN_INVALIDO", "Refresh token invalido o expirado", HttpStatus.UNAUTHORIZED);
		}

		String tipo = claims.get("tipo", String.class);
		if (!"refresh".equals(tipo)) {
			throw new ApiException("TOKEN_INVALIDO", "El token no es de tipo refresh", HttpStatus.UNAUTHORIZED);
		}

		TokenRefresco tokenGuardado = tokenRefrescoRepository.findByToken(req.refreshToken())
			.orElseThrow(() -> new ApiException("TOKEN_INVALIDO", "Refresh token no registrado", HttpStatus.UNAUTHORIZED));

		if (tokenGuardado.isRevoked() || tokenGuardado.getFechaExpiracion().isBefore(Instant.now())) {
			throw new ApiException("TOKEN_INVALIDO", "Refresh token revocado o expirado", HttpStatus.UNAUTHORIZED);
		}

		Usuario usuario = tokenGuardado.getUsuario();
		tokenGuardado.setRevoked(true);
		tokenRefrescoRepository.save(tokenGuardado);

		return emitirTokens(usuario);
	}

	@Transactional
	public void logout(LogoutRequest req) {
		tokenRefrescoRepository.findByToken(req.refreshToken()).ifPresent(token -> {
			token.setRevoked(true);
			tokenRefrescoRepository.save(token);
		});
	}

	private AuthResponse emitirTokens(Usuario usuario) {
		String access = jwtService.generarAccessToken(usuario);
		String refresh = jwtService.generarRefreshToken(usuario);

		TokenRefresco tokenRefresco = new TokenRefresco();
		tokenRefresco.setToken(refresh);
		tokenRefresco.setUsuario(usuario);
		tokenRefresco.setFechaExpiracion(Instant.now().plusMillis(jwtService.getRefreshExpiration()));
		tokenRefresco.setRevoked(false);
		tokenRefrescoRepository.save(tokenRefresco);

		return AuthResponse.of(access, refresh, jwtService.getAccessExpiration(), usuario);
	}
}