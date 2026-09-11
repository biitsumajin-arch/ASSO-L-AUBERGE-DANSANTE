-- =========================================================
-- SCHEMA SUPABASE / POSTGRESQL - L'AUBERGE DANSANTE
-- Arts Martiaux & Inclusion pour Enfants en Difficulté
-- =========================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Enum Types
CREATE TYPE user_role AS ENUM ('admin', 'professeur', 'famille');
CREATE TYPE discipline_type AS ENUM (
  'Aïkido Adapté', 
  'Judo Éducatif', 
  'Capoeira Inclusive', 
  'Tai-Chi & Respiration', 
  'Karaté Do Doux', 
  'Éveil Martial'
);
CREATE TYPE level_type AS ENUM (
  'Éveil (4-6 ans)', 
  'Initiation (7-10 ans)', 
  'Ados (11-15 ans)', 
  'Tous niveaux'
);
CREATE TYPE day_of_week AS ENUM ('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
CREATE TYPE registration_status AS ENUM ('en_attente', 'validee', 'refusee');
CREATE TYPE student_status AS ENUM ('actif', 'en_pause', 'archive');
CREATE TYPE eval_status AS ENUM ('en_cours', 'acquis', 'maitrise');

-- 3. Profiles Table (Linked with Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'famille',
  telephone TEXT,
  avatar_url TEXT,
  bio TEXT,
  disciplines discipline_type[],
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Teachers Table (Details for professors)
CREATE TABLE public.professeurs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT,
  avatar_url TEXT,
  disciplines discipline_type[] NOT NULL,
  diplomes TEXT[] DEFAULT '{}',
  approche_pedagogique TEXT,
  disponibilites TEXT[] DEFAULT '{}',
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Courses Table
CREATE TABLE public.cours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titre TEXT NOT NULL,
  discipline discipline_type NOT NULL,
  jour day_of_week NOT NULL,
  heure_debut TIME NOT NULL,
  heure_fin TIME NOT NULL,
  professeur_id UUID REFERENCES public.professeurs(id) ON DELETE SET NULL,
  niveau level_type NOT NULL,
  salle TEXT NOT NULL,
  capacite_max INT NOT NULL DEFAULT 8,
  description TEXT,
  objectifs TEXT[] DEFAULT '{}',
  couleur_accent TEXT DEFAULT '#2D5A43',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Students Table (Eleves)
CREATE TABLE public.eleves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  date_naissance DATE NOT NULL,
  age INT,
  famille_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  famille_nom TEXT NOT NULL,
  famille_email TEXT NOT NULL,
  famille_telephone TEXT,
  contact_urgence_nom TEXT NOT NULL,
  contact_urgence_tel TEXT NOT NULL,
  contact_urgence_relation TEXT,
  besoins_specifiques TEXT,
  niveau_actuel TEXT DEFAULT 'Débutant',
  certificat_medical BOOLEAN DEFAULT FALSE,
  statut student_status DEFAULT 'actif',
  date_inscription DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Course Enrollments (Inscriptions eleves <-> cours)
CREATE TABLE public.inscriptions_cours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  eleve_id UUID REFERENCES public.eleves(id) ON DELETE CASCADE,
  cours_id UUID REFERENCES public.cours(id) ON DELETE CASCADE,
  date_inscription TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(eleve_id, cours_id)
);

-- 8. Progressions & Pedagogical evaluations
CREATE TABLE public.progressions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  eleve_id UUID REFERENCES public.eleves(id) ON DELETE CASCADE,
  professeur_nom TEXT NOT NULL,
  discipline discipline_type NOT NULL,
  competence_cle TEXT NOT NULL,
  note_eval eval_status NOT NULL DEFAULT 'acquis',
  commentaire_bienveillant TEXT NOT NULL,
  grade_ceinture TEXT,
  date_evaluation DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Attendances Table (Emargement & presences)
CREATE TABLE public.presences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cours_id UUID REFERENCES public.cours(id) ON DELETE CASCADE,
  eleve_id UUID REFERENCES public.eleves(id) ON DELETE CASCADE,
  date_seance DATE NOT NULL,
  present BOOLEAN NOT NULL DEFAULT TRUE,
  remarques TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cours_id, eleve_id, date_seance)
);

-- 10. Pre-Registrations Table (Demandes en ligne)
CREATE TABLE public.pre_inscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enfant_nom TEXT NOT NULL,
  enfant_prenom TEXT NOT NULL,
  enfant_age INT NOT NULL,
  parent_nom TEXT NOT NULL,
  parent_prenom TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_telephone TEXT NOT NULL,
  cours_souhaites_ids UUID[] DEFAULT '{}',
  besoins_particuliers TEXT,
  motivation_et_attentes TEXT,
  contact_urgence TEXT,
  statut registration_status DEFAULT 'en_attente',
  notes_admin TEXT,
  date_demande TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Documents & Member Resources
CREATE TABLE public.ressources_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titre TEXT NOT NULL,
  categorie TEXT NOT NULL,
  description TEXT,
  format TEXT NOT NULL,
  taille TEXT,
  telechargement_url TEXT NOT NULL,
  public_cible TEXT DEFAULT 'tous',
  date_ajout DATE DEFAULT CURRENT_DATE
);

-- 12. Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eleves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professeurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pre_inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ressources_documents ENABLE ROW LEVEL SECURITY;

-- Public Courses & Public Documents: Read-only for all
CREATE POLICY "Cours accessibles publiquement" ON public.cours FOR SELECT USING (true);
CREATE POLICY "Ressources accessibles aux authentifies" ON public.ressources_documents FOR SELECT TO authenticated USING (true);

-- Admin has full access to everything
CREATE POLICY "Admins full access profiles" ON public.profiles FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins full access eleves" ON public.eleves FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Families can view and edit their own child profile
CREATE POLICY "Famille voir son profil" ON public.eleves FOR SELECT TO authenticated 
USING (famille_id = auth.uid());

-- Professors can view their enrolled students and edit progressions
CREATE POLICY "Professeurs voir leurs eleves" ON public.eleves FOR SELECT TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.inscriptions_cours ic
  JOIN public.cours c ON ic.cours_id = c.id
  JOIN public.professeurs p ON c.professeur_id = p.id
  WHERE ic.eleve_id = public.eleves.id AND p.user_id = auth.uid()
));
