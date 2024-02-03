'use server'
import metricService from "@src/app/lib/metricService";

export const getAverageMetrics = async ({ timePeriod, page }) => {
  try {
    const response = await metricService.average({ query: { timePeriod }, page });
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to get average metrics: ${error.message}, status: ${error.status}`)
  }
};
