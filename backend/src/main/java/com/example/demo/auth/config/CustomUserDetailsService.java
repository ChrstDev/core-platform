package com.example.demo.auth.config;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.auth.entity.Usuario;
import com.example.demo.auth.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UsuarioRepository usuarioRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.findByUsuario(username)
			.or(() -> usuarioRepository.findByCorreo(username))
			.orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

		return User.builder()
			.username(usuario.getUsuario())
			.password(usuario.getContrasena())
			.disabled(!usuario.isFlgEstado())
			.roles(usuario.getRol().name())
			.build();
	}
}