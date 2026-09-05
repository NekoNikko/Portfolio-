---
id: windows-server-infrastructure
title: Windows Server Infrastructure
status: published
projectStatus: COMPLETED
public: true
summary: Enterprise-grade deployment of a Windows Server 2022 domain controller cluster with high availability, redundant DNS/DHCP, and granular GPO control.
technologies:
  - Windows Server 2022
  - Active Directory
  - DNS
  - DHCP
  - GPO
  - Hyper-V
category: infrastructure
---

# Windows Server Infrastructure

**Status:** COMPLETED

## Overview

A full-scale architecture design and installation of Windows Server 2022 Active Directory Domain Services (AD DS). The deployment clustered domain controllers for high availability, set up redundant DNS/DHCP servers, and created granular Group Policy Objects (GPOs) to control more than 500 endpoint machines.

## What I Built

- Clustered Domain Controllers for high-availability operation.
- Redundant DNS and DHCP infrastructure.
- Granular Group Policy Objects governing 500+ endpoints.
- Optimized secure authentication mechanisms.
- Automated credential rotational cycles.
- Centralized backup storage.

## Outcome

A hardened, centralized identity and server environment for the institution — one of several enterprise infrastructure projects I designed and maintained in production. Details of the design decisions are documented in the engineering journal (see "Hardening Active Directory").

## Technology

Windows Server 2022, Active Directory Domain Services, DNS, DHCP, Group Policy, Hyper-V.