package com.davisantos.portfolio.service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import com.davisantos.portfolio.Contact;
import com.davisantos.portfolio.dto.ContactRequest;
import com.davisantos.portfolio.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class ContactService {
    
    private final ContactRepository contactRepository;
    
    @Value("${resend.api.key}")
    private String resendApiKey;
    
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
        
        try {
            Resend resend = new Resend(resendApiKey);
            
            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from("Portfólio <onboarding@resend.dev>")
                    .to("dev.davirj@gmail.com")
                    .subject("Novo contato: " + req.getAssunto())
                    .html("<h3>Nome: " + req.getName() + "</h3>" +
                        "<p>Email: " + req.getEmail() + "</p>" +
                        "<p>Assunto: " + req.getAssunto() + "</p>" +
                        "<p>" + req.getDescricao() + "</p>")
                    .build();
            CreateEmailResponse response = resend.emails().send(params);
            System.out.println("Email enviado! ID: " + response.getId());
        } catch(ResendException e) {
            System.err.println("Erro ao enviar email: " + e.getMessage());
        }

        
        // ---- LOG ---- //
        System.out.println("====== LEAD NOVO  ========");
        System.out.println("Nome:   " + req.getName());
        System.out.println("Email:   " + req.getEmail());
        System.out.println("Assunto:   " + req.getAssunto());
        System.out.println("===========================");
        
        
    }
}
