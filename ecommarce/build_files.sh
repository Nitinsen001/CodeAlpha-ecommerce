#!/usr/bin/env bash

# Vercel runs this script from ecommarce/ directory automatically
# (src: "ecommarce/build_files.sh" means CWD = ecommarce/)

# Install Python dependencies
pip3 install -r requirements.txt --break-system-packages

# Collect static files into staticfiles_build/
python3 manage.py collectstatic --noinput --clear
