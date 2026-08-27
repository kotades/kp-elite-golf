import { getCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);

  const { name, subject, topic, duration } = companion;

  if (!name) redirect("/companions");

  return (
    <main className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <article className="flex rounded-3xl bg-[#161B22] border border-[#30363D] justify-between p-6 max-md:flex-col items-center shadow-xl">
        <div className="flex items-center gap-4">
          <div
            className="size-16 flex items-center justify-center rounded-2xl max-md:hidden border border-[#D4AF37]/40 shadow-md"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={32}
              height={32}
              onError={(e) => {
                // fallback if svg icon doesn't exist
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="font-serif font-bold text-xl sm:text-2xl text-white">
                {name}
              </p>
              <div className="px-2.5 py-0.5 rounded-full bg-[#154734] border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono font-bold uppercase">
                {subject}
              </div>
            </div>
            <p className="text-xs text-gray-300">{topic}</p>
          </div>
        </div>
        <div className="text-sm font-mono font-bold text-[#D4AF37] bg-[#0D1117] px-3 py-1.5 rounded-xl border border-[#30363D] max-md:hidden">
          {duration || 30} mins
        </div>
      </article>

      <CompanionComponent
        {...companion}
        companionId={id}
        userName={"Tour Golfer"}
        userImage={"/coaches/coach-1.jpg"}
      />
    </main>
  );
};

export default CompanionSession;
