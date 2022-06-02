export interface Course {
    id: number;
    name: string;
    uid: string; //code
    detail: string;
    startTime: string;
    price: number;
    maxStudents: number;
    star: number;
    status: CourseStatus;
    duration: number;
    durationUnit: DurationUnit;
    cover: string;
    teacherName: string;
    teacherId: number;
    type: CourseType[];
    createdAt: string;
    scheduleId: number;
  }

  type DurationUnit = 1 | 2 | 3 | 4 | 5;

type CourseStatus = 0 | 1 | 2;

export interface CourseType {
    id: number;
    name: string;
  }

  export interface CourseDetail extends Course {
    sales: Sales;
    schedule: Schedule;
  }
  

  export interface Schedule {
    id: number;
    status: number;
    current: number;
    chapters: Chapter[];
    classTime: string[];
  }

  export interface Chapter {
    name: string;
    id: number;
    content: string;
    order: number;
  }


  interface Sales {
    id: number;
    batches: number;
    price: number;
    earnings: number;
    paidAmount: number;
    studentAmount: number;
    paidIds: number[];
  }
  

  export type Weekday = keyof ScheduleTime
  export interface ScheduleTime {
    Sunday: string
    Monday: string
    Tuesday: string
    Wednesday: string
    Thursday: string
    Friday: string
    Saturday: string
  }

  export type CourseScheduleFormValues = {
    chapters: Pick<Chapter, 'content' | 'name'>[]
    classTime: {
      weekday: string
      time: Date
    }[]
  }