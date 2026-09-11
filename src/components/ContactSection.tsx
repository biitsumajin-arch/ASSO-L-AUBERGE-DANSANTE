import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check, HelpCircle, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', message: '', sujet: 'Question générale' });
  const [sent, setSent] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setFormData({ nom: '', email: '', telephone: '', message: '', sujet: 'Question générale' });
    }, 2000);
  };

  const faqs = [
    {
      q: "Mon enfant est très craintif ou a du mal avec le contact physique. Peut-il quand même venir ?",
      a: "Absolument. Nos cours sont spécifiquement conçus pour respecter les limites sensorielles. L'enfant peut observer assis sur le bord du tatami autant de séances que nécessaire, et le port du t-shirt sous le kimono est autorisé pour les enfants ayant une hypersensibilité textile."
    },
    {
      q: "Faut-il acheter un équipement coûteux dès le début ?",
      a: "Non. Pour les premières séances d'essai et la période de découverte, une tenue de sport souple (pantalon de jogging et t-shirt propre en coton) suffit amplement. L'association prête également des ceintures et kimonos."
    },
    {
      q: "Les cours sont-ils mixtes et adaptés aux tranches d'âge ?",
      a: "Oui, tous les cours sont mixtes et organisés en très petits groupes (maximum 6 à 8 enfants) pour garantir une présence constante et rassurante de l'enseignant."
    },
    {
      q: "Proposez-vous des facilités pour les familles en situation modeste ?",
      a: "L'Auberge Dansante est une association loi 1901 à but non lucratif. Nous acceptons le Pass'Sport, les aides CAF / CCAS et proposons une tarification solidaire modulable selon le quotient familial."
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C6D58]/15 text-[#8C6D58] text-xs font-semibold">
            <Phone className="w-3.5 h-3.5" />
            <span>Échangeons avec Bienveillance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#1E293B] tracking-tight">
            Contactez L'Équipe Pédagogique
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            Une question sur une discipline, un besoin d'adaptation particulier pour votre enfant ou une demande de visite du dojo ? Nous sommes à votre entière écoute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Practical Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="font-serif-heading text-xl font-bold text-[#1E293B] pb-2 border-b border-[#F1EAE1]">
                Nos Lieux de Pratique & Permanences
              </h3>

              <div className="space-y-4 text-xs text-[#475569]">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#2D5A43]/10 text-[#2D5A43] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-sm text-[#1E293B] block">Dojo Principal « Les Bambous »</strong>
                    <p className="mt-0.5">14 Allée des Chênes Verts, 75014 Paris</p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">(Accès PMR, vestiaires calmes et insonorisés)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#1E3A5F]/10 text-[#1E3A5F] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-sm text-[#1E293B] block">Salle Rythmique « Le Chêne »</strong>
                    <p className="mt-0.5">8 Rue de la Fraternité, 75014 Paris</p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">(Espace Capoeira & Expression corporelle)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#8C6D58]/15 text-[#8C6D58] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-sm text-[#1E293B] block">Accueil Téléphonique & Écoute Familles</strong>
                    <p className="mt-0.5">Du Lundi au Vendredi : 9h30 - 18h30</p>
                    <p className="mt-0.5">Le Samedi : 9h00 - 17h00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-sm text-[#1E293B] block">Courriel Officiel</strong>
                    <p className="mt-0.5 text-[#2D5A43] font-medium">contact@auberge-dansante.fr</p>
                    <p className="text-[11px] text-[#64748B]">Réponse garantie sous 24 à 48h ouvrées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#E2D9CE] p-6 sm:p-8 shadow-xs">
              <h3 className="font-serif-heading text-xl font-bold text-[#1E293B] mb-2">
                Envoyer un Message à l'Équipe
              </h3>
              <p className="text-xs text-[#64748B] mb-6">
                Nous prenons le temps de répondre personnellement à chaque famille.
              </p>

              {sent ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#2D5A43] text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-serif-heading text-lg font-bold text-[#2D5A43]">
                    Message bien reçu !
                  </h4>
                  <p className="text-xs text-[#475569]">
                    Merci de votre confiance. Notre coordinatrice pédagogique va revenir vers vous très rapidement.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs font-semibold text-[#2D5A43] underline mt-2"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#475569] mb-1">
                        Votre Nom complet <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Sophie Martin"
                        value={formData.nom}
                        onChange={e => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#475569] mb-1">
                        Votre Adresse Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: sophie.martin@email.fr"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#475569] mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        placeholder="Ex: 06 12 34 56 78"
                        value={formData.telephone}
                        onChange={e => setFormData({ ...formData, telephone: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#475569] mb-1">
                        Sujet de votre demande
                      </label>
                      <select
                        value={formData.sujet}
                        onChange={e => setFormData({ ...formData, sujet: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                      >
                        <option value="Question générale">Question générale</option>
                        <option value="Demande d'adaptation spécifique">Demande d'adaptation spécifique (TDAH, TSA, etc.)</option>
                        <option value="Visite du Dojo">Visite préalable du Dojo</option>
                        <option value="Partenariat / Éducateurs">Partenariat / Éducateurs</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">
                      Votre Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Expliquez-nous la situation de votre enfant, ses envies, ou posez-nous vos questions..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1E293B] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2D5A43] hover:bg-[#234936] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer le message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="bg-[#F4EFEA] rounded-3xl p-6 sm:p-10 border border-[#E2D9CE]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif-heading text-2xl font-bold text-[#1E293B]">
              Questions Fréquentes des Familles
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              Tout ce que vous devez savoir pour aborder sereinement la rentrée de votre enfant.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif-heading font-bold text-sm sm:text-base text-[#1E293B]">
                      {faq.q}
                    </span>
                    <span className="p-1 rounded-lg bg-[#FAF8F5] text-[#8C6D58] shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F1EAE1] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
