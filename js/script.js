/**
 * Validações do Formulário de Contacto
 * Prática - Portfólio Pessoal
 */

document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Previne o envio padrão
            
            // Resetar mensagens de erro anteriores
            clearErrors();
            
            // Validar todos os campos
            const isNameValid = validateName();
            const isPhoneValid = validatePhone();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            // Se todos válidos, simular envio
            if (isNameValid && isPhoneValid && isEmailValid && isMessageValid) {
                showSuccessMessage();
                form.reset();
                
                // Opcional: enviar para backend real aqui
                // fetch('/api/contact', { method: 'POST', body: new FormData(form) })
            }
        });
        
        // Validação em tempo real (ao perder o foco)
        document.getElementById('name').addEventListener('blur', validateName);
        document.getElementById('telefone').addEventListener('blur', validatePhone);
        document.getElementById('email').addEventListener('blur', validateEmail);
        document.getElementById('message').addEventListener('blur', validateMessage);
    }
    
    // ============ FUNÇÕES DE VALIDAÇÃO ============
    
    function validateName() {
        const input = document.getElementById('name');
        const error = document.getElementById('nameError');
        const value = input.value.trim();
        
        if (value === '') {
            showError(input, error, 'O nome é obrigatório.');
            return false;
        }
        
        if (value.length < 3) {
            showError(input, error, 'O nome deve ter pelo menos 3 caracteres.');
            return false;
        }
        
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
            showError(input, error, 'Use apenas letras e espaços no nome.');
            return false;
        }
        
        clearError(input, error);
        return true;
    }
    
    function validatePhone() {
        const input = document.getElementById('telefone');
        const error = document.getElementById('telefoneError');
        const value = input.value.trim();
        
        // Pattern para números portugueses/internacionais
        const phonePattern = /^[+]?[0-9\s\-\.\(\)]{9,20}$/;
        
        if (value === '') {
            showError(input, error, 'O telefone é obrigatório.');
            return false;
        }
        
        if (!phonePattern.test(value)) {
            showError(input, error, 'Formato inválido. Ex: +351 912 345 678');
            return false;
        }
        
        clearError(input, error);
        return true;
    }
    
    function validateEmail() {
        const input = document.getElementById('email');
        const error = document.getElementById('emailError');
        const value = input.value.trim();
        
        if (value === '') {
            showError(input, error, 'O email é obrigatório.');
            return false;
        }
        
        // Regex simples para validação de email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(value)) {
            showError(input, error, 'Insira um email válido.');
            return false;
        }
        
        clearError(input, error);
        return true;
    }
    
    function validateMessage() {
        const input = document.getElementById('message');
        const error = document.getElementById('messageError');
        const value = input.value.trim();
        
        if (value === '') {
            showError(input, error, 'A mensagem é obrigatória.');
            return false;
        }
        
        if (value.length < 10) {
            showError(input, error, 'A mensagem deve ter pelo menos 10 caracteres.');
            return false;
        }
        
        clearError(input, error);
        return true;
    }
    
    // ============ FUNÇÕES AUXILIARES ============
    
    function showError(input, errorElement, message) {
        input.closest('.form-group').classList.add('error');
        errorElement.textContent = message;
        input.setAttribute('aria-invalid', 'true');
    }
    
    function clearError(input, errorElement) {
        input.closest('.form-group').classList.remove('error');
        errorElement.textContent = '';
        input.setAttribute('aria-invalid', 'false');
    }
    
    function clearErrors() {
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        document.querySelectorAll('input, textarea').forEach(field => {
            field.setAttribute('aria-invalid', 'false');
        });
    }
    
    function showSuccessMessage() {
        const success = document.getElementById('successMessage');
        success.hidden = false;
        
        // Esconder após 5 segundos
        setTimeout(() => {
            success.hidden = true;
        }, 5000);
        
        // Scroll suave para a mensagem
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // ============ FORMATAÇÃO DO TELEFONE (OPCIONAL) ============
    // Formata automaticamente enquanto o utilizador digita
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Formatação simples para padrão português
            if (value.length > 9) {
                value = '+' + value.slice(0, 3) + ' ' + 
                        value.slice(3, 6) + ' ' + 
                        value.slice(6, 9) + ' ' + 
                        value.slice(9, 12);
            } else if (value.length > 6) {
                value = value.slice(0, 3) + ' ' + 
                        value.slice(3, 6) + ' ' + 
                        value.slice(6);
            } else if (value.length > 3) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            }
            
            e.target.value = value;
        });
    }
});