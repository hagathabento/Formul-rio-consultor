# Formulário Consultor – Diagnóstico e Terapia Alvo

Formulário de página única para consultores (Diagnóstico e Testagem Molecular, Terapia Alvo – Estudo AGILE, Percepção Geral do Debate).

## Stack

- Next.js 16
- Tailwind CSS
- Supabase (mesmo banco do formulario-hagatha)
- Framer Motion

## Configuração

1. **Variáveis de ambiente**

   Crie ou edite `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://lvnqqbeldyihjjuixmsb.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
   ```

2. **Tabela no Supabase**

   Execute o conteúdo de `supabase-schema.sql` no SQL Editor do Supabase para criar a tabela `consultor_submissions`.

3. **Logos e imagens**

   As imagens do projeto original estão em `public/`:
   - `image.png` – logo TIBSOVO
   - `lgooservier.png` – logo Servier
   - `cover.png` – imagem de capa

## Deploy (Vercel)

No painel da Vercel, vá em **Settings → Environment Variables** e adicione:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Sem essas variáveis, o build funciona mas o formulário não salva em produção.

## Uso

- **Formulário:** [http://localhost:3000](http://localhost:3000)
- **Admin:** [http://localhost:3000/admin](http://localhost:3000/admin)  
  (Configure a senha no código ou em variável de ambiente)

## Perguntas do formulário

1. Percepção sobre o que mais dificulta a solicitação imediata do teste molecular para LMA  
2. Avaliação da segurança clínica durante o período de espera pelo resultado molecular  
3. Fatores que influenciam a decisão terapêutica em pacientes com IDH1 mutado  
4. Principais aprendizados ou percepções após o debate  
5. Pontos que geraram maior engajamento ou debate  
6. Temas a aprofundar em próximos encontros  
7. Aceitação do formato de mesa redonda digitalizada  
8. Sugestões, dúvidas e feedback  
