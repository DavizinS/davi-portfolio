package com.davisantos.portfolio.service;

import com.davisantos.portfolio.Contact;
import com.davisantos.portfolio.dto.ContactRequest;
import com.davisantos.portfolio.repository.ContactRepository;
import org.springframework.stereotype.Service;


@Service
public class ContactService {
    
    private final ContactRepository contactRepository;
    
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }
    
    
    public void process(ContactRequest req) {
        
        //entidades
        Contact contact = new Contact();
        contact.setName(req.getName());
        contact.setEmail(req.getEmail());
        contact.setAssunto(req.getAssunto());
        contact.setDescricao(req.getDescricao());
        
        contactRepository.save(contact);
        
        // ---- LOG ---- //
        System.out.println("====== LEAD NOVO  ========");
        System.out.println("Nome:   " + req.getName());
        System.out.println("Email:   " + req.getEmail());
        System.out.println("Assunto:   " + req.getAssunto());
        System.out.println("===========================");
        
        
    }
}
