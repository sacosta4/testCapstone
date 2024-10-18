curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"code": "print(\"hello world\")"}' \
     http://localhost:5000/quantum