---
id: proxmox-home-lab
title: Proxmox VE Home Lab
status: published
projectStatus: COMPLETED
currentPhase: Completed
public: true
summary: Highly redundant virtualization platform for sandboxing educational and IT tools, with encrypted Proxmox Backup Server storage.
technologies:
  - Proxmox VE
  - PBS
  - Ceph Storage
  - Linux Containers
  - OpenVSwitch
category: virtualization
---

# Proxmox VE Home Lab

**Status:** COMPLETED

## Overview

A home virtualization cluster deployed on Proxmox VE, hosting sandboxed networks, specialized firewalls, and lightweight Linux containers.

## What I Built

- Proxmox VE virtualization cluster for lab and production experiments.
- Sandboxed virtual networks with isolated firewalls.
- Lightweight Linux container workloads.
- Standardized backups linked to local NAS storage using Proxmox Backup Server (PBS).
- Efficient global block deduplication and end-to-end encryption on backups.

## Outcome

A redundant home-lab platform used to safely experiment with tools before they touch production systems — including the SIEM lab and network designs. Migration and backup strategy documented in the journal article "Transitioning to Virtualization: Proxmox VE + PBS."

## Technology

Proxmox VE, Proxmox Backup Server, Ceph storage, Linux containers, Open vSwitch.