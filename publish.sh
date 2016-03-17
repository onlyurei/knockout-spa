#!/usr/bin/env bash
git tag -d latest
git push origin :refs/tags/latest
git tag latest
git push origin master --follow-tags
npm publish --registry=https://registry.npmjs.org/
