
import {
  IAnalysisChartDataModel,
  IAnalysisFilterOptionsModel,
  IFilterOverTimeValueModel
} from "../models/i-analysis-view.model";
import {IStudentElementModel} from "../../../shared/models/i-student-data.model";

/**
 * filter over the time means all the users with their avg grades
 * */
export function filterOverTimeChartData(students: IStudentElementModel[]): IAnalysisChartDataModel[] {
  const result = students.reduce((acc, student) => {
    const { name, grade } = student;
    const key = name.toLowerCase();
    if (!acc[key]) acc[key] = { name, totalGrades: 0, exams: 0 };

    acc[key].totalGrades += grade;
    acc[key].exams += 1;
    return acc;
  }, {} as Record<string, IFilterOverTimeValueModel>);

  return Object.values(result).map(item => ({
    label: item.name,
    value: Math.floor(item.totalGrades / item.exams),
  }));
}

/**
 * filter per subject means all the chosen subject and the average in each subject
 * */
export function filterPerSubjectChartData(students: IStudentElementModel[], filterOptions?: IAnalysisFilterOptionsModel): IAnalysisChartDataModel[] {
  const filters = filterOptions ? filterOptions : {};

  // const result = students.reduce((acc, student) => {
  //   const { name, grade } = student;
  //   const key = name.toLowerCase();
  //   if (!acc[key]) acc[key] = { name, totalGrades: 0, exams: 0 };
  //
  //   acc[key].totalGrades += grade;
  //   acc[key].exams += 1;
  //   return acc;
  // }, {} as Record<string, IFilterOverTimeValueModel>);

  return [
    {
      label: 'Algebra',
      value: 85
    },
    {
      label: 'Math',
      value: 72
    },
    {
      label: 'geographic',
      value: 45
    },
  ]
}

/**
 * filter student avg present from the chosen IDs
 * */
export function filterStudentAvgChartData(students: IStudentElementModel[], filterOptions?: IAnalysisFilterOptionsModel): IAnalysisChartDataModel[] {
  return [
    {
      label: 'Algebra',
      value: 85
    },
    {
      label: 'Math',
      value: 72
    },
    {
      label: 'geographic',
      value: 45
    },
  ]
}
