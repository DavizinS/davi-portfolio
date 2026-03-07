package com.davisantos.portfolio.service;

import com.davisantos.portfolio.Contact;
import com.davisantos.portfolio.dto.ContactRequest;
import com.davisantos.portfolio.repository.ContactRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class ContactService {
    
    private final ContactRepository contactRepository;
    private final JavaMailSender mailSender;
    
    public ContactService(ContactRepository contactRepository, JavaMailSender mailSender) {
        this.contactRepository = contactRepository;
        this.mailSender = mailSender;
    }
    
    
    public void process(ContactRequest req) {
        
        //entidades
        Contact contact = new Contact();
        contact.setName(req.getName());
        contact.setEmail(req.getEmail());
        contact.setAssunto(req.getAssunto());
        contact.setDescricao(req.getDescricao());
        
        contactRepository.save(contact);
        
        //email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("dev.davirj@gmail.com");
        message.setSubject("Novo contato: " + req.getAssunto());
        message.setText(
            "Nome: " + req.getName() + "\n" +
            "Email: " + req.getEmail() + "\n" +
            "Assunto: " + req.getAssunto() + "\n" + req.getDescricao()
        );
        mailSender.send(message);
        
        // ---- LOG ---- //
        System.out.println("====== LEAD NOVO  ========");
        System.out.println("Nome:   " + req.getName());
        System.out.println("Email:   " + req.getEmail());
        System.out.println("Assunto:   " + req.getAssunto());
        System.out.println("===========================");
        
        
    }
}
