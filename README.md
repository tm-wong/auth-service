###### ****************************************************************

######    _Auth Service - REST API_
######    _https://github.com/tm-wong/auth-service_
######    T. M. Wong
# 
###### ****************************************************************

## Installation
Clone du dépôt
```bash
git clone git@github.com:tm-wong/auth-service.git
```
Créer un utilisateur PostgreSQL 

```bash
psql -U superuser -d db_auth_service
CREATE ROLE authsce SUPERUSER LOGIN PASSWORD 'xxx';
```

Le modèle de la base de données est disponible dans le répertoire SQL (db_auth_service.sql) de ce dépôt, à noter évidemment, qu'il convient de remplacer les données placées en eéchantillon par de véritables données, le moment venu.



---

## 1 - Sécurité
Cette API d'authentification permet de récupérer un JSON Web Token en échange d'un nom d'utilisateur et d'un mot de passe, permettant l'accès à une application déchiffrant le token et vérifiant par là l'identité de l'utilisateur.

Pour l'utilisation de ce token, consulter la section 4 "Utilisation du token", un peu plus bas.

---

## 2 - Stack

Cette application est construite avec Fastify en node.js (v18.15.0) et PostgreSQL (v15.x)
- https://www.fastify.io
- https://www.postgresql.org

La base URL de cette application est la suivante :
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_https://limitless-savannah-34441-943d2c48f28e.herokuapp.com_

---

## 3 - Documentation de l'API
Une documentation des routes implémentées est consultable à partir de l'URL suivante :
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_https://limitless-savannah-34441-943d2c48f28e.herokuapp.com/api/doc_

Celle-ci liste chacune des routes avec des exemples d'utilisation.

---

## 4 - Error handling

La gestion d'erreurs est assez aisée à mettre en œuvre de façon limpide avec Fastify, puisque en plus d'un dispositif de _catchall_ situé dans le script principal, Fastify est packagé avec son interface de gestion d'erreurs dédiée et permettant d'émettre des erreurs HTTP de façon plutôt simple.

---

#### Les logs

L'application est pourvue d'un catchall pour les logs d'erreurs non catchées.

Il convient toutefois de prévoir de logger celles-ci à l'issue de l'exécution des méthodes les plus sujettes aux imprévus.

Les logs d'appel HTTP et autres sont configurés à l'emplacement `/var/log/auth-service/`.


---

## 5 - Utilisation du token
```sh
export TOKEN='eyJhbGc............'

curl -i \
-H "Authorization: Bearer $TOKEN" \
https://my-super-app.com/api/some/private/route

HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
Vary: Origin
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 1871
Date: Tue, 20 Jun 2023 17:35:28 GMT
Via: 1.1 vegur
```

---





.






