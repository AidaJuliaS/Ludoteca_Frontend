export function validateFields<TData>(obj: Partial<TData>, validateFields: readonly string[]): obj is Required<TData> {
  
  return validateFields.every((field) => {
      const value = obj[field as keyof TData];
      
      return value !== null && value !== undefined;
    });
}