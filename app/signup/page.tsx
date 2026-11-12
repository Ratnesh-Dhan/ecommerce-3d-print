"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  // register now accepts (email, password, username?)
  const { setUser } = useAuth();

  const [username, setUsername] = useState(""); // ← new state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation
    if (!username || !email || !password.trim() || !confirmPwd.trim()) {
      setError("All fields are required.");
      return;
    }
    console.log("before password check");
    if (password !== confirmPwd) {
      setError("Passwords do not match.");
      console.log("Password didnt matched");
      return;
    }
    const response = await fetch("/api/auth/registerAPI", {
      method: "POST",
      body: JSON.stringify({
        name: username,
        email: email,
        password: password.trim(),
      }),
    });
    const data = await response.json();
    console.log(data.data.user);
    setUser(data.data.user);
    router.push("/");
  };
  return (
    <section className="flex items-center justify-center min-h-screen bg-black/80">
      <div className="bg-zinc-900/90 backdrop-blur-sm p-8 rounded-xl border border-yellow-500/20 shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
          Sign Up
        </h1>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-xs text-gray-400 font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-800 border border-yellow-500/30 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-yellow-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-gray-400 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border border-yellow-500/30 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-yellow-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-gray-400 font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-800 border border-yellow-500/30 rounded-xl py-2 px-4 pr-10 text-white focus:outline-none focus:border-yellow-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs text-gray-400 font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              className="w-full bg-zinc-800 border border-yellow-500/30 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-yellow-500 transition"
            />
          </div>

          {/* Privacy & Safety Note */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-zinc-800/50 border border-yellow-500/10 text-xs text-gray-400">
            <ShieldCheck size={18} className="text-yellow-500 shrink-0" />
            <div>
              <span className="text-gray-300 font-medium">
                Your privacy matters.
              </span>{" "}
              This website is safe, secure, and your data is protected. Accounts
              inactive for 2 years are deleted automatically.
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="mb-2 text-center text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
  // return (
  //   <section className="flex items-center justify-center min-h-screen bg-black/80">
  //     <div className="bg-zinc-900/90 backdrop-blur-sm p-8 rounded-xl border border-yellow-500/20 shadow-lg w-full max-w-md">
  //       <h1 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
  //         Sign Up
  //       </h1>

  //       <form onSubmit={handleRegister} className="space-y-5">
  //         {/* Username */}
  //         <div>
  //           <label className="block text-xs text-gray-400 font-semibold mb-1">
  //             Username
  //           </label>
  //           <input
  //             type="text"
  //             required
  //             value={username}
  //             onChange={(e) => setUsername(e.target.value)}
  //             className="w-full bg-zinc-800 border border-yellow-500/30 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-yellow-500 transition"
  //           />
  //         </div>

  //         {/* Email */}
  //         <div>
  //           <label className="block text-xs text-gray-400 font-semibold mb-1">
  //             Email
  //           </label>
  //           <input
  //             type="email"
  //             required
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             className="w-full bg-zinc-800 border border-yellow-500/30 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-yellow-500 transition"
  //           />
  //         </div>

  //         {/* Password */}
  //         <div>
  //           <label className="block text-xs text-gray-400 font-semibold mb-1">
  //             Password
  //           </label>
  //           <div className="relative">
  //             <input
  //               type={showPwd ? "text" : "password"}
  //               required
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               className="w-full bg-zinc-800 border border-yellow-500/30 rounded-xl py-2 px-4 pr-10 text-white focus:outline-none focus:border-yellow-500 transition"
  //             />
  //             <button
  //               type="button"
  //               onClick={() => setShowPwd(!showPwd)}
  //               className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
  //               aria-label={showPwd ? "Hide password" : "Show password"}
  //             >
  //               {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
  //             </button>
  //           </div>
  //         </div>

  //         {/* Confirm Password */}
  //         <div>
  //           <label className="block text-xs text-gray-400 font-semibold mb-1">
  //             Confirm Password
  //           </label>
  //           <input
  //             type="password"
  //             required
  //             value={confirmPwd}
  //             onChange={(e) => setConfirmPwd(e.target.value)}
  //             className="w-full bg-zinc-800 border border-yellow-500/30 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-yellow-500 transition"
  //           />
  //         </div>

  //         {/* Error message */}
  //         {error && (
  //           <p className="mb-2 text-center text-sm text-red-400">{error}</p>
  //         )}

  //         <button
  //           type="submit"
  //           className="w-full bg-yellow-500 text-black py-2 rounded-xl font-bold hover:bg-yellow-400 transition"
  //         >
  //           Register
  //         </button>

  //         <p className="mt-4 text-center text-sm text-gray-400">
  //           Already have an account?{" "}
  //           <Link href="/login" className="text-yellow-500 hover:underline">
  //             Log in
  //           </Link>
  //         </p>
  //       </form>
  //     </div>
  //   </section>
  // );
}
