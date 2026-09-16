#!/bin/bash
set -e

# ==============================================================================
# Automated VPS Deployment Script for JJSOFT GLOBAL
# Run directly on your Linux VPS: bash scripts/deploy-vps.sh
# ==============================================================================

echo "========================================================="
echo "   JJSOFT GLOBAL — VPS Production Deployment Engine      "
echo "========================================================="

# 1. Check for .env file or create default with custom port 4985
if [ ! -f .env ]; then
  echo "⚠️  No .env file found. Creating from .env.example with port 4985..."
  cp .env.example .env
fi

# 2. Pull latest git commits
echo "📥 Fetching latest commits from git..."
git fetch origin
git reset --hard origin/main

# 3. Build standalone Docker container
echo "📦 Building optimized production Docker image..."
docker compose build --pull

# 4. Zero-downtime container launch on port 4985
echo "🚀 Launching container on loopback port 4985..."
docker compose up -d --remove-orphans

# 5. Health Check
echo "🩺 Performing container health check..."
sleep 5
if docker compose ps | grep -q "(healthy)"; then
  echo "✅ Health check PASSED! Container is healthy."
else
  echo "ℹ️  Container status:"
  docker compose ps
fi

# 6. Cleanup dangling Docker images to preserve VPS disk space
echo "🧹 Pruning old unused Docker layers..."
docker image prune -f

echo "========================================================="
echo "🎉 DEPLOYMENT COMPLETE! App is running on 127.0.0.1:4985 "
echo "========================================================="
