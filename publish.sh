#!/usr/bin/env bash
git tag latest
git push origin master --follow-tags
npm publish --registry=https://registry.npmjs.org/
