export const actionTypes = {
  FAILED: "FAILED",
};

export function Failed(error: any) {
  console.log("---error---", error);
  return {
    type: actionTypes.FAILED,
    error,
  };
}
