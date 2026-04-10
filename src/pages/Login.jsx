import {useState} from "react";

export default function Login() {
    const [form, setForm] = useState({
        username: "", password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState({
        type: "", message: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({
            type: "loading", message: "로그인 중..."
        })

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST", headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    username: form.username, password: form.password
                })
            })

            const data = await res.json()

            if (data.login_success) {
                setStatus({
                    type: "success", message: "로그인 성공!"
                })
                window.location.replace(window.location.origin + data.address)
            } else {
                setForm((prev) => ({
                    ...prev, password: ""
                }))
                setStatus({
                    type: "error", message: "아이디 또는 비밀번호를 확인해주세요."
                })
            }
        } catch {
            setStatus({
                type: "error", message: "아이디 또는 비밀번호를 확인해주세요."
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (<main
        className="min-h-screen bg-gradient-to-b from-slate-200 to-white px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
            <section
                className="w-full overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur px-8 py-8">

                {/* 로고 */}
                <div className="flex items-center gap-2 mb-7">
                    <div className="w-7 h-7 bg-slate-950 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">N</span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">NAMZSTER</span>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* 아이디 */}
                    <div className="space-y-1.5">
                        <label htmlFor="username" className="text-sm font-medium text-slate-700">
                            아이디
                        </label>
                        <div className="relative">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2"
                            >
                                <circle cx="12" cy="8" r="4"/>
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                            </svg>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                value={form.username}
                                onChange={handleChange}
                                disabled={isLoading}
                                placeholder="아이디를 입력하세요"
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                            />
                        </div>
                    </div>

                    {/* 비밀번호 */}
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-slate-700">
                            비밀번호
                        </label>
                        <div className="relative">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={form.password}
                                onChange={handleChange}
                                disabled={isLoading}
                                placeholder="비밀번호를 입력하세요"
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                            />
                        </div>
                    </div>

                    {/* 로그인 버튼 */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex h-11 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400">
                        {isLoading ? "로그인 중..." : "로그인"}
                    </button>
                </form>

                {/* 에러/성공 메시지 */}
                {status.message && (
                    <div
                        className={[
                            "mt-4 rounded-xl px-4 py-3 text-sm",
                            status.type === "error" && "border border-red-200 bg-red-50 text-red-700",
                            status.type === "success" && "border border-emerald-200 bg-emerald-50 text-emerald-700",
                            status.type === "loading" && "border border-slate-200 bg-slate-50 text-slate-600",
                        ]
                            .filter(Boolean)
                            .join(" ")}>
                        {status.message}
                    </div>
                )}
            </section>
        </div>
    </main>)
}