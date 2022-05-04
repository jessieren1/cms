export interface Student<T = Course> {
  id: number;
  name: string;
  updateAt: string;
  country: string;
  ctime: string;
  email: string;
  courses: T[];
  type: Type |  string;
}

  export interface Course {
    id: number;
    courseId: number;
    name: string;
  }

export interface Type {
    id: number;
    name: string;
  }

export interface AddStudent{
  email: string;
  name: string;
  country: string;
  type: 1 | 2;
}

export interface EditStudent{
    id:number | null
}


export interface PostLogin {
	email: string;
	password: string;
	type: string;
}

export type StudentResponse = StudentWithProfile;

export interface StudentWithProfile extends Student<Course>, StudentProfile {}

export interface StudentProfile {
  id: number;
  name: string;
  country: string;
  email: string;
  address: string;
  phone: number;
  gender: number;
  education: string;
  age: number;
  interest: string[];
  avatar: string;
  memberStartAt: string;
  memberEndAt: string;
  description: string;
}
