export async function getClientIp() {
  const response = await fetch("https://api.ipify.org?format=json");
  const json = await response.json();
  return json.ip;
}
