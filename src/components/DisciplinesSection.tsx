import React from 'react';
import { DisciplineType } from '../types';
import { ArrowRight, Sparkles, Feather, Shield, Music, Wind, Compass } from 'lucide-react';

interface DisciplinesSectionProps {
  onSelectDiscipline: (discipline: DisciplineType) => void;
}

export const DisciplinesSection: React.FC<DisciplinesSectionProps> = ({ onSelectDiscipline }) => {
  const disciplines = [
    {
      name: 'Aïkido Adapté' as DisciplineType,
      subtitle: 'Harmonie des forces & Esquive douce',
      icon: Feather,
      ageGroup: '7 - 15 ans',
      description: 'Pratique martiale japonaise sans choc frontal. L’enfant apprend à rediriger l’énergie de son partenaire, à chuter en souplesse et à cultiver le calme intérieur.',
      benefits: ['Gestion de l’impulsivité', 'Coordination motrice', 'Roulades sans douleur', 'Désamorçage des conflits'],
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=500',
      color: 'bg-[#2D5A43]',
      tagBg: 'bg-[#2D5A43]/10 text-[#2D5A43]'
    },
    {
      name: 'Judo Éducatif' as DisciplineType,
      subtitle: 'La voie de la souplesse & Schéma corporel',
      icon: Shield,
      ageGroup: '4 - 10 ans',
      description: 'Axé sur le travail au sol et les déplacements équilibrés. Idéal pour les enfants ayant besoin de repères spatiaux, de motricité globale et de contact physique sécurisant.',
      benefits: ['Repérage spatial gauche/droite', 'Confiance par le contact mesuré', 'Respect du rituel du tatami', 'Renforcement postural'],
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=500',
      color: 'bg-[#1E3A5F]',
      tagBg: 'bg-[#1E3A5F]/10 text-[#1E3A5F]'
    },
    {
      name: 'Capoeira Inclusive' as DisciplineType,
      subtitle: 'Rythme, chant & Agilité fraternelle',
      icon: Music,
      ageGroup: '8 - 15 ans',
      description: 'Fusion de dialogue corporel, d’acrobaties douces et d’instruments traditionnels (berimbau, pandeiro). Libère la créativité et renforce l’esprit de groupe sans compétition.',
      benefits: ['Expression vocale & corporelle', 'Coordination sur le tempo musical', 'Création de lien social chaleureux', 'Souplesse dynamique'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500',
      color: 'bg-[#8C6D58]',
      tagBg: 'bg-[#8C6D58]/15 text-[#8C6D58]'
    },
    {
      name: 'Tai-Chi & Respiration' as DisciplineType,
      subtitle: 'Lenteur thérapeutique & Ancrage profond',
      icon: Wind,
      ageGroup: 'Tous âges',
      description: 'Mouvements lents et continus coordonnés à la respiration ventrale. Particulièrement recommandé pour apaiser les surcharges sensorielles et l’hyperactivité.',
      benefits: ['Baisse du cortisol et de l’anxiété', 'Attention soutenue', 'Conscience proprioceptive', 'Auto-régulation émotionnelle'],
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500',
      color: 'bg-[#3D7858]',
      tagBg: 'bg-[#3D7858]/10 text-[#3D7858]'
    },
    {
      name: 'Karaté Do Doux' as DisciplineType,
      subtitle: 'Précision du geste & Maîtrise de soi',
      icon: Compass,
      ageGroup: '7 - 12 ans',
      description: 'Focus exclusif sur les katas (enchaînements traditionnels codifiés) et la respiration diaphragmatique. Zéro frappe violente : la beauté du geste et la rigueur apaisée priment.',
      benefits: ['Rigueur et structuration mentale', 'Affirmation de soi mesurée', 'Équilibre et tenue du dos', 'Patience et mémorisation'],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500',
      color: 'bg-[#475569]',
      tagBg: 'bg-[#475569]/10 text-[#475569]'
    },
    {
      name: 'Éveil Martial' as DisciplineType,
      subtitle: 'Parcours moteur & Contes corporels',
      icon: Sparkles,
      ageGroup: '4 - 6 ans',
      description: 'Pour les tout-petits : découverte des postures d’animaux (le tigre, la grue, la tortue), jeux d’écoute sensorielle et roulades sur tatami doux et sécurisé.',
      benefits: ['Découverte ludique du corps', 'Socialisation bienveillante', 'Écoute des consignes simples', 'Plaisir du mouvement'],
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=500',
      color: 'bg-[#D4AF37]',
      tagBg: 'bg-amber-100 text-amber-900'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F4EFEA] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5A43]/10 text-[#2D5A43] text-xs font-semibold">
              <span>Nos Disciplines Adaptées</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#1E293B] tracking-tight">
              Des pratiques variées pour répondre à chaque sensibilité
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Chaque discipline est revisitée par nos éducateurs formés au sport santé pour offrir un cadre chaleureux et progressif.
            </p>
          </div>
        </div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((disc, idx) => {
            const Icon = disc.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header & Visual */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${disc.tagBg}`}>
                        {disc.ageGroup}
                      </span>
                      <div className="p-2 rounded-lg bg-[#FAF8F5] text-[#2D5A43]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-serif-heading text-2xl font-bold text-[#1E293B] group-hover:text-[#2D5A43] transition-colors">
                      {disc.name}
                    </h3>
                    <p className="text-xs font-medium text-[#8C6D58] mt-0.5">
                      {disc.subtitle}
                    </p>
                    <p className="text-xs text-[#64748B] mt-3 leading-relaxed">
                      {disc.description}
                    </p>
                  </div>

                  {/* Benefits Pills */}
                  <div className="px-6 py-3 bg-[#FAF8F5] border-t border-b border-[#F1EAE1]">
                    <p className="text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-2">
                      Bénéfices constatés :
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {disc.benefits.map((ben, bIdx) => (
                        <span key={bIdx} className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-[#E2D9CE] text-[#475569]">
                          • {ben}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="p-4 bg-white flex items-center justify-between">
                  <button
                    onClick={() => onSelectDiscipline(disc.name)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#2D5A43] text-[#2D5A43] hover:text-white font-semibold text-xs border border-[#E2D9CE] hover:border-transparent transition-all cursor-pointer"
                  >
                    <span>Voir les cours de {disc.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
