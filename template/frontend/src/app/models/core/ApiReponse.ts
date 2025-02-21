export interface ApiResponse<T> {
  data: {
    data: {
      totalItems: number;
      totalPages: number;
      data: T[];
    };
    success: boolean;
    message: string;
    errors: any[];
  };
  success: boolean;
  message: string;
  errors: any[];
}
