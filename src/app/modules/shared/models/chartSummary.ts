import { SchoolWithLesson } from "./schoolWithLesson";

export interface ChartSummary {
    totalNumberOfLessons: number,
    selectedCamp: string,
    schoolWithLesson: SchoolWithLesson[],
}