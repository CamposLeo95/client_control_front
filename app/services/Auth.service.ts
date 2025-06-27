export class AuthService{

async login(login: string, password: string) {
  try {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    
    const data = await res.json();

    return {
      ok: true,
      token: data.token,
      userid: data.user_id,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Login inválido",
    };
  }
}
}