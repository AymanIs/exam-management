#!/bin/bash

# Exam Management Application Deployment Script

echo "🚀 Exam Management Application Deployment"
echo "========================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Check if ports are available
if lsof -Pi :80 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 80 is already in use. The application might not start properly."
    echo "   You can stop the service using port 80 or modify docker-compose.yml"
fi

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 3000 is already in use. The application might not start properly."
    echo "   You can stop the service using port 3000 or modify docker-compose.yml"
fi

echo ""
echo "🔧 Starting the application..."
echo "   This may take a few minutes on first run (downloading images and building)"
echo ""

# Try to run with docker compose (newer syntax)
if docker compose version &> /dev/null; then
    echo "Using 'docker compose' command..."
    docker compose up --build
else
    echo "Using 'docker-compose' command..."
    docker-compose up --build
fi

echo ""
echo "🎉 Application should now be running!"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost:3000/api/exams"
echo ""
echo "To stop the application, press Ctrl+C or run:"
echo "   docker compose down"
