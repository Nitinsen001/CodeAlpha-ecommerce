"""
Vercel entry point for Django.
Wraps startup in try/except so we can see the REAL error
instead of a generic 500 crash screen.
"""

import os
import sys
import traceback
from pathlib import Path

# ── Add Django project root to sys.path ────────────────────────────────────
DJANGO_ROOT = Path(__file__).resolve().parent.parent / 'ecommarce'
sys.path.insert(0, str(DJANGO_ROOT))

os.environ['DJANGO_SETTINGS_MODULE'] = 'ecommarce.settings'

# ── Try to load Django — if it fails, return the traceback as plain text ───
try:
    from django.core.wsgi import get_wsgi_application
    app = get_wsgi_application()

except Exception:
    error_text = traceback.format_exc()
    sys_info = (
        f"Python: {sys.version}\n"
        f"sys.path: {sys.path}\n"
        f"DJANGO_ROOT exists: {DJANGO_ROOT.exists()}\n"
        f"DJANGO_ROOT contents: {list(DJANGO_ROOT.iterdir()) if DJANGO_ROOT.exists() else 'N/A'}\n\n"
        f"--- TRACEBACK ---\n{error_text}"
    )

    def app(environ, start_response):
        start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
        return [sys_info.encode()]
