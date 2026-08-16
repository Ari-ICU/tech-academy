import { NextResponse } from "next/server";
import { searchLessons } from "@/server/services/courses.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const lessonResults = searchLessons(query).map((r) => ({
    type: "lesson",
    title: r.lesson.title,
    description: r.lesson.description,
    url: `/learn/${r.lesson.courseSlug}/module/${r.lesson.moduleSlug}/lesson/${r.lesson.slug}`,
  }));

  return NextResponse.json({ results: lessonResults });
}
