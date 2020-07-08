export const actionTypes = {
  RELOAD_PM2: "RELOAD_PM2",
  RELOAD_PM2_SUCCEEDED: "RELOAD_PM2_SUCCEEDED",
};

export function reloadPm2(name: string) {
  return {
    type: actionTypes.RELOAD_PM2,
    name,
  };
}

export function reloadPm2Success(data: any) {
  return {
    type: actionTypes.RELOAD_PM2_SUCCEEDED,
    data,
  };
}
