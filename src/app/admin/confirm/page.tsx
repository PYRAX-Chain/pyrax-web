"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, CheckCircle, XCircle, Loader2, AlertTriangle } from "lucide-react";

export default function ConfirmAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "confirming" | "success" | "error">("loading");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      setError("No confirmation token provided");
      return;
    }

    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      const res = await fetch(`/api/admin/auth/confirm?token=${token}`);
      const data = await res.json();

      if (data.valid) {
        setStatus("valid");
        setEmail(data.email);
        setRole(data.role);
      } else if (data.alreadyConfirmed) {
        setStatus("success");
        setEmail(data.email || "");
      } else {
        setStatus("invalid");
        setError(data.error || "Invalid token");
      }
    } catch {
      setStatus("invalid");
      setError("Failed to validate token");
    }
  };

  const confirmAccount = async () => {
    setStatus("confirming");

    try {
      const res = await fetch("/api/admin/auth/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setEmail(data.email);
      } else if (data.alreadyConfirmed) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(data.error || "Confirmation failed");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-pyrax-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pyrax-orange/10 mb-4">
            <Shield className="h-8 w-8 text-pyrax-orange" />
          </div>
          <h1 className="text-2xl font-bold text-white">PYRAX Admin Portal</h1>
          <p className="text-gray-400 mt-2">Account Confirmation</p>
        </div>

        {/* Content Card */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          {/* Loading State */}
          {status === "loading" && (
            <div className="text-center py-8">
              <Loader2 className="h-12 w-12 text-pyrax-orange animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Validating your invitation...</p>
            </div>
          )}

          {/* Valid Token - Ready to Confirm */}
          {status === "valid" && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Confirm Your Account
              </h2>
              <p className="text-gray-400 mb-4">
                You&apos;ve been invited to join the PYRAX Admin Portal
              </p>

              <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 text-sm">Email</span>
                  <span className="text-white text-sm font-medium">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Role</span>
                  <span className="text-pyrax-orange text-sm font-medium">{role}</span>
                </div>
              </div>

              <button
                onClick={confirmAccount}
                className="w-full py-3 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-pyrax-dark font-semibold transition-colors"
              >
                ✅ Confirm My Account
              </button>

              <p className="text-xs text-gray-500 mt-4">
                By confirming, you agree to the PYRAX terms of service and admin responsibilities.
              </p>
            </div>
          )}

          {/* Confirming State */}
          {status === "confirming" && (
            <div className="text-center py-8">
              <Loader2 className="h-12 w-12 text-pyrax-orange animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Confirming your account...</p>
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Account Confirmed!
              </h2>
              <p className="text-gray-400 mb-6">
                Your admin account is now active. You can log in with your credentials.
              </p>

              {email && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                  <p className="text-green-400 text-sm">
                    <strong>Email:</strong> {email}
                  </p>
                </div>
              )}

              <button
                onClick={() => router.push("/admin/login")}
                className="w-full py-3 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-pyrax-dark font-semibold transition-colors"
              >
                🔐 Go to Login
              </button>
            </div>
          )}

          {/* Invalid Token State */}
          {status === "invalid" && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Invalid Invitation
              </h2>
              <p className="text-gray-400 mb-4">{error}</p>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <p className="text-red-400 text-sm">
                  This confirmation link may have expired or already been used.
                  Please contact an administrator for a new invitation.
                </p>
              </div>

              <button
                onClick={() => router.push("/admin/login")}
                className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 mb-4">
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Confirmation Failed
              </h2>
              <p className="text-gray-400 mb-4">{error}</p>

              <button
                onClick={() => setStatus("valid")}
                className="w-full py-3 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-pyrax-dark font-semibold transition-colors mb-3"
              >
                Try Again
              </button>

              <button
                onClick={() => router.push("/admin/login")}
                className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} PYRAX LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}
