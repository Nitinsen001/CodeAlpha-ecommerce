#!/usr/bin/env bash

# Move into the Django project folder
cd ecommarce

# Install dependencies
pip3 install -r requirements.txt

# Collect static files
python3 manage.py collectstatic --noinput
