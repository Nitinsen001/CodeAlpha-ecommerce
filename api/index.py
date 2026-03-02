"""
Vercel Serverless Function entry point for Django.
This file lives at the git root in api/index.py.
@vercel/python finds requirements.txt at the git root automatically.
"""

import sys
import os
from pathlib import Path

# ── Add Django project root to sys.path so 'ecommarce' package is importable ──
DJANGO_PROJECT_ROOT = Path(__file__).resolve().parent.parent / 'ecommarce'
sys.path.insert(0, str(DJANGO_PROJECT_ROOT))

# Set Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'ecommarce.settings'

# ── Get WSGI application ────────────────────────────────────────────────────
from django.core.wsgi import get_wsgi_application
app = get_wsgi_application()
