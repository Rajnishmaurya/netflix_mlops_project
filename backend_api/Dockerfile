# backend_api/Dockerfile
# Use a Conda base image
FROM condaforge/miniforge3:latest

# Set the working directory in the container
WORKDIR /app

# Copy the environment file and create the conda environment
COPY environment.yml ./
RUN conda env create -f environment.yml

# Copy the rest of the application code
COPY ./app /app/app

# Ensure the Conda environment is activated for subsequent commands
# Use ENTRYPOINT to activate the environment and then run the CMD within it
ENTRYPOINT ["conda", "run", "--no-capture-output", "-n", "netflix-backend-env"]

# Command to run the application using uvicorn
# This command will be executed within the activated environment by ENTRYPOINT
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]

# Expose the port the app runs on
EXPOSE 80