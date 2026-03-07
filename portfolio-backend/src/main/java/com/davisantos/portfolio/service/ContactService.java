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
        String nome = req.getName();
        String email = req.getEmail();
        String assunto = req.getAssunto();
        String mensagem = req.getDescricao();    
        String templateDoEmail = """
            <div style="font-family: Arial, sans-serif; max-width: 600px; background: #0f0f0f; color: #fff; border-radius: 8px;">
                <div style="background: #1a1a1a; padding: 24px 32px; border-bottom: 2px solid #d4a017;">
                    <h1 style="color: #d4a017;">davi.dev</h1>
                    <p style="color: #888; font-size: 13px;">Novo contato via portfolio</p>
                </div>
                <div style="padding: 32px;">
                    <p><span style="color: #888;">Nome:</span> %s</p>
                    <p><span style="color: #888;">E-mail:</span> <span style="color: #d4a017;">%s</span></p>
                    <p><span style="color: #888;">Assunto:</span> %s</p>
                    <p><span style="color: #888;">Mensagem:</span> %s</p>
                </div>
                <div style="padding: 16px 32px; background: #1a1a1a; text-align: center;">
                    <p style="color: #555; font-size: 12px;">davisantosrj.vercel.app</p>
                </div>
            </div>
            """.formatted(nome, email, assunto, mensagem);      
  
        try {
            Resend resend = new Resend(resendApiKey);
            
            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from("Portfólio <onboarding@resend.dev>")
                    .to("dev.davirj@gmail.com")
                    .subject("Novo contato: " + req.getAssunto())
                    .html(templateDoEmail)
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
