import { NextRequest, NextResponse } from "next/server";

// Desktop app update check endpoint
// Returns the latest version info for the PYRAX Network Hub desktop application
export async function GET(request: NextRequest) {
  // Current latest version - update this when releasing new versions
  const latestVersion = {
    version: "1.0.0",
    url: "https://github.com/PYRAX-Chain/pyrax-releases/releases/download/desktop-v1.0.0/PYRAX-Network-Hub-1.0.0-x64-setup.exe",
    changelog: "Initial release of PYRAX Network Hub v1.0.0",
    releaseDate: "2025-12-20",
    minVersion: "1.0.0", // Minimum required version (for forced updates)
    critical: false, // Set to true for critical security updates
  };

  return NextResponse.json(latestVersion, {
    headers: {
      "Cache-Control": "public, max-age=300", // Cache for 5 minutes
    },
  });
}
