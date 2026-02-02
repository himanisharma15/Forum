#!/bin/bash

# Community Forum App - Setup Script
# Run this script to install dependencies and start the app

echo "🚀 Setting up Community Forum App..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start development servers:"
echo "   npm run dev:all"
echo ""
echo "2. Open your browser to:"
echo "   http://localhost:5173"
echo ""
echo "3. Login with:"
echo "   Email: jane@example.com"
echo "   Password: password123"
echo ""
echo "For more information, see QUICKSTART.md and README.md"
