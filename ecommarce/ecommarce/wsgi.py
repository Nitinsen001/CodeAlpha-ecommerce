"""
WSGI config for ecommarce project (Vercel production).
"""

import os
import sys
from pathlib import Path

# ── Critical: Add the Django project root to sys.path ──────────────────────
# Vercel runs this file from ecommarce/ecommarce/ and sets that as sys.path.
# But Django needs ecommarce/ (the folder with manage.py) in sys.path so that
# 'import ecommarce' works (for settings, urls, models etc.)
BASE_DIR = Path(__file__).resolve().parent.parent  # = .../ecommarce/
sys.path.insert(0, str(BASE_DIR))
# ───────────────────────────────────────────────────────────────────────────

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommarce.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
