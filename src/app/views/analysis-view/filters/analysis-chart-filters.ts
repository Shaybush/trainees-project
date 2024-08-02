
import {
  IAnalysisChartDataModel,
  IAnalysisFilterOptionsModel,
  IFilterOverTimeValueModel
} from "../models/i-analysis-view.model";
import {IStudentElementModel} from "../../../shared/models/i-student-data.model";

/**
 * filter over the time means all the users with their avg grades
 * */
export function filterOverTimeChartData(students: IStudentElementModel[], filterOptions?: IAnalysisFilterOptionsModel): IAnalysisChartDataModel[] {
  return [{ label: '', value: 15 }]
}

/**
 * filter per subject means all the chosen subject and the average in each subject
 * */
export function filterPerSubjectChartData(students: IStudentElementModel[], filterOptions?: IAnalysisFilterOptionsModel): IAnalysisChartDataModel[] {
  let subjects: string[] | null = null;

  if (filterOptions && filterOptions.subjects?.length) {
    subjects = filterOptions.subjects.map(subject => subject.toLowerCase());
  }

  const result = students.reduce((acc, student) => {
    const { subject, grade } = student;
    const key = subject.toLowerCase();

    // Check if subjects exist and filter them
    if (!subjects || (subjects && subjects.includes(key))) {
      if (!acc[key]) acc[key] = { subject, totalGrades: 0, exams: 0 };
      acc[key].totalGrades += grade;
      acc[key].exams += 1;
    }
    return acc;
  }, {} as Record<string, { subject: string; totalGrades: number; exams: number }>);

  return Object.values(result).map(item => ({
    label: item.subject,
    value: Math.floor(item.totalGrades / item.exams),
  }));
}

/**
 * filter student avg present from the chosen IDs
 * */
export function filterStudentAvgByIdChartData(students: IStudentElementModel[], filterOptions?: IAnalysisFilterOptionsModel): IAnalysisChartDataModel[] {
  const result = students.reduce((acc, student) => {
    const { name, grade } = student;
    const key = name.toLowerCase();
    if (!acc[key]) acc[key] = { name, totalGrades: 0, exams: 0 };

    acc[key].totalGrades += grade;
    acc[key].exams += 1;
    return acc;
  }, {} as Record<string, { name: string; totalGrades: number; exams: number }>);

  return Object.values(result).map(item => ({
    label: item.name,
    value: Math.floor(item.totalGrades / item.exams),
  }));
}
