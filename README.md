# OCR Project

This application allows users to upload images and input text. The uploaded images are processed using OCR with Tesseract.js, and the extracted text is stored in MongoDB. The project is containerized using Docker and orchestrated with Docker Compose.



## Project Structure

- **ocr-frontend**: React application for the user interface.
- **ocr-backend**: Express server for handling API requests and OCR processing.
- **mongo**: MongoDB for storing image analysis results.

## Prerequisites

Make sure you have the following installed on your machine:

- Docker: [Download and Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Setup and Run

1. **Clone the repository:**

   ```sh
   git clone https://github.com/shijinmtl/ocr-task.git
   cd ocr-task


2. **Build and run the containers:**

   ```sh
   docker-compose up --build
    ```
    This command will build the Docker images for the frontend and backend, start the MongoDB service, and run everything together.

2. **Access the application:**

    Frontend: http://localhost:3000

    Backend: http://localhost:5001


## Backend Details
The backend is an Express server that handles image uploads, processes them using Tesseract.js for OCR, and stores the results in MongoDB.

Endpoints
POST /upload: Endpoint to upload an image and input text. The image is processed using OCR, and the extracted text is returned.


## Frontend Details
The frontend is a React application that allows users to upload images and input text. It communicates with the backend to process the images and display the extracted text.


## Docker Details

### Docker Compose

The `docker-compose.yml` file defines three services:

- **frontend**: React application running on port 3000.
- **backend**: Express server running on port 5001.
- **mongo**: MongoDB service running on port 27017.

### Volumes

- **mongo-data**: Docker volume for persisting MongoDB data.
- **uploads**: Volume for storing uploaded images.

## Troubleshooting

If you encounter any issues, please check the following:

- Ensure Docker and Docker Compose are installed and running.
- Check the Docker Compose logs for any errors:

  ```sh
  docker-compose logs
