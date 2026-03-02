#!/usr/bin/env bash

# NOTE: Vercel runs this script from the ecommarce/ directory already
# So NO cd needed

# Install dependencies (--break-system-packages needed for Vercel's uv-managed Python)
pip3 install -r requirements.txt --break-system-packages

# Collect static files
python3 manage.py collectstatic --noinput
