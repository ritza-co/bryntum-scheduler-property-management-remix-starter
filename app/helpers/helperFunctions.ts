export function dayDiff(startDate: string, endDate: string) {
  const difference =
    new Date(endDate).getTime() - new Date(startDate).getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
}
