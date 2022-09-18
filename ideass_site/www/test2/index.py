from __future__ import unicode_literals
import frappe


no_cache = 1
sitemap = 0


def get_context(context):
	context.build_version = "0.0.0.3"
