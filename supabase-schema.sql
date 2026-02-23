-- Execute este SQL no Supabase (SQL Editor) para criar a tabela consultor_submissions
-- O projeto usa o mesmo banco do formulario-hagatha, mas em outra tabela.

CREATE TABLE IF NOT EXISTS consultor_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  answers JSONB,
  completed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security) - opcional
ALTER TABLE consultor_submissions ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserções anônimas (formulário público)
CREATE POLICY "Allow anonymous insert" ON consultor_submissions
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir leitura (admin usa a chave anon que pode precisar de policy)
-- Ajuste conforme sua configuração de segurança
CREATE POLICY "Allow read for service" ON consultor_submissions
  FOR SELECT
  USING (true);

-- Política para permitir delete (admin)
CREATE POLICY "Allow delete for service" ON consultor_submissions
  FOR DELETE
  USING (true);
