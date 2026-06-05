import Link from "next/link";
import subjects from "@/data/subjects.json";
import questionsData from "@/data/tthcm.json";
import type { Questions, Subject } from "@/types/flash-card";

const typedSubjects = subjects as Subject[];
const typedQuestionGroups = [questionsData as Questions];

export default function Home() {
  const totalCards = typedQuestionGroups.reduce(
    (count, group) => count + group.questions.length,
    0
  );
  console.log('totalCards', totalCards);

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#1f2933]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 border-b border-[#ded6cb] pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#55736b]">
              Local flash cards
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-[#172026] sm:text-5xl">
              Bộ flash card theo từng môn
            </h1>
            <p className="mt-4 text-base leading-7 text-[#5f6b72]">
              Chọn một môn để vào route riêng, đọc dữ liệu mẫu từ JSON ở
              frontend và tạo thêm thẻ học ngay trong trình duyệt.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="border border-[#ded6cb] bg-white px-4 py-3">
              <p className="text-[#66737a]">Môn học</p>
              <p className="mt-1 text-2xl font-semibold">{typedSubjects.length}</p>
            </div>
            <div className="border border-[#ded6cb] bg-white px-4 py-3">
              <p className="text-[#66737a]">Thẻ mẫu</p>
              <p className="mt-1 text-2xl font-semibold">{totalCards}</p>
            </div>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {typedSubjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/subjects/${subject.slug}`}
              className="group border border-[#ded6cb] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#55736b] hover:shadow-[0_14px_30px_rgba(41,54,61,0.12)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                 
                  <h2 className="mt-2 text-2xl font-semibold text-[#172026]">
                    {subject.name}
                  </h2>
                </div>
                <span className="border border-[#ded6cb] px-3 py-1 text-sm text-[#5f6b72]">
                  {typedQuestionGroups.find((group) => group.subjectSlug === subject.slug)?.questions.length ?? 0} thẻ
                </span>
              </div>
             
              <p className="mt-6 text-sm font-semibold text-[#172026]">
                Vào môn học <span className="transition group-hover:translate-x-1">-&gt;</span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
