# ---------- builder ----------
FROM golang:1.24.5-alpine AS builder
# git is useful for fetching modules that use VCS
RUN apk add --no-cache git

WORKDIR /src

# Copy only module files first to leverage Docker cache
COPY server/go.mod server/go.sum ./
RUN go mod download

# Copy rest of server code
COPY server/ ./server/

# Build the binary. Adjust if your main package path differs.
WORKDIR /src/server
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/server .

# ---------- runtime ----------
FROM alpine:3.18
RUN apk add --no-cache ca-certificates

WORKDIR /app
COPY --from=builder /app/server /app/server

# Document the port (optional)
EXPOSE 8080

# default PORT env for local testing (Render will override)
ENV PORT=8080

# Run as non-root is a good practice (optional)
# RUN addgroup -S app && adduser -S -G app app
# USER app

ENTRYPOINT ["/app/server"]
