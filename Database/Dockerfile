# Use an official Python image as a base
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt .

# Install necessary Python dependencies
RUN pip install -r requirements.txt

# Copy the setup script to the container
COPY db-setup.py .

# Run the database setup script
CMD ["python", "db-setup.py"]
