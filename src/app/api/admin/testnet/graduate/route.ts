import { NextResponse } from "next/server";

// Graduate current network and activate next one
// This is called when admin toggles the graduation switch
export async function POST(request: Request) {
  try {
    const { currentNetworkId, nextNetworkId, launchDate, sendNotification } = await request.json();

    // Calculate announcement date (7 days before launch)
    const launch = new Date(launchDate);
    const announcement = new Date(launch.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Update current network to graduated
    const graduateRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/admin/testnet/config`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        networkId: currentNetworkId,
        updates: {
          status: "graduated",
          graduationDate: new Date().toISOString(),
        },
      }),
    });

    // Update next network to upcoming (7 days notice period)
    const upcomingRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/admin/testnet/config`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        networkId: nextNetworkId,
        updates: {
          status: "upcoming",
          launchDate: launchDate,
          announcementDate: announcement.toISOString(),
        },
      }),
    });

    // Send email notification if requested
    if (sendNotification) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/admin/testnet/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "upgrade_announcement",
          currentNetwork: currentNetworkId,
          nextNetwork: nextNetworkId,
          launchDate: launchDate,
        }),
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Network upgrade scheduled. ${nextNetworkId} will launch on ${launchDate}`,
      announcementDate: announcement.toISOString(),
    });
  } catch (error) {
    console.error("Failed to graduate network:", error);
    return NextResponse.json({ error: "Failed to graduate network" }, { status: 500 });
  }
}
