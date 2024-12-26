##############################################
# COMMON
##############################################

up:
	docker-compose --file docker/docker-compose.yml up -d

shell:
	docker-compose --file docker/docker-compose.yml exec app bash

down:
	docker-compose --file docker/docker-compose.yml down

status:
	docker-compose --file docker/docker-compose.yml ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"

##############################################
# BACKEND
##############################################

backend_shell:
	docker-compose --file docker/docker-compose.yml exec --workdir /app/_Backend app bash

backend_update_yarn:
	docker-compose --file docker/docker-compose.yml exec --workdir /app/_Backend app yarn set version berry

backend_install_vite:
	docker-compose --file docker/docker-compose.yml exec --workdir /app/_Backend app yarn add -D vite 

backend_install_1:
	docker-compose --file docker/docker-compose.yml exec --workdir /app/_Backend app yarn add express cors cookie-parser @types/node

backend_install_2:
	docker-compose --file docker/docker-compose.yml exec --workdir /app/_Backend app yarn add -D @types/node

backend_vite_build:
	docker-compose --file docker/docker-compose.yml exec --workdir /app/_Backend app yarn vite build

backend_build:
	docker-compose --file docker/docker-compose.yml exec --workdir /app/_Backend app yarn build

##############################################
# FRONTEND
##############################################

frontend_shell:
	docker-compose --file docker/docker-compose.yml exec --workdir /app/_Frontend app bash

##############################################
# FREAMEWORK STRUCTURE
##############################################

file_structure: ## Create file structure
	touch .gitignore Makefile README.md README.ru.md
	mkdir -p _Backend _Bot _Frontend __contracts data logs shared tmp
	touch __contracts/.keep _Backend/.keep _Bot/.keep _Frontend/.keep data/.keep logs/.keep shared/.keep tmp/.keep
	git add **/**/.keep -f

backend_file_structure:
	mkdir -p _Backend/src/framework/utils
	mkdir -p _Backend/src/framework/types
	mkdir -p _Backend/src/framework/migration
	mkdir -p _Backend/src/framework/models
	mkdir -p _Backend/src/framework/sanitizers
	mkdir -p _Backend/src/framework/validators
	mkdir -p _Backend/src/framework/storage
	mkdir -p _Backend/src/framework/controllers
	mkdir -p _Backend/src/framework/constants

	touch _Backend/src/framework/utils/usersUtils.ts
	touch _Backend/src/framework/utils/dateUtils.ts
	touch _Backend/src/framework/types/userTypes.ts
	touch _Backend/src/framework/types/commonTypes.ts
	touch _Backend/src/framework/migration/.keep
	touch _Backend/src/framework/models/userModel.ts
	touch _Backend/src/framework/sanitizers/userSanitizer.ts
	touch _Backend/src/framework/sanitizers/commonSanitizer.ts
	touch _Backend/src/framework/validators/userValidator.ts
	touch _Backend/src/framework/validators/commonValidator.ts
	touch _Backend/src/framework/storage/userStorage.ts
	touch _Backend/src/framework/storage/fileStorage.ts
	touch _Backend/src/framework/controllers/usersController.ts
	touch _Backend/src/framework/controllers/loginController.ts
	touch _Backend/src/framework/constants/userConstants.ts
	touch _Backend/src/framework/constants/commonConstants.ts
	git add **/**/.keep -f