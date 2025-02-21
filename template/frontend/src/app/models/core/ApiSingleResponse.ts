export interface ApiSingleResponse<T> {
    data: {
      data: T;
      success: boolean;
      message: string;
      errors: any[];
    };
    success: boolean;
    message: string;
    errors: any[];
  }
  

