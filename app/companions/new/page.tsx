export const dynamic = "force-dynamic";

import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {
  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="max-w-xl mx-auto py-8 px-4">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
          <div className="space-y-1 mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
              AI Range Builder
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Configure Custom Golf AI Companion
            </h1>
            <p className="text-xs text-gray-400">
              Customize vocal style, specialty topic, and personality cues.
            </p>
          </div>

          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit text-center space-y-4">
          <Image
            src="https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=85"
            alt="Companion limit reached"
            width={360}
            height={230}
            className="rounded-2xl mx-auto"
          />
          <div className="cta-badge inline-block px-3 py-1 rounded-full bg-[#154734] text-[#D4AF37] text-xs font-bold">
            Upgrade your plan
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">You’ve Reached Your Limit</h1>
          <p className="text-xs text-gray-400">
            You’ve reached your companion limit. Upgrade to create more companions and premium features.
          </p>
          <Link href="/subscription" className="inline-block bg-[#D4AF37] text-[#0B2B1F] font-bold text-xs px-6 py-3 rounded-xl">
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
