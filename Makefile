file_structure:
	touch .gitignore Makefile README.md README.ru.md
	mkdir -p _Backend _Bot _Frontend __contracts data logs shared tmp
	touch _Backend/.keep _Bot/.keep _Frontend/.keep data/.keep logs/.keep shared/.keep tmp/.keep
	git add **/.keep -f
