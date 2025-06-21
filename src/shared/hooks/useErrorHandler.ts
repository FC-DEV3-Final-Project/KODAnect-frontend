import { useNavigate } from "react-router-dom";

export function useErrorHandler() {
  const navigate = useNavigate();

  const handleError = (error: unknown) => {
    const err = error as { status?: number; message?: string };
    navigate("/error", {
      state: {
        error: {
          status: err.status || 500,
          message: err.message || "데이터를 불러오는 중 문제가 발생했습니다.",
        },
      },
    });
  };

  return handleError;
}
