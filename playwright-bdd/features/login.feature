Feature: Login

    Scenario: Usuario valido
        Given que acesso a pagina de login
        When preencho com usuario "standard_user" e senha "secret_sauce" validos
        Then deve ser redirecionado para a pagina de inicial
    
    Scenario: Realizar logout
        Given que acesso a pagina de login
        When clico para realizar o logout
        Then deve ser redirecionado para a pagina de login
    

    Scenario: Usuario invalido
        Given que acesso a pagina de login
        When preencho com usuario "invalido_usuario" e senha "senha_invalida" invalidos
        Then deve retornar um erro no login com um usuario invalido
    
  