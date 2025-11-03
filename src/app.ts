import "dotenv/config";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const jar = new CookieJar();
const client = wrapper(
  axios.create({
    baseURL: "https://findbolig.nu",
    jar,
    withCredentials: true,
    headers: { Accept: "application/json" },
  })
);

await client.get("/"); // Initial GET — sets __Secure-SID cookie
const loginResponse = await client.post("/api/authentication/login", {
  email: process.env.FINDBOLIG_EMAIL!,
  password: process.env.FINDBOLIG_PASSWORD!,
});

if (loginResponse.status !== 200) {
  console.error("Login failed, response status:", loginResponse.status);
  process.exit(1);
}

// await logOffers(client);
// await logMessageThreads(client);
