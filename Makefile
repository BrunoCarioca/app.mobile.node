include .env

.PHONY: up

up: 
	docker-compose up  --remove-orphans

.PHONY: down

down:
	docker-compose down