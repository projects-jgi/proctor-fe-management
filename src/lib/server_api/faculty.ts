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

export async function get_exam_type_questions({
  exam_type_id,
}: {
  exam_type_id: number;
}) {
  try {
    const response = await Request({
      url:
        process.env.BACKEND_HOST + `/api/exam/types/${exam_type_id}/questions`,
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

export async function create_exam(body: object) {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + "/api/exams",
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
      message: error.response?.data?.message || "Unable to create exam",
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
