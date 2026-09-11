import React, { useState } from 'react';
import { Course, PreRegistration } from '../types';
import { Sparkles, CheckCircle2, Heart, Shield, HelpCircle, ArrowRight, Printer, Check, Info } from 'lucide-react';

interface PreRegistrationFormProps {
  courses: Course[];
  preSelectedCourseId?: string | null;
  onSubmit: (data: Omit<PreRegistration, 'id' | 'statut' | 'dateDemande'>) => void;
  onNavigateToSchedule: () => void;
}

export const PreRegistrationForm: React.FC<PreRegistrationFormProps> = ({
  courses,
  preSelectedCourseId,
  onSubmit,
  onNavigateToSchedule
}) => {
  const [formData, setFormData] = useState({
    enfantNom: '',
    enfantPrenom: '',
    enfantAge: 8,
    enfantDateNaissance: '2017-05-15',
    parentNom: '',
    parentPrenom: '',
    parentEmail: '',
    parentTelephone: '',
    coursSouhaiteIds: preSelectedCourseId ? [preSelectedCourseId] : [] as string[],
    besoinsParticuliers: '',
    motivationEtAttentes: '',
    contactUrgence: '',
  });

  const [submittedData, setSubmittedData] = useState<PreRegistration | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCourseSelection = (courseId: string) => {
    setFormData(prev => {
      const exists = prev.coursSouhaiteIds.includes(courseId);
      if (exists) {
        return { ...prev, coursSouhaiteIds: prev.coursSouhaiteIds.filter(id => id !== courseId) };
      } else {
        return { ...prev, coursSouhaiteIds: [...prev.coursSouhaiteIds, courseId] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.enfantPrenom || !formData.parentEmail || formData.coursSouhaiteIds.length === 0) {
      alert('Veuillez renseigner le prénom de l’enfant, vos coordonnées et choisir au moins un cours.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const created = onSubmit({
        enfantNom: formData.enfantNom || formData.parentNom,
        enfantPrenom: formData.enfantPrenom,
        enfantAge: Number(formData.enfantAge),
        enfantDateNaissance: formData.enfantDateNaissance,
        parentNom: formData.parentNom,
        parentPrenom: formData.parentPrenom,
        parentEmail: formData.parentEmail,
        parentTelephone: formData.parentTelephone,
        coursSouhaiteIds: formData.coursSouhaiteIds,
        besoinsParticuliers: formData.besoinsParticuliers,
        motivationEtAttentes: formData.motivationEtAttentes,
        contactUrgence: formData.contactUrgence || `${formData.parentNom} ${formData.parentPrenom} (${formData.parentTelephone})`
      }) as unknown as PreRegistration;

      setSubmittedData({
        id: `pr-${Date.now()}`,
        statut: 'en_attente',
        dateDemande: new Date().toISOString().split('T')[0],
        ...formData,
        enfantNom: formData.enfantNom || formData.parentNom,
        enfantAge: Number(formData.enfantAge)
      });
      setIsSubmitting(false);
    }, 600);
  };

  if (submittedData) {
    const selectedCoursesDetails = courses.filter(c => submittedData.coursSouhaiteIds.includes(c.id));

    return (
      <section className="py-16 md:py-24 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border-2 border-[#2D5A43]/30 p-8 sm:p-12 shadow-xl space-y-6 text-center animate-in zoom-in-95 duration-300">
            
            <div className="w-16 h-16 rounded-full bg-[#2D5A43]/10 text-[#2D5A43] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A43] bg-emerald-50 px-3 py-1 rounded-full">
                Demande transmise avec succès
              </span>
              <h2 className="text-3xl font-bold font-serif-heading text-[#1E293B]">
                Bienvenue à L'Auberge Dansante !
              </h2>
              <p className="text-sm text-[#64748B] max-w-lg mx-auto">
                La pré-inscription de <strong>{submittedData.enfantPrenom}</strong> a bien été enregistrée. 
                Aucun paiement n’est requis à ce stade. Notre équipe pédagogique va vous contacter sous 48h.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8E2D9] text-left text-xs space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#E2D9CE]">
                <div>
                  <p className="text-[#64748B]">Référence dossier :</p>
                  <strong className="text-[#1E293B]">{submittedData.id}</strong>
                </div>
                <div className="text-right">
                  <p className="text-[#64748B]">Date :</p>
                  <strong className="text-[#1E293B]">{submittedData.dateDemande}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[#64748B] font-medium">Élève :</p>
                  <p className="text-[#1E293B] font-bold text-sm">{submittedData.enfantPrenom} {submittedData.enfantNom} ({submittedData.enfantAge} ans)</p>
                </div>
                <div>
                  <p className="text-[#64748B] font-medium">Responsable légal :</p>
                  <p className="text-[#1E293B] font-bold text-sm">{submittedData.parentPrenom} {submittedData.parentNom}</p>
                  <p className="text-[#64748B]">{submittedData.parentEmail} | {submittedData.parentTelephone}</p>
                </div>
              </div>

              <div>
                <p className="text-[#64748B] font-medium mb-1.5">Cours souhaité(s) pour la séance d'essai offerte :</p>
                <div className="space-y-1">
                  {selectedCoursesDetails.map(c => (
                    <div key={c.id} className="p-2.5 rounded-lg bg-white border border-[#E2D9CE] flex justify-between items-center">
                      <div>
                        <strong className="text-[#1E293B]">{c.titre}</strong>
                        <p className="text-[11px] text-[#64748B]">{c.jour} {c.heureDebut}-{c.heureFin} • {c.salle}</p>
                      </div>
                      <span className="text-[10px] font-bold text-[#2D5A43] bg-[#2D5A43]/10 px-2 py-0.5 rounded-md">
                        {c.discipline}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {submittedData.besoinsParticuliers && (
                <div className="pt-2 border-t border-[#E2D9CE]">
                  <p className="text-[#64748B] font-medium">Sensibilités & besoins notés :</p>
                  <p className="text-[#1E293B] italic mt-0.5">{submittedData.besoinsParticuliers}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E2D9CE] text-[#1E293B] text-xs font-semibold hover:bg-[#FAF8F5]"
              >
                <Printer className="w-4 h-4 text-[#8C6D58]" />
                <span>Imprimer le récapitulatif</span>
              </button>

              <button
                onClick={() => {
                  setSubmittedData(null);
                  onNavigateToSchedule();
                }}
                className="px-6 py-2.5 rounded-xl bg-[#2D5A43] text-white text-xs font-semibold shadow-md hover:bg-[#234936]"
              >
                Retourner à l'accueil
              </button>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5A43]/10 text-[#2D5A43] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Formulaire Bienveillant & Sans Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#1E293B] tracking-tight">
            Pré-inscription & Séance Découverte
          </h2>
          <p className="text-sm text-[#64748B]">
            Remplissez ces quelques informations pour permettre à nos enseignants d'adapter leur accueil. 
            Aucun paiement requis : nous offrons une première séance d'immersion douce sur le tatami.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Child info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#F1EAE1]">
                <div className="w-7 h-7 rounded-lg bg-[#2D5A43]/10 text-[#2D5A43] flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h3 className="font-serif-heading text-lg font-bold text-[#1E293B]">
                  L'Enfant & ses Spécificités
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Prénom de l'enfant <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Léo, Maya, Arthur"
                    value={formData.enfantPrenom}
                    onChange={e => setFormData({ ...formData, enfantPrenom: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Nom de famille
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Martin"
                    value={formData.enfantNom}
                    onChange={e => setFormData({ ...formData, enfantNom: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Âge de l'enfant <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={4}
                    max={17}
                    required
                    value={formData.enfantAge}
                    onChange={e => setFormData({ ...formData, enfantAge: parseInt(e.target.value) || 8 })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">
                  Besoins particuliers, sensibilités ou neurodiversités (facultatif mais précieux) :
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex : Hypersensibilité au bruit, TDAH, dyspraxie, timidité importante, port de lunettes, besoin de pauses..."
                  value={formData.besoinsParticuliers}
                  onChange={e => setFormData({ ...formData, besoinsParticuliers: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                />
                <p className="text-[11px] text-[#64748B] mt-1 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#2D5A43]" />
                  Ces données restent strictement confidentielles et ne sont partagées qu'avec l'enseignant de l'enfant.
                </p>
              </div>
            </div>

            {/* Section 2: Course selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#F1EAE1]">
                <div className="w-7 h-7 rounded-lg bg-[#2D5A43]/10 text-[#2D5A43] flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h3 className="font-serif-heading text-lg font-bold text-[#1E293B]">
                  Choix du ou des Cours Souhaités <span className="text-rose-500">*</span>
                </h3>
              </div>

              <p className="text-xs text-[#64748B]">
                Sélectionnez un ou plusieurs ateliers pour la séance d'essai :
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {courses.map(course => {
                  const isSelected = formData.coursSouhaiteIds.includes(course.id);
                  const availableSeats = course.capaciteMax - course.inscritsIds.length;

                  return (
                    <button
                      type="button"
                      key={course.id}
                      onClick={() => toggleCourseSelection(course.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#2D5A43]/10 border-[#2D5A43] shadow-xs'
                          : 'bg-[#FAF8F5] border-[#E2D9CE] hover:border-[#2D5A43]/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-[#2D5A43] bg-white px-2 py-0.5 rounded-md border border-[#E2D9CE]">
                          {course.discipline}
                        </span>
                        <h4 className="font-serif-heading text-sm font-bold text-[#1E293B]">
                          {course.titre}
                        </h4>
                        <p className="text-[11px] text-[#64748B]">
                          {course.jour} {course.heureDebut} - {course.heureFin} ({course.niveau})
                        </p>
                      </div>

                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-1 ${
                        isSelected ? 'bg-[#2D5A43] border-[#2D5A43] text-white' : 'border-[#CBD5E1] bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Parent Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#F1EAE1]">
                <div className="w-7 h-7 rounded-lg bg-[#2D5A43]/10 text-[#2D5A43] flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h3 className="font-serif-heading text-lg font-bold text-[#1E293B]">
                  Coordonnées des Parents / Responsables Légaux
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Prénom du parent <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sophie"
                    value={formData.parentPrenom}
                    onChange={e => setFormData({ ...formData, parentPrenom: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Nom du parent <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Martin"
                    value={formData.parentNom}
                    onChange={e => setFormData({ ...formData, parentNom: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Email de contact <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: sophie.martin@email.fr"
                    value={formData.parentEmail}
                    onChange={e => setFormData({ ...formData, parentEmail: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Numéro de Téléphone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 06 12 34 56 78"
                    value={formData.parentTelephone}
                    onChange={e => setFormData({ ...formData, parentTelephone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">
                  Vos attentes ou projet pour l'enfant (optionnel) :
                </label>
                <textarea
                  rows={2}
                  placeholder="Qu'espérez-vous que votre enfant trouve à l'association ? (confiance, apaisement, défoulement canalisé...)"
                  value={formData.motivationEtAttentes}
                  onChange={e => setFormData({ ...formData, motivationEtAttentes: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Submit Banner */}
            <div className="pt-4 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#64748B]">
                <Info className="w-4 h-4 text-[#8C6D58] shrink-0" />
                <span>Séance d'essai 100% gratuite et sans engagement financier (V1).</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2D5A43] hover:bg-[#234936] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Envoi du dossier...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Envoyer la demande de pré-inscription</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
