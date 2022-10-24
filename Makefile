.POSIX:
SHELL := /bin/bash
PNPM :=  $(shell which pnpm)
BIN_NAME := sirius-web
# Build the application
.PHONY: build
build: install
	@echo -e "\033[32mBuilding the application...\033[0m"
	$(PNPM) run build
	@echo -e "\033[32mBuild finished.\033[0m"
# Build docker image
docker:
	docker build -f ./build/docker/Dockerfile -t impossible98/$(BIN_NAME) .
# Install dependencies
install:
	@echo -e "\033[32mInstalling dependencies...\033[0m"
	${PNPM} install
	@echo -e "\033[32mDependencies installed.\033[0m"
