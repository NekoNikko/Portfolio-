---
id: network-infrastructure-design
title: Network Infrastructure Design
status: published
projectStatus: COMPLETED
public: true
summary: Highly secure and optimized VLAN topology managed by pfSense firewalls, with QoS, multi-WAN load balancing, and failover.
technologies:
  - pfSense
  - VLAN
  - MikroTik
  - Cisco
  - QoS
  - Load Balancing
category: networking
---

# Network Infrastructure Design

**Status:** COMPLETED

## Overview

Design and deployment of a multi-VLAN network topology using smart managed switches and a custom pfSense security gateway. The topology created segregated networks for Administration, Student Labs, Guest Wi-Fi, and server systems.

## What I Built

- Segmented VLAN architecture isolating administration, labs, guest Wi-Fi, and servers.
- Custom pfSense security gateway with firewall rules per segment.
- Traffic Shaping / QoS for high-quality video calling and educational tools.
- Multi-WAN load balancing and automatic failover.

## Outcome

A secure, resilient campus network where each traffic class is isolated and prioritized, with redundant internet paths for uninterrupted operation.

## Technology

pfSense, VLAN, MikroTik, Cisco, QoS, load balancing, smart managed switches.