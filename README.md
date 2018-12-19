# node-api-mongo-jwt

for more: 
https://github.com/bhanushalimahesh3/node-rest-api-jwt


## For setting mongodb in server or droplet:
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04#prerequisites

### Note: at the place of creating new user as admin:
```
use admin
db.createUser(
  {
    user: "AdminSammy",
    pwd: "AdminSammy'sSecurePassword",
    roles: [ { role: "root", db: "admin" } ]
  }
)
```
