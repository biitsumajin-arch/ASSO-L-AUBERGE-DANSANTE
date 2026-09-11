export type UserRole = 'admin' | 'professeur' | 'famille';

export type NavigationTab = 
  | 'home' 
  | 'disciplines' 
  | 'schedule' 
  | 'preregistration' 
  | 'contact' 
  | 'teacher-portal' 
  | 'famille-portal' 
  | 'admin-portal';

export type DisciplineType = 
  | 'Aïkido Adapté'
  | 'Judo Éducatif'
  | 'Capoeira Inclusive'
  | 'Tai-Chi & Respiration'
  | 'Karaté Do Doux'
  | 'Éveil Martial';

export type LevelType = 
  | 'Éveil (4-6 ans)'
  | 'Initiation (7-10 ans)'
  | 'Ados (11-15 ans)'
  | 'Tous niveaux';

export type DayOfWeek = 
  | 'Lundi'
  | 'Mardi'
  | 'Mercredi'
  | 'Jeudi'
  | 'Vendredi'
  | 'Samedi';

export interface UserProfile {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: UserRole;
  telephone: string;
  avatarUrl?: string;
  bio?: string;
  disciplines?: DisciplineType[];
  specialites?: string[];
  elevesLiesIds?: string[]; // For family role: child IDs
}

export interface ProgressionItem {
  id: string;
  date: string;
  discipline: DisciplineType;
  competenceCle: string;
  noteEval: 'en_cours' | 'acquis' | 'maitrise';
  commentaireBienveillant: string;
  professeurNom: string;
  gradeCeinture?: string;
}

export interface Student {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  age: number;
  familleId: string;
  familleNom: string;
  familleEmail: string;
  familleTelephone: string;
  contactUrgenceNom: string;
  contactUrgenceTel: string;
  contactUrgenceRelation: string;
  besoinsSpecifiques: string; // e.g. "Sensibilité au bruit fort, TDAH, motricité fine, besoin de pauses"
  niveauActuel: string; // e.g. "Ceinture Blanche-Jaune", "Niveau 1 Découverte"
  coursInscritsIds: string[];
  progression: ProgressionItem[];
  certificatMedical: boolean;
  dateInscription: string;
  statut: 'actif' | 'en_pause' | 'archive';
}

export interface Teacher {
  id: string;
  userId: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  avatarUrl: string;
  disciplines: DisciplineType[];
  diplomes: string[];
  approchePedagogique: string;
  disponibilites: string[];
  actif: boolean;
}

export interface Course {
  id: string;
  titre: string;
  discipline: DisciplineType;
  jour: DayOfWeek;
  heureDebut: string;
  heureFin: string;
  professeurId: string;
  professeurNom: string;
  professeurAvatar?: string;
  niveau: LevelType;
  salle: string;
  capaciteMax: number;
  inscritsIds: string[];
  description: string;
  objectifs: string[];
  couleurAccent: string;
}

export interface PreRegistration {
  id: string;
  enfantNom: string;
  enfantPrenom: string;
  enfantAge: number;
  enfantDateNaissance?: string;
  parentNom: string;
  parentPrenom: string;
  parentEmail: string;
  parentTelephone: string;
  coursSouhaiteIds: string[];
  besoinsParticuliers: string;
  motivationEtAttentes: string;
  contactUrgence: string;
  statut: 'en_attente' | 'validee' | 'refusee';
  dateDemande: string;
  notesAdmin?: string;
}

export interface AttendanceRecord {
  id: string;
  coursId: string;
  date: string;
  eleveId: string;
  eleveNom: string;
  present: boolean;
  remarques?: string;
}

export interface DocumentResource {
  id: string;
  titre: string;
  categorie: 'pedagogique' | 'administratif' | 'video' | 'exercices_maison';
  description: string;
  format: string; // e.g. "PDF", "MP4", "Fiche mémo"
  taille: string;
  telechargementUrl: string;
  dateAjout: string;
  publicCible: 'tous' | 'famille' | 'professeur';
}
