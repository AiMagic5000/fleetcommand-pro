import { createServerClient } from "./supabase"

/**
 * Multi-tenant resolution
 *
 * Each trucking company is a "tenant" in the tenants table.
 * They can have:
 *   - A subdomain: dlw.getfleetcommand.com
 *   - A custom domain: app.derricktransport.com (CNAME to getfleetcommand.com)
 *   - Direct access: getfleetcommand.com/t/dlw-estate
 *
 * The tenant row stores: company_id, slug, custom_domain, brand colors, logo URL, etc.
 * All fleet data queries are scoped to the tenant's company_id.
 */

const TENANT_CACHE = new Map()
const CACHE_TTL = 300000 // 5 minutes

export async function resolveTenant(hostname) {
  // Check cache first
  const cached = TENANT_CACHE.get(hostname)
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.tenant
  }

  const supabase = createServerClient()

  // Try custom domain match
  const { data: byDomain } = await supabase
    .from("tenants")
    .select("*")
    .eq("custom_domain", hostname)
    .eq("status", "active")
    .single()

  if (byDomain) {
    TENANT_CACHE.set(hostname, { tenant: byDomain, ts: Date.now() })
    return byDomain
  }

  // Try subdomain match (e.g., dlw.getfleetcommand.com)
  const subdomain = hostname.split(".")[0]
  if (subdomain && subdomain !== "www" && subdomain !== "getfleetcommand") {
    const { data: bySub } = await supabase
      .from("tenants")
      .select("*")
      .eq("slug", subdomain)
      .eq("status", "active")
      .single()

    if (bySub) {
      TENANT_CACHE.set(hostname, { tenant: bySub, ts: Date.now() })
      return bySub
    }
  }

  return null
}

export async function getTenantBySlug(slug) {
  const supabase = createServerClient()
  const { data } = await supabase
    .from("tenants")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .single()

  return data
}

export async function getTenantByCompanyId(companyId) {
  const supabase = createServerClient()
  const { data } = await supabase
    .from("tenants")
    .select("*")
    .eq("company_id", companyId)
    .eq("status", "active")
    .single()

  return data
}
