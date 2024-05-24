describe('Central de Atendimento ao Cliente TAT', function () {

  beforeEach(() => {

    cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('#firstName').type('Diego', { delay: 1000 })
    cy.get('#lastName').type('de Oliveira Suzuki')
    cy.get('#email').type('teste@tesste.com')
    cy.get('#open-text-area').type('quero aprender cypress')
    cy.contains('Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type('Diego', { delay: 100 })
    cy.get('#lastName').type('de Oliveira Suzuki')
    cy.get('#email').type('testetesste.com')
    cy.get('#open-text-area').type('quero aprender cypress')
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('não permite letras no campo de telefone', function () {
    cy.get('#phone').type('abcd', { delay: 100 })
    cy.get('#phone').should('be.empty')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#phone').should('be.empty')
    cy.get('#phone-checkbox').click()
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function (){
    cy.get('#firstName').type('Diego', { delay: 100 }).should('have.value', 'Diego').clear().should('have.value', '')
    cy.get('#lastName').type('de Oliveira Suzuki').should('have.value', 'de Oliveira Suzuki').clear().should('have.value', '')
    cy.get('#email').type('teste@teste.com').should('have.value', 'teste@teste.com').clear().should('have.value', '')
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type('1198901599', { delay: 100 }).should('have.value', '1198901599').clear().should('have.value', '')
    cy.get('#open-text-area').type('quero aprender cypress').should('have.value', 'quero aprender cypress').clear().should('be.empty')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function (){
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function (){
    cy.fillMandatoryFieldsAndSubmit('Diego', 'de Oliveira Suzuki', 'teste@commands.com', 'teste command')
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function (){
    cy.get('#product').select('YouTube').should('have.value', 'youtube')

  })
  
  it('seleciona um produto (Mentoria) por seu valor (value)', function (){
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')

  })

  it('seleciona um produto (Blog) por seu índice', function (){
    cy.get('#product').select(1).should('have.value', 'blog')

  })

})