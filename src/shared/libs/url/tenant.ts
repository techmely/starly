export function composeTenantUrl(tenant: string, protocol: string, host: string) {
  if (host.startsWith(tenant)) {
    return `${protocol}//${host}`;
  }
  return `${protocol}//${tenant ? `${tenant}.` : ""}${host}`;
}
