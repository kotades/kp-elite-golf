import { COLLECTIONS } from "@/lib/firebase/constants";
import { db } from "@/lib/firebase/client";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import { IntakeApplication, SwingSubmission, StudentProgress } from "@/types";

// 1. Intake Applications
export const createIntakeApplication = async (formData: Partial<IntakeApplication>) => {
  try {
    const colRef = collection(db, COLLECTIONS.INTAKE_APPLICATIONS);
    const docRef = await addDoc(colRef, {
      ...formData,
      status: "pending",
      submittedAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error creating intake application:", error);
    return { success: false, error: error.message };
  }
};

export const getIntakeApplications = async () => {
  try {
    const colRef = collection(db, COLLECTIONS.INTAKE_APPLICATIONS);
    const q = query(colRef, orderBy("submittedAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching intake applications:", error);
    return [];
  }
};

// 2. Swing Submissions
export const submitSwingAnalysis = async (
  userId: string,
  data: {
    studentName?: string;
    videoUrl: string;
    clubUsed: string;
    viewAngle: "Down-the-Line" | "Face-On" | "Top-Down 3D";
    notes?: string;
  }
) => {
  try {
    const colRef = collection(db, COLLECTIONS.SWING_SUBMISSIONS);
    const newSubmission = {
      studentId: userId,
      studentName: data.studentName || "PGA Student Golfer",
      videoUrl: data.videoUrl,
      clubUsed: data.clubUsed,
      viewAngle: data.viewAngle,
      status: "Pending AI Review",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      aiMetrics: {
        tempoRatio: "3.0 : 1",
        backswingAngle: 94,
        hipRotationImpact: 42,
        clubheadSpeedMph: Math.floor(Math.random() * 20) + 85,
        launchAngleDeg: 14.5,
        pathTendency: "Square" as const,
      },
      coachNotes: data.notes || "Kinematic sequence scanning in progress...",
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(colRef, newSubmission);

    // Update user profile swings analyzed count
    try {
      const userProgressRef = doc(db, COLLECTIONS.STUDENT_PROGRESS, userId);
      await setDoc(
        userProgressRef,
        {
          swingsAnalyzed: 1,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch {}

    return { success: true, id: docRef.id, ...newSubmission };
  } catch (error: any) {
    console.error("Error submitting swing analysis:", error);
    return { success: false, error: error.message };
  }
};

export const getSwingSubmissions = async (userId: string): Promise<SwingSubmission[]> => {
  try {
    const colRef = collection(db, COLLECTIONS.SWING_SUBMISSIONS);
    const q = query(
      colRef,
      where("studentId", "==", userId)
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      return [];
    }

    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as SwingSubmission[];
  } catch (error) {
    console.error("Error fetching swing submissions:", error);
    return [];
  }
};

// 3. Student Course Progress
export const getUserProgress = async (userId: string): Promise<StudentProgress> => {
  const defaultProgress: StudentProgress = {
    userId,
    currentModuleId: "golf-basics-fundamentals",
    currentMilestone: "Foundation",
    completedLessons: [],
    overallScore: 0,
    skillRatings: {
      grip: 0,
      setup: 0,
      fullSwing: 0,
      putting: 0,
      chipping: 0,
      courseManagement: 0,
    },
    handicapStart: 0,
    handicapCurrent: 0,
    swingsAnalyzed: 0,
    upcomingLessons: [],
  };

  try {
    const progressDocRef = doc(db, COLLECTIONS.STUDENT_PROGRESS, userId);
    const snap = await getDoc(progressDocRef);

    if (snap.exists()) {
      return { ...defaultProgress, ...snap.data() } as StudentProgress;
    } else {
      await setDoc(progressDocRef, {
        ...defaultProgress,
        createdAt: serverTimestamp(),
      });
      return defaultProgress;
    }
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return defaultProgress;
  }
};

export const updateChapterProgress = async (
  userId: string,
  courseId: string,
  chapterId: string,
  isCompleted: boolean = true
) => {
  try {
    const progressDocRef = doc(db, COLLECTIONS.STUDENT_PROGRESS, userId);
    await setDoc(
      progressDocRef,
      {
        userId,
        currentModuleId: courseId,
        completedLessons: isCompleted
          ? arrayUnion(`${courseId}-${chapterId}`)
          : arrayRemove(`${courseId}-${chapterId}`),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return { success: true };
  } catch (error: any) {
    console.error("Error updating chapter progress:", error);
    return { success: false, error: error.message };
  }
};

// 4. Session History & Voice Coach Logs
export const saveSessionHistory = async (
  userId: string,
  companionId: string,
  transcript: { role: string; text: string; time?: string }[] = [],
  durationMinutes: number = 5
) => {
  try {
    const colRef = collection(db, COLLECTIONS.SESSION_HISTORY);
    const docRef = await addDoc(colRef, {
      userId,
      companionId,
      transcript,
      durationMinutes,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error saving session history:", error);
    return { success: false, error: error.message };
  }
};

export const getUserSessions = async (userId: string, limitCount = 10) => {
  try {
    const colRef = collection(db, COLLECTIONS.SESSION_HISTORY);
    const q = query(
      colRef,
      where("userId", "==", userId),
      limit(limitCount)
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      return [];
    }

    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    return [];
  }
};
