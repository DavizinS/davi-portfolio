package com.davisantos.portfolio.dto;

public class ContactRequest {
    private String name;
    private String email;
    private String assunto;
    private String descricao;

    //Getters
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getAssunto() { return assunto; }
    public String getDescricao() { return descricao; }
    
    //Setters
    public void setName(String name)    { this.name = name; }
    public void setEmail(String email)     { this.email = email; }
    public void setSubject(String assunto) { this.assunto = assunto; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    //Campos obrigatórios
    public boolean isValid() {
        return name !=null && !name.isBlank()
                && email != null && !email.isBlank()
                && descricao != null && !descricao.isBlank();
    }
}
