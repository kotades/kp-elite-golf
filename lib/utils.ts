import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices, aiGolfPersonas } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string): string => {
  return subjectsColors[subject] || "#0B2B1F";
};

export const configureAssistant = (voice: string, style: string, coachPersonaId?: string): CreateAssistantDTO => {
  const selectedPersona = aiGolfPersonas.find((p) => p.id === coachPersonaId) || aiGolfPersonas[0];
  
  const voiceId =
    selectedPersona?.voiceId ||
    voices[voice as keyof typeof voices]?.[
      style as keyof (typeof voices)[keyof typeof voices]
    ] ||
    "2BJW5coyhAzSr8STdHbE";

  const vapiAssistant: CreateAssistantDTO = {
    name: selectedPersona.name || "KP Elite Golf Coach",
    firstMessage: selectedPersona.welcomeMessage || "Welcome to KP Elite Golf Training. I am your PGA AI Coach. What are we working on today?",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.45,
      similarityBoost: 0.85,
      speed: 1,
      style: 0.4,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `${selectedPersona.prompt}

          Domain Guidelines:
          1. You are coaching golf at the prestigious KP Elite Golf Academy.
          2. Topics include: Full swing biomechanics, kinematic sequence, shallowing, lag, clubface angle, low-point control, chipping, pitching, putting, bunker play, DECADE course management, and mental preparation.
          3. Keep responses conversational, authoritative yet friendly, concise (1-3 sentences), and ideal for a golfer standing on the practice tee or green.
          4. When correcting a fault (e.g. slice, hook, chunk, thin), diagnose the root cause (face-to-path relationship or low point) and give 1 memorable drill.
          5. Avoid markdown or special symbols in spoken responses.
          `,
        },
      ],
    },
    clientMessages: [] as any,
    serverMessages: [] as any,
  };

  return vapiAssistant;
};
