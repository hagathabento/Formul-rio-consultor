import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Formulário Consultor – Diagnóstico e Terapia Alvo',
    short_name: 'Formulário Consultor',
    description: 'Formulário de feedback para consultores – Diagnóstico e Testagem Molecular, Estudo AGILE (IDH1 mutado).',
    start_url: '/',
    display: 'standalone',
    background_color: '#4B2C78',
    theme_color: '#4B2C78',
    orientation: 'portrait',
    icons: [
      {
        src: '/servier.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
