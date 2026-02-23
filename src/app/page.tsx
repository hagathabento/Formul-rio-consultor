'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ChevronRight, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { ShineBorder } from '@/components/magicui/shine-border';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { supabase } from '@/lib/supabase';

const questions = [
  {
    id: 1,
    section: 'Diagnóstico e Testagem Molecular',
    question: '1. Tendo em vista tudo o que foi debatido pelos médicos e o palestrante e a sua experiência em campo, qual foi sua percepção sobre o que mais dificulta a solicitação imediata do teste molecular para LMA?',
    placeholder: 'Digite sua resposta aqui...',
  },
  {
    id: 2,
    section: 'Diagnóstico e Testagem Molecular',
    question: '2. Como os médicos avaliam a segurança clínica durante o período de espera pelo resultado molecular?',
    placeholder: 'Digite sua resposta aqui...',
  },
  {
    id: 3,
    section: 'Terapia Alvo – Estudo AGILE (IDH1 mutado)',
    question: '3. Após a discussão dos dados do AGILE, quais fatores parecem mais influenciar a decisão terapêutica em pacientes com IDH1 mutado?',
    placeholder: 'Digite sua resposta aqui...',
  },
  {
    id: 4,
    section: 'Percepção Geral do Debate',
    question: '4. Quais foram os principais aprendizados ou percepções após o debate?',
    placeholder: 'Digite sua resposta aqui...',
  },
  {
    id: 5,
    section: 'Percepção Geral do Debate',
    question: '5. Houve algum ponto que gerou maior engajamento ou maior debate entre os participantes?',
    placeholder: 'Digite sua resposta aqui...',
  },
  {
    id: 6,
    section: 'Percepção Geral do Debate',
    question: '6. Há algum tema que deveria ser aprofundado em próximos encontros?',
    placeholder: 'Digite sua resposta aqui...',
  },
  {
    id: 7,
    section: 'Percepção Geral do Debate',
    question: '7. Na sua percepção, o formato de mesa redonda digitalizada foi bem aceito e contribuiu para enriquecer a discussão?',
    placeholder: 'Digite sua resposta aqui...',
  },
  {
    id: 8,
    section: 'Percepção Geral do Debate',
    question: '8. Espaço aberto para sugestões, dúvidas, feedback do evento.',
    placeholder: 'Digite sugestões, dúvidas ou feedback...',
  },
];

export default function Home() {
  const [showNameModal, setShowNameModal] = useState(true);
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setShowNameModal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('consultor_submissions').insert([
        {
          name: userName,
          answers: answers,
          completed: true,
        },
      ]);
      if (error) console.error('Erro ao salvar:', error.message || error.code || JSON.stringify(error));
      else setIsCompleted(true);
    } catch (err) {
      console.error('Erro inesperado:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswer = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  if (showNameModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-6">
        <div className="absolute top-6 left-6 z-50">
          <img src="/image.png" alt="TIBSOVO®" className="h-14 md:h-20 w-auto object-contain" />
        </div>
        <div className="absolute bottom-4 right-4 z-50 opacity-80 pointer-events-none">
          <img src="/lgooservier.png" alt="Servier" className="h-6 md:h-8 w-auto object-contain" />
        </div>
        <div className="absolute inset-0 z-0">
          <img src="/wpp.jpeg" alt="" className="w-full h-full object-cover blur-[2px] opacity-80" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--tibsovo-bg)]/80 via-transparent to-transparent" />
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg relative z-10">
          <ShineBorder
            className="w-full bg-black/80 border border-white/10 p-8 md:p-12 flex flex-col gap-8 items-center text-center backdrop-blur-xl"
            color={['#FF6B4A', '#6A44A3']}
            borderWidth={1}
            borderRadius={32}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-2">
              Formulário Consultor – <span className="text-[var(--tibsovo-orange)]">Diagnóstico e Terapia Alvo</span>
            </h1>

            <form onSubmit={handleNameSubmit} className="w-full space-y-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="text-gray-500 group-focus-within:text-[var(--tibsovo-orange)] transition-colors" size={20} />
                </div>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="SEU NOME"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--tibsovo-orange)] focus:ring-1 focus:ring-[var(--tibsovo-orange)] transition-all uppercase tracking-wider"
                  autoFocus
                />
              </div>
              <ShimmerButton
                type="submit"
                disabled={!userName.trim()}
                className={clsx('w-full text-lg font-bold tracking-wide shadow-2xl', !userName.trim() && 'opacity-50 cursor-not-allowed')}
                background="var(--tibsovo-orange)"
                shimmerColor="#ffffff"
                shimmerSize="0.1em"
                shimmerDuration="2s"
              >
                <span className="flex items-center gap-2">
                  COMEÇAR <ChevronRight />
                </span>
              </ShimmerButton>
            </form>
            <p className="text-[10px] md:text-xs text-gray-500/60 font-light uppercase tracking-wide">
              Material destinado a profissionais de saúde habilitados a prescrever e dispensar medicamentos
            </p>
          </ShineBorder>
        </motion.div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-white relative overflow-hidden">
        <div className="fixed inset-0 z-0">
          <img src="/wpp.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-90" aria-hidden />
          <div className="absolute inset-0 bg-[var(--tibsovo-bg)]/70" />
        </div>
        <div className="absolute top-6 left-6 z-50">
          <img src="/image.png" alt="TIBSOVO®" className="h-14 md:h-20 w-auto object-contain" />
        </div>
        <div className="absolute bottom-4 right-4 z-50 opacity-80 pointer-events-none">
          <img src="/lgooservier.png" alt="Servier" className="h-6 md:h-8 w-auto object-contain" />
        </div>

        <ShineBorder
          className="bg-white/10 backdrop-blur-lg p-12 shadow-2xl text-center max-w-2xl w-full border border-white/20 relative z-10 flex flex-col items-center"
          color={['#FF6B4A', '#6A44A3', '#FF6B4A']}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="w-24 h-24 bg-[var(--tibsovo-orange)] rounded-full flex items-center justify-center mb-8 shadow-lg shadow-orange-500/50"
          >
            <CheckCircle size={48} color="white" strokeWidth={3} />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4 text-white">Obrigado pela sua participação!</h2>
          <p className="text-xl text-gray-300 mb-8">Suas respostas foram registradas com sucesso.</p>
          <button onClick={() => window.location.reload()} className="text-[var(--tibsovo-orange)] hover:text-white transition-colors font-semibold">
            Voltar ao início
          </button>
        </ShineBorder>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-white font-sans overflow-hidden relative selection:bg-[var(--tibsovo-orange)] selection:text-white">
      {/* Fundo com imagem levemente embaçada */}
      <div className="fixed inset-0 z-0">
        <img
          src="/wpp.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-90"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[var(--tibsovo-bg)]/70" />
      </div>

      <header className="relative z-10 p-6 md:p-8 flex justify-between items-center backdrop-blur-[2px] bg-black/10 border-b border-white/5 flex-shrink-0">
        <img src="/image.png" alt="TIBSOVO®" className="h-14 md:h-20 w-auto object-contain" />
        <div className="text-sm font-medium text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/10 hidden md:block">
          Formulário Consultor
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10">
          <div className="max-w-4xl mx-auto space-y-10">
            {questions.map((q, i) => {
              const prevSection = i > 0 ? questions[i - 1].section : null;
              const showSection = prevSection !== q.section;
              return (
                <div key={q.id} className="space-y-3">
                  {showSection && (
                    <span className="inline-block px-3 py-1 bg-[var(--tibsovo-purple-light)]/80 text-white text-xs font-bold rounded-full">
                      {q.section}
                    </span>
                  )}
                  <h2 className="text-lg md:text-xl font-light text-white leading-tight">{q.question}</h2>
                  <ShineBorder className="w-full p-0 bg-transparent border-none" borderRadius={16} borderWidth={1} color={['transparent', 'rgba(255, 107, 74, 0.3)', 'transparent']}>
                    <textarea
                      value={answers[q.id] || ''}
                      onChange={(e) => handleAnswer(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      className="input-custom min-h-[120px] text-base resize-none placeholder:text-gray-500 bg-white/5 border border-white/10 focus:border-[var(--tibsovo-orange)] focus:ring-1 focus:ring-[var(--tibsovo-orange)] transition-all rounded-2xl p-5 shadow-inner w-full"
                    />
                  </ShineBorder>
                </div>
              );
            })}
          </div>
        </main>

        <footer className="p-6 md:p-8 backdrop-blur-[2px] bg-black/20 border-t border-white/5 relative z-20 flex-shrink-0">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
            <ShimmerButton
              type="submit"
              disabled={isSubmitting}
              className={clsx('w-full max-w-md font-bold text-lg shadow-lg transition-all', isSubmitting && 'opacity-70')}
              background="var(--tibsovo-orange)"
              shimmerColor="#ffffff"
              shimmerDuration="2.5s"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? 'Salvando...' : 'Enviar formulário'}
                {!isSubmitting && <ChevronRight size={20} />}
              </span>
            </ShimmerButton>
            <p className="text-[10px] md:text-xs text-gray-500/60 font-light uppercase tracking-wide text-center">
              Material destinado a profissionais de saúde habilitados a prescrever e dispensar medicamentos
            </p>
          </div>
        </footer>
      </form>

      <div className="absolute bottom-4 right-4 z-50 opacity-80 pointer-events-none">
        <img src="/lgooservier.png" alt="Servier" className="h-6 md:h-8 w-auto object-contain" />
      </div>
    </div>
  );
}
