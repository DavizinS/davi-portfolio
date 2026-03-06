package com.davisantos.portfolio.controller;

import com.davisantos.portfolio.dto.ContactRequest;
import com.davisantos.portfolio.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://davisantosrj.vercel.app"
})
public class ContactController {
    
    //Injeção de dependencia
    private final ContactService contactService;
    
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }
    
    //POST /api/contact
    @PostMapping("/contato")
    public ResponseEntity<Map<String, String>> receive(@RequestBody ContactRequest req) {
        
        //Validação
        if(!req.isValid()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "status", "error",
                            "message", "Preencha nome, e-mail e mensagem"));
        }
        
        contactService.process(req);
        
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Mensagem recebida!"));
    }
}
