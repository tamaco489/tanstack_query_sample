import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Response from mock API',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    message: 'Received POST request',
    receivedData: body,
    timestamp: new Date().toISOString(),
  });
};
