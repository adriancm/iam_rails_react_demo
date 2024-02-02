import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import metricService from "@src/app/lib/metricService";

export const GET = withApiAuthRequired(async function metrics(req) {
  try {
    const response = await metricService().list();
    const metrics = await response.json();

    return NextResponse.json(metrics, response);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
});
