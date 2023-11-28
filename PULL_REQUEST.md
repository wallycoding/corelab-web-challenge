# CORELAB WEB CHALLENGE

## Executando Localmente

Para dar vida ao projeto, siga os passos abaixo:

```bash
$ npm run dev
```

## Testes

Execute os testes com os seguintes comandos:

- Testes unitários:

```bash
$ npm run test
```

- Testes de cobertura:

```bash
$ npm run test:cov
```

## Estrutura da Aplicação

A organização do projeto é a seguinte:

src

- styles
  - Arquivos CSS
- providers
  - Estados globais
- utils
  - Utilitários para a aplicação
- lib
  - Pacotes extras ou APIs:
    - `api`
      - `domain`
      - `services`
      - `index.ts`
- layout
  - Todos os layouts do aplicativo
- constants
  - Valores ou configurações imutáveis
- components
  - Na pasta 'components', segui uma estrutura específica para facilitar a identificação e organização:
    - `components`
      - `Component.tsx`
      - `components`
        - `Component`
          - `ChildFromTheComponent.tsx`

## Padrões e Paradigmas

O projeto segue os seguintes padrões e paradigmas:

- (OOP) Programação Orientada a Objetos
- (FP) Programação Funcional
- (FF) Função Fábrica
- (TDD) Desenvolvimento Orientado por Testes
- (DDD) Design Orientado a Domínio
