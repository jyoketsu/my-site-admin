export const actionTypes = {
  FAILED: "FAILED",
};

export function Failed(error: any) {
  return {
    type: actionTypes.FAILED,
    error,
  };
}
