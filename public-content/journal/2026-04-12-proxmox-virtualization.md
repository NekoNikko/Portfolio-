---
id: journal-2026-04-12
date: 2026-04-12
project: Proxmox VE Home Lab
category: virtualization
public: true
status: published
title: "Transitioning to Virtualization: Setting up Proxmox VE + PBS for Redundancy"
summary: Step-by-step guide on consolidating legacy bare-metal school servers into Proxmox hypervisors backed by encrypted global deduplication.
technologies:
  - Proxmox VE
  - Proxmox Backup Server
  - LVM
  - pfSense
---

# Transitioning to Virtualization: Setting up Proxmox VE + PBS for Redundancy

**Category:** Virtualization · **10 min read**

Migrating bare-metal legacy systems to virtualized environments yields outstanding cost savings and uptime improvements.

## What I covered

- Migration of server workloads from bare metal to Proxmox VE.
- Optimal VM CPU type selection and thin-provisioned LVM setups.
- pfSense firewall integration to restrict inter-VM traffic.
- Linking the host cluster to Proxmox Backup Server (PBS).
- Global block deduplication reducing daily backup sizes to a fraction of baseline, with continuous filesystem integrity verification.

## Why it matters

Virtualization with proper backup architecture is how a small IT team keeps an institution running with minimal downtime and minimal hardware spend.

## Technology

Proxmox VE, Proxmox Backup Server, LVM, pfSense.