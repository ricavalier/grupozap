# grupozap
Teste Grupo Zap

## Para instalar as dependências
Acesse a Pasta raíz e execute o comando
```bash
npm install
```

### Para iniciar em modo desenvolvedor
Acesse a Pasta raíz e execute o comando
```bash
quasar dev
```

### Executar arquivos Lint
```bash
npm run lint
```

### Gerar a versão de Produção
```bash
quasar build
```
O build ficará na pasta dist/spa/

### Configurações de Personalização do Quasar
Veja [Configurações quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).]

### Projeto consiste em um site de abertura que indica para dois portais internos:
As regras de negócio atuais são as seguintes:
- Ele apenas é elegível pro portal ZAP:
    - Quando for aluguel e no mínimo o valor for de R$ 3.500,00.
    - Quando for venda e no mínimo o valor for de R$ 600.000,00.

- Ele apenas é elegível pro portal Viva Real:
  - Quando for aluguel e no máximo o valor for de R$ 4.000,00.
  - Quando for venda e no máximo o valor for de R$ 700.000,00.

### Opção A: Fazer uma interface de interação (frontend/apps)
Reformule a camada de apresentação e visual do site legado da maneira que preferir, com alguns comportamentos obrigatórios:

- Quando se clicar em cima de um imóvel, deve apresentar uma tela de detalhe com as informações dele.
- Permitir a possibilidade do usuário navegar entre as fotos do imóvel na listagem e/ou detalhe.
- Paginação por 20 elementos.
- Interface responsiva (front) / adaptável para telas diferentes (apps).
- A lógica (e regras de negócio) nesse caso ficará toda no front/app, então você vai trabalhar com todos dados em memória.

Use sua criatividade e aproveite das informações do imóvel para mostrar o card e o detalhe como você entende que seria a melhor forma e também a mais performática.

Você deverá usar como input o source-1.json (~400 registros):

- http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json (CORS friendly)
