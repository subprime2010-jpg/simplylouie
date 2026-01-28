#!/usr/bin/env python3
"""
LOUIE Autonomy CLI
Founder-grade monitoring, chaos testing, and system control.

Usage:
    python louie_autonomy.py --check          # Quick health check
    python louie_autonomy.py --monitor        # Continuous monitoring
    python louie_autonomy.py --chaos          # Run chaos mode
    python louie_autonomy.py --load [N]       # Load spike (N requests)
    python louie_autonomy.py --status         # Full status dump
    python louie_autonomy.py --kill MODULE    # Disable a module
    python louie_autonomy.py --enable MODULE  # Enable a module
"""

import argparse
import requests
import time
import random
import json
import sys
import os

# Configuration
BASE_URL = os.environ.get("LOUIE_API_URL", "http://localhost:3000")
TOKEN = os.environ.get("LOUIE_TOKEN", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiZmIwNzE3N2MtN2U5OC00YmQ3LWEzNjUtZDMyMzJlYjIzMDg5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzY5NTc4NzQ4LCJleHAiOjE3Njk2NjUxNDh9.MMN-bvnDpOI-trrZ8jrvrpn9tQUXLtQzsAV8h3u5jQc")

HEADERS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

ENDPOINTS = {
    "overview": "admin/overview",
    "environment": "admin/environment",
    "system_health": "admin/system-health",
    "financials": "admin/financials/summary",
    "stripe": "admin/stripe",
    "users": "admin/users",
    "community": "admin/community",
    "intelligence": "admin/intelligence",
    "doc_scanner": "admin/doc-scanner",
    "toggles": "admin/toggles",
    "killswitches": "admin/killswitches",
    "autonomy": "admin/autonomy"
}

MODULES = ["stripe", "intelligence", "scanner", "signups", "billing", "posting", "docs", "api"]


def log(msg, level="INFO"):
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    colors = {"INFO": "\033[0m", "OK": "\033[92m", "WARN": "\033[93m", "ERROR": "\033[91m", "CHAOS": "\033[95m"}
    color = colors.get(level, "\033[0m")
    print(f"{color}[{ts}] [{level}] {msg}\033[0m")


def fetch(endpoint, method="GET", data=None):
    url = f"{BASE_URL}/{endpoint}"
    try:
        if method == "GET":
            r = requests.get(url, headers=HEADERS, timeout=5)
        else:
            r = requests.post(url, headers=HEADERS, json=data, timeout=5)
        return r.status_code, r.json() if r.text else {}
    except requests.exceptions.ConnectionError:
        return 0, {"error": "Connection refused"}
    except Exception as e:
        return 0, {"error": str(e)}


def check():
    """Quick health check of all endpoints."""
    print("\n" + "=" * 50)
    print("  LOUIE SYSTEM CHECK")
    print("=" * 50 + "\n")

    all_ok = True
    results = []

    for name, endpoint in ENDPOINTS.items():
        status, data = fetch(endpoint)
        ok = status == 200 and data.get("success", False)
        results.append((name, status, ok))

        if ok:
            log(f"{name:20} OK", "OK")
        else:
            log(f"{name:20} FAILED (HTTP {status})", "ERROR")
            all_ok = False

    print("\n" + "-" * 50)

    # Get autonomy data for summary
    status, data = fetch("admin/autonomy")
    if status == 200 and data.get("success"):
        d = data["data"]
        health = d.get("systemHealth", {})
        overview = d.get("overview", {})

        print(f"\nSystem Status:  {health.get('status', 'unknown').upper()}")
        print(f"Uptime:         {health.get('uptime_formatted', 'N/A')}")
        print(f"Memory (Heap):  {health.get('memory', {}).get('heapUsed', 0) / 1024 / 1024:.1f} MB")
        print(f"Total Users:    {overview.get('users', {}).get('total', 0)}")
        print(f"Stripe:         {'OK' if overview.get('stripe_ok') else 'DOWN'}")
        print(f"Signups:        {'OK' if overview.get('signups_ok') else 'DOWN'}")
        print(f"Intelligence:   {'OK' if overview.get('intelligence_ok') else 'DOWN'}")

    print("\n" + "=" * 50)
    if all_ok:
        log("All systems operational.", "OK")
    else:
        log("Some systems are degraded.", "ERROR")
    print("=" * 50 + "\n")

    return 0 if all_ok else 1


def status():
    """Full status dump."""
    print("\n" + "=" * 60)
    print("  LOUIE FULL STATUS DUMP")
    print("=" * 60)

    for name, endpoint in ENDPOINTS.items():
        print(f"\n--- {name.upper()} ---")
        status_code, data = fetch(endpoint)
        if status_code == 200:
            print(json.dumps(data.get("data", data), indent=2))
        else:
            print(f"ERROR: HTTP {status_code}")
            print(json.dumps(data, indent=2))

    print("\n" + "=" * 60 + "\n")


def monitor(interval=5):
    """Continuous monitoring with diff detection."""
    print("\n" + "=" * 50)
    print("  LOUIE CONTINUOUS MONITOR")
    print("  Press Ctrl+C to stop")
    print("=" * 50 + "\n")

    last_status = {}
    last_payload = {}

    try:
        while True:
            log("--- HEARTBEAT ---")

            for name, endpoint in ENDPOINTS.items():
                status_code, data = fetch(endpoint)

                # Status change detection
                if name not in last_status or last_status[name] != status_code:
                    if status_code == 200:
                        log(f"{name}: Status changed to OK", "OK")
                    else:
                        log(f"{name}: Status changed to {status_code}", "ERROR")
                    last_status[name] = status_code

                # Payload diff detection (simplified)
                if status_code == 200 and data.get("success"):
                    payload_str = json.dumps(data.get("data", {}), sort_keys=True)
                    if name in last_payload and last_payload[name] != payload_str:
                        log(f"{name}: Payload changed", "WARN")
                    last_payload[name] = payload_str

            time.sleep(interval)

    except KeyboardInterrupt:
        print("\n\nMonitor stopped.")


def chaos(duration=60):
    """Chaos mode - random killswitch toggles."""
    print("\n" + "=" * 50)
    print("  LOUIE CHAOS MODE")
    print(f"  Duration: {duration} seconds")
    print("=" * 50 + "\n")

    end_time = time.time() + duration

    try:
        while time.time() < end_time:
            module = random.choice(MODULES)
            action = random.choice(["disable", "enable"])
            enabled = action == "enable"

            log(f"CHAOS: {action.upper()} {module}", "CHAOS")

            status_code, data = fetch("admin/killswitch", "POST", {
                "module": module,
                "enabled": enabled,
                "reason": "chaos-mode"
            })

            if status_code == 200:
                log(f"  -> Success", "OK")
            else:
                log(f"  -> Failed: {data}", "ERROR")

            time.sleep(random.uniform(1, 3))

    except KeyboardInterrupt:
        print("\n\nChaos stopped.")

    # Re-enable all modules
    print("\nRe-enabling all modules...")
    for module in MODULES:
        fetch("admin/killswitch", "POST", {"module": module, "enabled": True, "reason": "chaos-cleanup"})
    log("All modules re-enabled.", "OK")


def load_spike(count=100):
    """Generate load spike."""
    print("\n" + "=" * 50)
    print(f"  LOUIE LOAD SPIKE: {count} requests")
    print("=" * 50 + "\n")

    endpoints_list = list(ENDPOINTS.values())
    success = 0
    fail = 0
    start = time.time()

    for i in range(count):
        endpoint = random.choice(endpoints_list)
        status_code, _ = fetch(endpoint)

        if status_code == 200:
            success += 1
        else:
            fail += 1

        if (i + 1) % 50 == 0:
            print(f"  Progress: {i + 1}/{count}")

    elapsed = time.time() - start

    print("\n" + "-" * 50)
    print(f"Total Requests:  {count}")
    print(f"Success:         {success}")
    print(f"Failed:          {fail}")
    print(f"Duration:        {elapsed:.2f}s")
    print(f"Requests/sec:    {count / elapsed:.2f}")
    print("-" * 50 + "\n")


def kill_module(module):
    """Disable a module via killswitch."""
    log(f"Disabling module: {module}", "WARN")
    status_code, data = fetch("admin/killswitch", "POST", {
        "module": module,
        "enabled": False,
        "reason": "manual-cli"
    })
    if status_code == 200 and data.get("success"):
        log(f"Module '{module}' disabled.", "OK")
    else:
        log(f"Failed to disable '{module}': {data}", "ERROR")


def enable_module(module):
    """Enable a module via killswitch."""
    log(f"Enabling module: {module}", "OK")
    status_code, data = fetch("admin/killswitch", "POST", {
        "module": module,
        "enabled": True,
        "reason": "manual-cli"
    })
    if status_code == 200 and data.get("success"):
        log(f"Module '{module}' enabled.", "OK")
    else:
        log(f"Failed to enable '{module}': {data}", "ERROR")


def main():
    parser = argparse.ArgumentParser(
        description="LOUIE Autonomy CLI - Founder-grade system control",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python louie_autonomy.py --check
  python louie_autonomy.py --monitor
  python louie_autonomy.py --chaos
  python louie_autonomy.py --load 500
  python louie_autonomy.py --kill signups
  python louie_autonomy.py --enable signups
        """
    )

    parser.add_argument("--check", action="store_true", help="Quick health check")
    parser.add_argument("--status", action="store_true", help="Full status dump")
    parser.add_argument("--monitor", action="store_true", help="Continuous monitoring")
    parser.add_argument("--chaos", nargs="?", const=60, type=int, metavar="SECS", help="Chaos mode (default 60s)")
    parser.add_argument("--load", nargs="?", const=100, type=int, metavar="N", help="Load spike (default 100 requests)")
    parser.add_argument("--kill", metavar="MODULE", help="Disable a module")
    parser.add_argument("--enable", metavar="MODULE", help="Enable a module")

    args = parser.parse_args()

    if args.check:
        sys.exit(check())
    elif args.status:
        status()
    elif args.monitor:
        monitor()
    elif args.chaos is not None:
        chaos(args.chaos)
    elif args.load is not None:
        load_spike(args.load)
    elif args.kill:
        kill_module(args.kill)
    elif args.enable:
        enable_module(args.enable)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
