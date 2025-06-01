.PHONY: mock-get-request mock-post-request

mock-get-request:
	curl -sX GET http://localhost:3000/api/mock | jq .

mock-post-request:
	curl -sX POST -H "Content-Type: application/json" -d '{"name": "テスト", "value": 123}' http://localhost:3000/api/mock | jq .
