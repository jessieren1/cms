export interface Student {
    createdAt: string;
    updatedAt: string;
    id: number;
    email: string;
    name: string;
    country: string;
    profileId: number;
    type: Type;
    courses: Course[];
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