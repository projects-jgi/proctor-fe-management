"use server";

import Request from "@/utils/Request";

export async function get_exam_results({ exam_id }: { exam_id: number }) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/faculty/exams/${exam_id}/results`,
      isAuthorized: true,
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unknown error occurred",
    };
  }
}

export async function get_all_exams() {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/faculty/exams`,
      isAuthorized: true,
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to fetch exams",
    };
  }
}

export async function get_exam_violations({ exam_id }: { exam_id: number }) {
  try {
    const response = await Request({
      url:
        process.env.BACKEND_HOST + `/api/faculty/exams/${exam_id}/violations`,
      isAuthorized: true,
    });
    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message || "Unable to fetch exam violations",
    };
  }
}

export async function get_exam_types() {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/faculty/exam-types`,
      isAuthorized: true,
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to fetch exam types",
    };
  }
}

export async function create_exam_type({
  name,
  description,
  is_private,
}: {
  name: string;
  description?: string | undefined;
  is_private?: boolean | undefined;
}) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/faculty/exam-types`,
      method: "POST",
      isAuthorized: true,
      body: {
        name,
        description,
        is_private,
      },
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to create exam type",
    };
  }
}

export async function update_exam_type(id: number, data: object) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/faculty/exam-types/${id}`,
      method: "POST",
      isAuthorized: true,
      body: data,
    });

    return {
      status: true,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to update exam type",
    };
  }
}

export async function delete_exam_type({
  exam_type_id,
}: {
  exam_type_id: number;
}) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/faculty/exam-types/${exam_type_id}`,
      method: "DELETE",
      isAuthorized: true,
    });

    return {
      status: true,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to delete exam type",
    };
  }
}

export async function get_exam_type_questions({
  exam_type_id,
}: {
  exam_type_id: number;
}) {
  try {
    const response = await Request({
      url:
        process.env.BACKEND_HOST + `/api/exams/types/${exam_type_id}/questions`,
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message || "Unable to fetch exam type questions",
    };
  }
}

export async function save_exam({ id, body }: { id?: number; body: object }) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/exams/${id ? id : ""}`,
      method: "POST",
      isAuthorized: true,
      body: body,
    });

    return {
      status: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to create exam",
    };
  }
}

export async function delete_exam(exam_id: number) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/exams/${exam_id}`,
      method: "DELETE",
      isAuthorized: true,
    });

    return {
      status: true,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to delete exam",
    };
  }
}

export async function create_exam_type_mapping(exam_id: number, body: object) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/exams/${exam_id}/mappings`,
      method: "POST",
      isAuthorized: true,
      body: body,
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message || "Unable to create exam type mapping",
    };
  }
}

export async function upload_exam_questions(exam_type_id: number, file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await Request({
      url:
        process.env.BACKEND_HOST +
        `/api/exams/types/${exam_type_id}/questions/upload`,
      method: "POST",
      isAuthorized: true,
      body: formData,
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message || "Unable to upload exam questions",
    };
  }
}

export async function create_exam_question({
  exam_type_id,
  body,
}: {
  exam_type_id: number;
  body: object;
}) {
  try {
    const response = await Request({
      url:
        process.env.BACKEND_HOST + `/api/exams/types/${exam_type_id}/questions`,
      method: "POST",
      isAuthorized: true,
      body: body,
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message || "Unable to create exam question",
    };
  }
}

export async function get_exam_details({ exam_id }: { exam_id: number }) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/exams/${exam_id}`,
      isAuthorized: true,
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to fetch exam details",
    };
  }
}

export async function publish_exam(exam_id: number) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/exams/${exam_id}/publish`,
      method: "POST",
      isAuthorized: true,
    });

    return {
      status: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to publish exam",
    };
  }
}

export async function unpublish_exam(exam_id: number) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/exams/${exam_id}/unpublish`,
      method: "POST",
      isAuthorized: true,
    });

    return {
      status: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to unpublish exam",
    };
  }
}

export async function get_department_students() {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/faculty/students`,
      isAuthorized: true,
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to fetch students",
    };
  }
}

export async function upload_department_students(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/faculty/students/upload`,
      isAuthorized: true,
      method: "POST",
      body: formData,
    });

    return {
      status: true,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to upload students",
    };
  }
}

export async function map_students_to_exam({
  exam_id,
  student_mappings,
}: {
  exam_id: number;
  student_mappings: object;
}) {
  const data = {
    mappings: student_mappings,
  };
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/faculty/exams/${exam_id}/students`,
      method: "POST",
      isAuthorized: true,
      body: data,
    });

    return {
      status: true,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message || "Unable to map students to exam",
    };
  }
}

export async function get_mapped_students_for_exam({
  exam_id,
}: {
  exam_id: number;
}) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/faculty/exams/${exam_id}/students`,
      isAuthorized: true,
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message ||
        "Unable to fetch mapped students for exam",
    };
  }
}

export async function delete_student({
  student_ids,
}: {
  student_ids: number[];
}) {
  const data = {
    student_ids: student_ids,
  };
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/faculty/students`,
      method: "DELETE",
      isAuthorized: true,
      body: data,
    });

    return {
      status: true,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to delete student",
    };
  }
}

export async function get_question(question_id: number) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/questions/${question_id}`,
      isAuthorized: true,
    });

    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to fetch question",
    };
  }
}

export async function update_question({
  question_id,
  body,
}: {
  question_id: number;
  body: object;
}) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + `/api/questions/${question_id}`,
      method: "POST",
      isAuthorized: true,
      body: body,
    });

    return {
      status: true,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Unable to update question",
    };
  }
}
