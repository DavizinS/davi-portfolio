package com.davisantos.portfolio.service;

import com.davisantos.portfolio.dto.ContactRequest;
import org.springframework.stereotype.Service;


@Service
public class ContactService {
    public void process(ContactRequest req) {
        System.out.println("===============");
        System.out.println("Nome:   " + req.getName());
        System.out.println("Email:   " + req.getEmail());
        System.out.println("Assunto:   " + req.getAssunto());
        System.out.println("Texto:   " + req.getDescricao());
        System.out.println("================");
        
        
    }
}
