import { useState, useEffect } from 'react';
import { 
  AttendanceRecord, 
  Course, 
  DisciplineType, 
  DocumentResource, 
  LevelType, 
  PreRegistration, 
  ProgressionItem, 
  Student, 
  Teacher, 
  UserProfile, 
  UserRole 
} from '../types';
import { 
  DEMO_USERS, 
  INITIAL_COURSES, 
  INITIAL_DOCUMENTS, 
  INITIAL_PRE_REGISTRATIONS, 
  INITIAL_STUDENTS, 
  INITIAL_TEACHERS 
} from './mockData';

const STORAGE_KEYS = {
  CURRENT_USER: 'auberge_current_user',
  STUDENTS: 'auberge_students',
  TEACHERS: 'auberge_teachers',
  COURSES: 'auberge_courses',
  PRE_REGISTRATIONS: 'auberge_pre_registrations',
  DOCUMENTS: 'auberge_documents',
  ATTENDANCE: 'auberge_attendance'
};

export function useAppStore() {
  // Current user state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing current user', e);
      }
    }
    // Default to guest (null) or first admin for demonstration if not set
    return null;
  });

  // Data collections
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEACHERS);
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [preRegistrations, setPreRegistrations] = useState<PreRegistration[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRE_REGISTRATIONS);
    return saved ? JSON.parse(saved) : INITIAL_PRE_REGISTRATIONS;
  });

  const [documents, setDocuments] = useState<DocumentResource[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync with LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRE_REGISTRATIONS, JSON.stringify(preRegistrations));
  }, [preRegistrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  }, [attendance]);

  // Auth actions
  const loginAs = (role: UserRole) => {
    const user = DEMO_USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
    }
  };

  const loginWithCredentials = (email: string, role: UserRole = 'famille', nom: string = 'Adhérent', prenom: string = 'Membre') => {
    // Check if existing
    const existing = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      return existing;
    }
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      nom,
      prenom,
      role,
      telephone: '06 00 00 00 00',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      bio: 'Membre de la communauté L’Auberge Dansante'
    };
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Student actions
  const addStudent = (newStudent: Omit<Student, 'id' | 'progression' | 'dateInscription'>) => {
    const student: Student = {
      ...newStudent,
      id: `s-${Date.now()}`,
      progression: [],
      dateInscription: new Date().toISOString().split('T')[0]
    };
    setStudents(prev => [student, ...prev]);

    // Update course enrollments
    if (student.coursInscritsIds.length > 0) {
      setCourses(prev => prev.map(c => {
        if (student.coursInscritsIds.includes(c.id) && !c.inscritsIds.includes(student.id)) {
          return { ...c, inscritsIds: [...c.inscritsIds, student.id] };
        }
        return c;
      }));
    }

    return student;
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const updated = { ...s, ...updates };
        return updated;
      }
      return s;
    }));

    // If courses changed, sync course registrations
    if (updates.coursInscritsIds) {
      setCourses(prev => prev.map(c => {
        const shouldBeIn = updates.coursInscritsIds!.includes(c.id);
        const isCurrentlyIn = c.inscritsIds.includes(id);
        if (shouldBeIn && !isCurrentlyIn) {
          return { ...c, inscritsIds: [...c.inscritsIds, id] };
        }
        if (!shouldBeIn && isCurrentlyIn) {
          return { ...c, inscritsIds: c.inscritsIds.filter(sid => sid !== id) };
        }
        return c;
      }));
    }
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setCourses(prev => prev.map(c => ({
      ...c,
      inscritsIds: c.inscritsIds.filter(sid => sid !== id)
    })));
  };

  const addProgression = (studentId: string, item: Omit<ProgressionItem, 'id' | 'date'>) => {
    const newProg: ProgressionItem = {
      ...item,
      id: `p-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          niveauActuel: item.gradeCeinture ? item.gradeCeinture : s.niveauActuel,
          progression: [newProg, ...s.progression]
        };
      }
      return s;
    }));
  };

  // Course actions
  const addCourse = (newCourse: Omit<Course, 'id' | 'inscritsIds'>) => {
    const course: Course = {
      ...newCourse,
      id: `c-${Date.now()}`,
      inscritsIds: []
    };
    setCourses(prev => [...prev, course]);
    return course;
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    // Clean up student course references
    setStudents(prev => prev.map(s => ({
      ...s,
      coursInscritsIds: s.coursInscritsIds.filter(cid => cid !== id)
    })));
  };

  const enrollStudentInCourse = (studentId: string, courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId && !c.inscritsIds.includes(studentId)) {
        return { ...c, inscritsIds: [...c.inscritsIds, studentId] };
      }
      return c;
    }));
    setStudents(prev => prev.map(s => {
      if (s.id === studentId && !s.coursInscritsIds.includes(courseId)) {
        return { ...s, coursInscritsIds: [...s.coursInscritsIds, courseId] };
      }
      return s;
    }));
  };

  const unenrollStudentFromCourse = (studentId: string, courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, inscritsIds: c.inscritsIds.filter(id => id !== studentId) };
      }
      return c;
    }));
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, coursInscritsIds: s.coursInscritsIds.filter(id => id !== courseId) };
      }
      return s;
    }));
  };

  // Pre-registration actions
  const submitPreRegistration = (data: Omit<PreRegistration, 'id' | 'statut' | 'dateDemande'>) => {
    const newReg: PreRegistration = {
      ...data,
      id: `pr-${Date.now()}`,
      statut: 'en_attente',
      dateDemande: new Date().toISOString().split('T')[0]
    };
    setPreRegistrations(prev => [newReg, ...prev]);
    return newReg;
  };

  const updatePreRegistrationStatus = (id: string, statut: 'en_attente' | 'validee' | 'refusee', notesAdmin?: string) => {
    setPreRegistrations(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          statut,
          notesAdmin: notesAdmin !== undefined ? notesAdmin : p.notesAdmin
        };
      }
      return p;
    }));

    // If validated, we can optionally auto-convert to student or let admin click "Convertir en élève"
  };

  const convertPreRegistrationToStudent = (preRegId: string) => {
    const preReg = preRegistrations.find(p => p.id === preRegId);
    if (!preReg) return null;

    const student: Student = {
      id: `s-${Date.now()}`,
      nom: preReg.enfantNom,
      prenom: preReg.enfantPrenom,
      dateNaissance: preReg.enfantDateNaissance || '2017-01-01',
      age: preReg.enfantAge,
      familleId: `famille-${Date.now()}`,
      familleNom: preReg.parentNom,
      familleEmail: preReg.parentEmail,
      familleTelephone: preReg.parentTelephone,
      contactUrgenceNom: preReg.contactUrgence || `${preReg.parentNom} ${preReg.parentPrenom}`,
      contactUrgenceTel: preReg.parentTelephone,
      contactUrgenceRelation: 'Parent',
      besoinsSpecifiques: preReg.besoinsParticuliers || 'Non spécifié',
      niveauActuel: 'Nouveau Pratiquant (Ceinture Blanche)',
      coursInscritsIds: preReg.coursSouhaiteIds || [],
      certificatMedical: false,
      dateInscription: new Date().toISOString().split('T')[0],
      statut: 'actif',
      progression: []
    };

    setStudents(prev => [student, ...prev]);
    updatePreRegistrationStatus(preRegId, 'validee', 'Intégré comme élève actif');

    // Register in chosen courses
    if (student.coursInscritsIds.length > 0) {
      setCourses(prev => prev.map(c => {
        if (student.coursInscritsIds.includes(c.id) && !c.inscritsIds.includes(student.id)) {
          return { ...c, inscritsIds: [...c.inscritsIds, student.id] };
        }
        return c;
      }));
    }

    return student;
  };

  // Teacher actions
  const addTeacher = (newTeacher: Omit<Teacher, 'id'>) => {
    const teacher: Teacher = {
      ...newTeacher,
      id: `t-${Date.now()}`
    };
    setTeachers(prev => [...prev, teacher]);
    return teacher;
  };

  const updateTeacher = (id: string, updates: Partial<Teacher>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  // Attendance actions
  const toggleAttendance = (coursId: string, eleveId: string, eleveNom: string, date: string, present: boolean, remarques?: string) => {
    setAttendance(prev => {
      const existingIndex = prev.findIndex(a => a.coursId === coursId && a.eleveId === eleveId && a.date === date);
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = { ...copy[existingIndex], present, remarques: remarques ?? copy[existingIndex].remarques };
        return copy;
      } else {
        const record: AttendanceRecord = {
          id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          coursId,
          eleveId,
          eleveNom,
          date,
          present,
          remarques
        };
        return [...prev, record];
      }
    });
  };

  // Reset to demo data
  const resetToDemoData = () => {
    setStudents(INITIAL_STUDENTS);
    setTeachers(INITIAL_TEACHERS);
    setCourses(INITIAL_COURSES);
    setPreRegistrations(INITIAL_PRE_REGISTRATIONS);
    setDocuments(INITIAL_DOCUMENTS);
    setAttendance([]);
    setCurrentUser(DEMO_USERS[0]); // Reset to admin
    localStorage.clear();
  };

  return {
    currentUser,
    students,
    teachers,
    courses,
    preRegistrations,
    documents,
    attendance,
    loginAs,
    loginWithCredentials,
    logout,
    addStudent,
    updateStudent,
    deleteStudent,
    addProgression,
    addCourse,
    updateCourse,
    deleteCourse,
    enrollStudentInCourse,
    unenrollStudentFromCourse,
    submitPreRegistration,
    updatePreRegistrationStatus,
    convertPreRegistrationToStudent,
    addTeacher,
    updateTeacher,
    toggleAttendance,
    resetToDemoData
  };
}
