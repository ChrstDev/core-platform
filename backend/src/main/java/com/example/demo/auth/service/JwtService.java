package com.example.demo.auth.service;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.auth.entity.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	private final SecretKey key;
	private final long accessExpiration;
	private final long refreshExpiration;

	public JwtService(
			@Value("${app.jwt.secret}") String secretBase64,
			@Value("${app.jwt.access-token-expiration}") long accessExpiration,
			@Value("${app.jwt.refresh-token-expiration}") long refreshExpiration
	) {
		this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretBase64));
		this.accessExpiration = accessExpiration;
		this.refreshExpiration = refreshExpiration;
	}

	public String generarAccessToken(Usuario usuario) {
		return generar(usuario.getUsuario(), accessExpiration, "access");
	}

	public String generarRefreshToken(Usuario usuario) {
		return generar(usuario.getUsuario(), refreshExpiration, "refresh");
	}

	public long getAccessExpiration() {
		return accessExpiration;
	}

	public long getRefreshExpiration() {
		return refreshExpiration;
	}

	public Claims parsear(String token) {
		return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
	}

	private String generar(String subject, long expirationMs, String tipo) {
		Instant ahora = Instant.now();
		return Jwts.builder()
				.subject(subject)
				.id(UUID.randomUUID().toString())
				.claim("tipo", tipo)
				.issuedAt(Date.from(ahora))
				.expiration(Date.from(ahora.plusMillis(expirationMs)))
				.signWith(key, Jwts.SIG.HS256)
				.compact();
	}
}