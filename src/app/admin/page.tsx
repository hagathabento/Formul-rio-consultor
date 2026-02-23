'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, RefreshCw, Database, Lock, Trash2 } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

const questionsLabels: Record<number, string> = {
  1: 'Dificuldade teste molecular LMA',
  2: 'Segurança clínica durante espera',
  3: 'Fatores decisão terapêutica IDH1',
  4: 'Principais aprendizados',
  5: 'Ponto de maior engajamento',
  6: 'Tema para aprofundar',
  7: 'Formato mesa redonda digitalizada',
  8: 'Sugestões e feedback',
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissionToDelete, setSubmissionToDelete] = useState<any | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [viewModalContent, setViewModalContent] = useState<{ title: string; text: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'servierhagatha') {
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      alert('Senha incorreta!');
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('consultor_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (err: any) {
      console.error('Erro ao buscar submissões:', err);
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleString('pt-BR');

  const openDeleteModal = (sub: any) => {
    setSubmissionToDelete(sub);
    setDeletePassword('');
    setDeleteError(null);
  };

  const closeDeleteModal = () => {
    setSubmissionToDelete(null);
    setDeletePassword('');
    setDeleteError(null);
  };

  const handleConfirmDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionToDelete) return;
    if (deletePassword !== 'servierhagatha') {
      setDeleteError('Senha incorreta.');
      return;
    }
    setDeleting(true);
    setDeleteError(null);
    try {
      const { error } = await supabase.from('consultor_submissions').delete().eq('id', submissionToDelete.id);
      if (error) throw error;
      setSubmissions((prev) => prev.filter((s) => s.id !== submissionToDelete.id));
      closeDeleteModal();
    } catch (err: any) {
      setDeleteError(err.message || 'Erro ao excluir.');
    } finally {
      setDeleting(false);
    }
  };

  const getAnswerText = (sub: any, qId: number) => {
    const answer = sub.answers?.[qId];
    return answer || '-';
  };

  const TRUNCATE = 50;
  const TruncatableCell = ({
    text,
    title,
    onClick,
    colorClass,
  }: {
    text: string;
    title: string;
    onClick: () => void;
    colorClass?: string;
  }) => {
    const isLong = text && (text.length > TRUNCATE || text.includes('\n'));
    return (
      <td className="p-3 text-sm align-top max-w-[180px]">
        <div
          onClick={isLong ? onClick : undefined}
          className={clsx(
            'line-clamp-2 break-words overflow-hidden',
            colorClass || 'text-gray-300',
            isLong && 'cursor-pointer hover:text-white hover:bg-gray-700/50 rounded px-1 -mx-1 transition-colors'
          )}
          title={isLong ? 'Clique para ver o texto completo' : undefined}
        >
          {text || '-'}
        </div>
      </td>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[var(--tibsovo-orange)]/20 rounded-full">
              <Lock className="text-[var(--tibsovo-orange)]" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Acesso Restrito – Formulário Consultor</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Senha de Acesso</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--tibsovo-orange)] transition-colors"
                placeholder="Digite a senha..."
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--tibsovo-orange)] hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Entrar
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
              &larr; Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-[1600px] mx-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Database className="text-[var(--tibsovo-orange)]" />
              Painel Admin – Formulário Consultor
            </h1>
          </div>
          <button
            onClick={fetchSubmissions}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--tibsovo-orange)] hover:bg-orange-600 rounded-lg font-medium transition-colors"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Atualizar
          </button>
        </header>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            Erro: {error}
            <p className="text-sm mt-2 opacity-80">Verifique se a tabela consultor_submissions existe no Supabase.</p>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-3 border-b border-gray-700">Data</th>
                <th className="p-3 border-b border-gray-700">Nome</th>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((q) => (
                  <th key={q} className="p-3 border-b border-gray-700 max-w-[180px]">
                    Q{q}
                  </th>
                ))}
                <th className="p-3 border-b border-gray-700 w-16 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={11} className="p-8 text-center text-gray-500">
                    Carregando...
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan={11} className="p-8 text-center text-gray-500">
                    Nenhuma submissão encontrada.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="p-3 text-sm whitespace-nowrap text-gray-400">{formatDate(sub.created_at)}</td>
                    <TruncatableCell
                      text={sub.name || '-'}
                      title="Nome"
                      onClick={() => setViewModalContent({ title: 'Nome', text: sub.name || '-' })}
                    />
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((qId) => (
                      <TruncatableCell
                        key={qId}
                        text={getAnswerText(sub, qId)}
                        title={questionsLabels[qId] || `Q${qId}`}
                        onClick={() =>
                          setViewModalContent({
                            title: questionsLabels[qId] || `Pergunta ${qId}`,
                            text: getAnswerText(sub, qId),
                          })
                        }
                      />
                    ))}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => openDeleteModal(sub)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="p-4 text-xs text-gray-500 bg-gray-900/30 border-t border-gray-700 text-center">
            Total: {submissions.length}
          </div>
        </div>

        {viewModalContent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setViewModalContent(null)}
          >
            <div
              className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-gray-700 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">{viewModalContent.title}</h3>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                <p className="text-gray-300 whitespace-pre-wrap break-words leading-relaxed">
                  {viewModalContent.text}
                </p>
              </div>
              <div className="p-4 border-t border-gray-700">
                <button
                  onClick={() => setViewModalContent(null)}
                  className="w-full px-4 py-2 bg-[var(--tibsovo-orange)] hover:bg-orange-600 rounded-lg font-medium transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {submissionToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-full">
                  <Trash2 className="text-red-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Excluir submissão</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Excluir submissão de <strong className="text-white">{submissionToDelete.name}</strong> de{' '}
                {formatDate(submissionToDelete.created_at)}?
              </p>
              <form onSubmit={handleConfirmDelete} className="space-y-4">
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => {
                    setDeletePassword(e.target.value);
                    setDeleteError(null);
                  }}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                  placeholder="Senha para confirmar"
                />
                {deleteError && <p className="text-sm text-red-400">{deleteError}</p>}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeDeleteModal}
                    className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={deleting}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 rounded-lg font-medium"
                  >
                    {deleting ? 'Excluindo...' : 'Excluir'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
