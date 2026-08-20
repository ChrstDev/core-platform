package com.example.demo.auth.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ApiException extends RuntimeException {

	private final String code;
	private final HttpStatus status;

	public ApiException(String code, String message, HttpStatus status) {
		super(message);
		this.code = code;
		this.status = status;
	}
}