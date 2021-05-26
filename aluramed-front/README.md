# Alura Med - Frontend

Frontend da aplicação para cadastro de pacientes.

### Instalação

Instalação das dependências.

```bash
npm install
```

### Executando

```bash
npm start
```

### Build para produção

```bash
npm run build
```

### Criar a stack
```
aws cloudformation create-stack --stack-name alura-med-front --template-body file://stack.yml
```

### Deploy no backet s3
```
aws sync build s3://bucket-name
```

### Removendo a stack
```
aws cloudformation delete-stack --stack-name alura-med-front
```
