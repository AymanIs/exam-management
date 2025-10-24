# Exam Management Application

A modern web application for managing student exams, built with Angular and Node.js.

## Features

- **Exam Management**: View and organize student exams
- **Student Information**: Track student details and exam schedules
- **Status Tracking**: Monitor exam status (Scheduled, Confirmed, Cancelled, etc.)
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live data synchronization

## Technology Stack

- **Frontend**: Angular 20 with TypeScript
- **Backend**: Node.js with Express
- **Containerization**: Docker with Docker Compose
- **Database**: In-memory storage (easily replaceable with real database)

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Git (to clone the repository)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd exam-management
   ```

2. **Run the application:**
   ```bash
   docker compose up
   ```

3. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:3000/api/exams

## API Endpoints

- `GET /api/exams` - Retrieve all exams
- `POST /api/exams` - Create a new exam

## Data Model

```typescript
interface Exam {
  student: {
    first_name: string;
    last_name: string;
  };
  meeting_point: string;
  date: string;
  status: 'A organiser' | 'Annulé' | 'Recherche de place' | 'Confirmé';
}
```

## Development

### Local Development (without Docker)

```bash
# Backend
cd backend
npm install
node server.js

# Frontend (in another terminal)
cd frontend/exam-app
npm install
npm start
```

### Docker Commands

```bash
# Build and start all services
docker compose up --build

# Start in background
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs
```

## Project Structure

```
exam-management/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── dockerfile
│   ├── nginx.conf
│   └── exam-app/
│       ├── src/app/
│       │   ├── components/
│       │   ├── models/
│       │   ├── services/
│       │   └── app.routes.ts
│       └── package.json
├── docker-compose.yml
└── README.md
```

## Troubleshooting

### Docker Permission Issues

```bash
# Quick fix
sudo docker compose up

# Permanent fix
sudo usermod -aG docker $USER
# Then logout and login again
```

### Port Already in Use

```bash
# Check what's using the ports
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :3000
```

### Clean Build

```bash
# Clean everything and rebuild
docker compose down
docker system prune -f
docker compose up --build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.