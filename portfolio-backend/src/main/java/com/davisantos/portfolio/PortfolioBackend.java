package com.davisantos.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortfolioBackend {
    public static void main(String[] args) {
        SpringApplication.run(PortfolioBackend.class, args);
        System.out.println("=== Portfolio backend ===");
        System.out.println("Java rodando: OK");
        System.out.println("Acesse: http://localhost:8080");
    }
}
