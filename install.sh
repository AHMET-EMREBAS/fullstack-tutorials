#!/usr/bin/env sh

# Install required packages

# NX Plugins to generate projects
pnpm add -D @nx/angular
pnpm add -D @nx/nest
pnpm add -D @nx/js
pnpm add -D @nx/plugin
pnpm add -D nx-electron
pnpm add -D @nativescript/nx

# Backend libraries

# Validation and tranfromation libraries
pnpm add class-validator
pnpm add class-transformer

# Database ORM
pnpm add typeorm

# Database Driver
pnpm add mysql2
pnpm add better-sqlite3
pnpm add pg
pnpm add @nestjs/typeorm
pnpm add @nestjs/jwt
pnpm add @nestjs/config

# Open api documentation
pnpm add @nestjs/swagger

# UUID generator
pnpm add uuid

# Emails
pnpm add nodemailer
pnpm add -D @types/nodemailer

# ChatGTP
pnpm add openai

# Image editing tool
pnpm add -D sharp

# Frontend libraries
pnpm add @angular/material
pnpm add @angular/pwa

# App state management libraries
pnpm add @ngrx/store
pnpm add @ngrx/data
pnpm add @ngrx/entity
pnpm add @ngrx/effects

# Angular animation library
pnpm add angular-animations

# Testing and documentation libraries
pnpm add @nx/storybook
pnpm add -D @compodoc/compodoc

# Devs

# To run ts scripts we need ts file runner
pnpm add -D ts-node
