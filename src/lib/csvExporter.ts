import { Course, PreRegistration, Student } from '../types';

export function exportStudentsToCSV(students: Student[]) {
  const headers = [
    'ID',
    'Nom',
    'Prénom',
    'Âge',
    'Date de Naissance',
    'Niveau / Grade',
    'Statut',
    'Famille (Nom)',
    'Email Famille',
    'Téléphone Famille',
    'Contact Urgence',
    'Tél Urgence',
    'Besoins Spécifiques',
    'Certificat Médical',
    'Date Inscription'
  ];

  const rows = students.map(s => [
    s.id,
    `"${s.nom.replace(/"/g, '""')}"`,
    `"${s.prenom.replace(/"/g, '""')}"`,
    s.age,
    s.dateNaissance,
    `"${s.niveauActuel.replace(/"/g, '""')}"`,
    s.statut,
    `"${s.familleNom.replace(/"/g, '""')}"`,
    `"${s.familleEmail.replace(/"/g, '""')}"`,
    `"${s.familleTelephone.replace(/"/g, '""')}"`,
    `"${s.contactUrgenceNom.replace(/"/g, '""')}"`,
    `"${s.contactUrgenceTel.replace(/"/g, '""')}"`,
    `"${s.besoinsSpecifiques.replace(/"/g, '""')}"`,
    s.certificatMedical ? 'Oui' : 'Non',
    s.dateInscription
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
  downloadFile(csvContent, `eleves_auberge_dansante_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
}

export function exportPreRegistrationsToCSV(preRegs: PreRegistration[]) {
  const headers = [
    'Date Demande',
    'Statut',
    'Nom Enfant',
    'Prénom Enfant',
    'Âge',
    'Parent',
    'Email Parent',
    'Téléphone Parent',
    'Besoins Particuliers',
    'Attentes / Projet',
    'Notes Admin'
  ];

  const rows = preRegs.map(p => [
    p.dateDemande,
    p.statut,
    `"${p.enfantNom.replace(/"/g, '""')}"`,
    `"${p.enfantPrenom.replace(/"/g, '""')}"`,
    p.enfantAge,
    `"${p.parentPrenom} ${p.parentNom}"`,
    `"${p.parentEmail.replace(/"/g, '""')}"`,
    `"${p.parentTelephone.replace(/"/g, '""')}"`,
    `"${(p.besoinsParticuliers || '').replace(/"/g, '""')}"`,
    `"${(p.motivationEtAttentes || '').replace(/"/g, '""')}"`,
    `"${(p.notesAdmin || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
  downloadFile(csvContent, `pre_inscriptions_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
}

export function exportCoursesToCSV(courses: Course[]) {
  const headers = [
    'Discipline',
    'Titre du Cours',
    'Jour',
    'Horaires',
    'Niveau',
    'Professeur',
    'Salle',
    'Inscrits Actuels',
    'Capacité Max',
    'Taux Remplissage'
  ];

  const rows = courses.map(c => [
    `"${c.discipline}"`,
    `"${c.titre}"`,
    c.jour,
    `${c.heureDebut} - ${c.heureFin}`,
    `"${c.niveau}"`,
    `"${c.professeurNom}"`,
    `"${c.salle}"`,
    c.inscritsIds.length,
    c.capaciteMax,
    `${Math.round((c.inscritsIds.length / c.capaciteMax) * 100)}%`
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
  downloadFile(csvContent, `planning_cours_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
}

function downloadFile(content: string, fileName: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
