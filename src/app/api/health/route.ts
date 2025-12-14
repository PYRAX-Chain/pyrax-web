import { NextResponse } from 'next/server';

export async function GET() {
  const health = {
    status: 'healthy',
    service: 'pyrax-web',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  };

  return NextResponse.json(health);
}
