FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y libpq-dev curl gcc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["fastapi", "run", "app", "--port", "8000"]
