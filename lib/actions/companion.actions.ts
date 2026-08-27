"use server";
import { COLLECTIONS } from "@/lib/firebase/constants";

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { aiGolfPersonas } from "@/constants";

// Default companions derived from curated PGA personas
const defaultCompanions = [
  {
    id: "pga-master-kevin",
    name: "Coach Kevin (PGA Master)",
    subject: "full-swing",
    topic: "Shallowing The Shaft on Downswing & Compression",
    voice: "2BJW5coyhAzSr8STdHbE",
    style: "casual",
    duration: 35,
    author: "system",
  },
  {
    id: "tour-pro-elena",
    name: "Coach Elena (LPGA Tour)",
    subject: "short-game",
    topic: "30-Yard Bunker Splash & Wedge Matrices",
    voice: "ZIlrSGI4jZqobxRKprJz",
    style: "casual",
    duration: 25,
    author: "system",
  },
  {
    id: "speed-coach-marcus",
    name: "Coach Marcus (Speed)",
    subject: "biomechanics",
    topic: "Ground Reaction Force & 115mph Driver Speed",
    voice: "c6SfcYrb2t09NHXiT80T",
    style: "casual",
    duration: 40,
    author: "system",
  },
  {
    id: "course-strategist-david",
    name: "Coach David (DECADE)",
    subject: "course-management",
    topic: "Dispersion Cones & Par 5 Birdie Strategy",
    voice: "2BJW5coyhAzSr8STdHbE",
    style: "formal",
    duration: 30,
    author: "system",
  },
  {
    id: "putting-specialist",
    name: "Coach Elena (Putting)",
    subject: "putting-mastery",
    topic: "AimPoint Green Reading & Lag Pendulum",
    voice: "ZIlrSGI4jZqobxRKprJz",
    style: "casual",
    duration: 20,
    author: "system",
  },
  {
    id: "grip-foundation-coach",
    name: "Coach Kevin (Setup)",
    subject: "grip-setup",
    topic: "Neutral V-Line Grip & Athletic Spine Hinge",
    voice: "2BJW5coyhAzSr8STdHbE",
    style: "casual",
    duration: 15,
    author: "system",
  },
];

export const createCompanion = async (formData: CreateCompanion) => {
  try {
    const docRef = await adminDb.collection(COLLECTIONS.COMPANIONS).add({
      ...formData,
      createdAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...formData };
  } catch (err) {
    console.error("Error creating companion:", err);
    return { id: `comp-${Date.now()}`, ...formData };
  }
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  try {
    let query = adminDb.collection(COLLECTIONS.COMPANIONS).limit(limit);
    const snap = await query.get();

    let list: any[] = [];
    if (!snap.empty) {
      list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }

    // Combine with default system companions
    const all = [...defaultCompanions, ...list];

    // Filter by subject / topic if specified
    const filtered = all.filter((comp) => {
      let matchesSubject = true;
      let matchesTopic = true;

      if (subject) {
        matchesSubject = comp.subject.toLowerCase().includes(String(subject).toLowerCase());
      }
      if (topic) {
        matchesTopic =
          comp.topic.toLowerCase().includes(String(topic).toLowerCase()) ||
          comp.name.toLowerCase().includes(String(topic).toLowerCase());
      }
      return matchesSubject && matchesTopic;
    });

    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  } catch (err) {
    console.error("Error fetching companions:", err);
    return defaultCompanions;
  }
};

export const getCompanion = async (id: string): Promise<Companion> => {
  try {
    const defaultFound = defaultCompanions.find((c) => c.id === id);
    if (defaultFound) return defaultFound;

    const doc = await adminDb.collection(COLLECTIONS.COMPANIONS).doc(id).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() } as Companion;
    }
    return defaultCompanions[0];
  } catch (err) {
    console.error("Error getting companion:", err);
    return defaultCompanions[0];
  }
};

export const addToSessionHistory = async (companionId: string, userId: string = "student-user") => {
  try {
    const docRef = await adminDb.collection(COLLECTIONS.SESSION_HISTORY).add({
      companionId,
      userId,
      createdAt: new Date().toISOString(),
    });
    return { id: docRef.id };
  } catch (err) {
    console.error("Error adding to session history:", err);
    return null;
  }
};

export const getRecentSessions = async (limitCount = 10) => {
  try {
    const snap = await adminDb
      .collection(COLLECTIONS.SESSION_HISTORY)
      .orderBy("createdAt", "desc")
      .limit(limitCount)
      .get();

    if (snap.empty) {
      return defaultCompanions.slice(0, 3);
    }

    const companionIds = snap.docs.map((d) => d.data().companionId);
    return defaultCompanions.filter((c) => companionIds.includes(c.id));
  } catch (err) {
    return defaultCompanions.slice(0, 3);
  }
};

export const getUserSessions = async (userId: string, limitCount = 10) => {
  try {
    const snap = await adminDb
      .collection(COLLECTIONS.SESSION_HISTORY)
      .where("userId", "==", userId)
      .limit(limitCount)
      .get();

    if (snap.empty) {
      return defaultCompanions.slice(0, 2);
    }

    const companionIds = snap.docs.map((d) => d.data().companionId);
    return defaultCompanions.filter((c) => companionIds.includes(c.id));
  } catch (err) {
    return defaultCompanions.slice(0, 2);
  }
};

export const getUserCompanions = async (userId: string) => {
  try {
    const snap = await adminDb
      .collection(COLLECTIONS.COMPANIONS)
      .where("author", "==", userId)
      .get();

    if (snap.empty) {
      return defaultCompanions.slice(0, 3);
    }

    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    return defaultCompanions.slice(0, 3);
  }
};

export const newCompanionPermissions = async () => {
  return true;
};

// Bookmarks
export const addBookmark = async (companionId: string, path: string, userId: string = "student-user") => {
  try {
    await adminDb.collection(COLLECTIONS.BOOKMARKS).add({
      companionId,
      userId,
      createdAt: new Date().toISOString(),
    });
    revalidatePath(path);
  } catch (err) {
    console.error("Error adding bookmark:", err);
  }
};

export const removeBookmark = async (companionId: string, path: string, userId: string = "student-user") => {
  try {
    const snap = await adminDb
      .collection(COLLECTIONS.BOOKMARKS)
      .where("companionId", "==", companionId)
      .where("userId", "==", userId)
      .get();

    const batch = adminDb.batch();
    snap.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    revalidatePath(path);
  } catch (err) {
    console.error("Error removing bookmark:", err);
  }
};

export const getBookmarkedCompanions = async (userId: string) => {
  try {
    const snap = await adminDb
      .collection(COLLECTIONS.BOOKMARKS)
      .where("userId", "==", userId)
      .get();

    if (snap.empty) {
      return [defaultCompanions[0], defaultCompanions[1]];
    }

    const companionIds = snap.docs.map((d) => d.data().companionId);
    return defaultCompanions.filter((c) => companionIds.includes(c.id));
  } catch (err) {
    return [defaultCompanions[0], defaultCompanions[1]];
  }
};
