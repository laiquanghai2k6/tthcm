import Link from "next/link";
import { notFound } from "next/navigation";
import subjects from "@/data/subjects.json";
import questionsData from "@/data/tthcm.json";
import type { Question, Questions, Subject } from "@/types/flash-card";
import FlashCardWorkspace from "./workspace";

const typedSubjects = subjects as Subject[];
const typedQuestionGroups = [questionsData as Questions];

export function generateStaticParams() {
  return typedSubjects.map((subject) => ({
    slug: subject.slug,
  }));
}

export async function generateMetadata(props: PageProps<"/subjects/[slug]">) {
  const { slug } = await props.params;
  const subject = typedSubjects.find((item) => item.slug === slug);

  return {
    title: subject ? `${subject.name} flash cards` : "Flash cards",
  };
}

export default async function SubjectPage(props: PageProps<"/subjects/[slug]">) {
  const { slug } = await props.params;
  console.log('typedSubjects',typedSubjects)
  const subject = typedSubjects.find((item) => item.slug === slug);
  const questionGroup = typedQuestionGroups.find((group) => group.subjectSlug === slug);
  console.log('subject', subject);
  console.log('questionGroup', typedQuestionGroups);
  if (!subject || !questionGroup) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#1f2933]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="w-fit text-sm font-semibold text-[#55736b] hover:text-[#172026]"
        >
          &lt;- Tat ca mon hoc
        </Link>

        <FlashCardWorkspace subject={subject} questions={questionGroup.questions} />
      </section>
    </main>
  );
}
