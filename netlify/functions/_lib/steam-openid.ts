export async function verifySteamOpenId(
  params: Record<string, string | undefined>
): Promise<string | null> {
  if (params['openid.mode'] !== 'id_res') {
    return null;
  }

  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value != null) {
      body.set(key, value);
    }
  }
  body.set('openid.mode', 'check_authentication');

  const response = await fetch('https://steamcommunity.com/openid/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const text = await response.text();
  if (!text.includes('is_valid:true')) {
    return null;
  }

  const claimedId = params['openid.claimed_id'];
  if (!claimedId) return null;

  return claimedId.split('/').pop() ?? null;
}
