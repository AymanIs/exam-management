#!/bin/bash

# Local Development Script
echo "🚀 Starting Exam Management Application (Local Development)"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Start Backend
echo ""
echo "🔧 Starting Backend Server..."
cd backend
npm install
node server.js &
BACKEND_PID=$!
echo "✅ Backend Server started (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 3

# Start Frontend
echo ""
echo "🔧 Starting Frontend Application..."
cd ../frontend/exam-app
npm install
npm start &
FRONTEND_PID=$!
echo "✅ Frontend Server started (PID: $FRONTEND_PID)"

echo ""
echo "🎉 Application is running locally!"
echo "   Frontend: http://localhost:4200"
echo "   Backend API: http://localhost:3000/api/exams"
echo ""
echo "To stop the application, press Ctrl+C or run:"
echo "   kill $BACKEND_PID $FRONTEND_PID"

# Wait for user to stop
wait
