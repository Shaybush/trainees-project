import { IAnalysisChartDataModel } from '../models/i-analysis-view.model';
import { IStudentElementModel } from '../../../shared/models/i-student-data.model';

/**
 * filter per subject means all the chosen subject and the average in each subject
 * */
export function filterPerSubjectChartData(students: IStudentElementModel[], filteredSubjects?: string[]): IAnalysisChartDataModel[] {
  let subjects: string[] | null = null;

  if (filteredSubjects && filteredSubjects?.length) {
    subjects = filteredSubjects.map(subject => subject.toLowerCase());
  }

  const subjectGradeSummary = students.reduce((subjectGradesMap, student) => {
    const { subject, grade } = student;
    const subjectKey = subject.toLowerCase();

    // Check if subjects exist and filter them
    if (!subjects || (subjects && subjects.includes(subjectKey))) {
      if (!subjectGradesMap[subjectKey]) {
        subjectGradesMap[subjectKey] = { subject, totalGrades: 0, examCount: 0 };
      }
      subjectGradesMap[subjectKey].totalGrades += grade;
      subjectGradesMap[subjectKey].examCount += 1;
    }
    return subjectGradesMap;
  },
    {} as Record<string, { subject: string; totalGrades: number; examCount: number }>
  );

  return Object.values(subjectGradeSummary).map(item => ({
    label: item.subject,
    value: Math.floor(item.totalGrades / item.examCount),
  }));

}

/**
 * filter student avg present from the chosen IDs
 * */
export function filterStudentAvgByIdChartData(
  students: IStudentElementModel[],
  filterIds?: number[],
): IAnalysisChartDataModel[] {
  let ids: number[] | null = null;

  if (filterIds && filterIds?.length) {
    ids = filterIds.map(id => id);
  }

  const studentGradeSummary = students.reduce((studentGradesMap, student) => {
    const { name, grade, id } = student;
    const studentKey = name.toLowerCase();

    if (!ids || (ids && ids.includes(id))) {
      if (!studentGradesMap[studentKey]) {
        studentGradesMap[studentKey] = { name, totalGrades: 0, examCount: 0 };
      }
      studentGradesMap[studentKey].totalGrades += grade;
      studentGradesMap[studentKey].examCount += 1;
    }

    return studentGradesMap;
  }, {} as Record<string, { name: string; totalGrades: number; examCount: number }>);

  return Object.values(studentGradeSummary).map(item => ({
    label: item.name,
    value: Math.floor(item.totalGrades / item.examCount),
  }));
}
