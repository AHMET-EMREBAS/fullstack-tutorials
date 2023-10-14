#!/usr/bin/env bash

openssl genrsa -out out/key.pem
openssl req -new -key out/key.pem -out out/csr.pem
openssl x509 -req -days 365 -in out/csr.pem -signkey out/key.pem -out out/cert.pem
