---
id: journal-2026-03-08
date: 2026-03-08
project: Cloudflare Tunnel + MeshCentral
category: networking
public: true
status: published
title: "Secure Remotes: Exposing Enterprise Portals with Cloudflare Tunnels"
summary: Bypass firewall limits and port-forwarding constraints safely while securing remote asset management portals behind multi-factor authentication.
technologies:
  - Cloudflare Tunnels
  - MeshCentral
  - MFA
  - Reverse Proxy
---

# Secure Remotes: Exposing Enterprise Portals with Cloudflare Tunnels

**Category:** Networking · **6 min read**

Exposing school administration and remote asset monitoring consoles (like MeshCentral) normally involves dangerous port forwarding and DNS tracking. Cloudflare Tunnels provide an elegant, secure alternative.

## What I covered

- Deploying the lightweight `cloudflared` daemon locally to open a secure outbound connection to Cloudflare's edge.
- Configuring the tunnel configuration file.
- Securing backend SSL and mapping internal addresses.
- Enforcing Cloudflare Access policies so only verified domains reach the remote console login screen.

## Why it matters

A tunnel removes the inbound-attack surface entirely: no open ports, no public IP exposure, and identity-gated access in front of the management plane. This is the same architecture pattern this portfolio will use for its own local deployment.

## Technology

Cloudflare Tunnels, MeshCentral, MFA, reverse proxy.