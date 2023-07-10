#!/usr/bin/env sh

#остановить публикацию при ошибках
set -e

#сборка приложения
npm run build

#переход в каталог сборки
cd dist

#инициализация репозитория и загрузка кода на GitHub
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/annatul-dvp/vue2-project01-toshow.git  master:gh-pages

cd -