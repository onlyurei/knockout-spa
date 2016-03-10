#!/usr/bin/env bash
git push origin master --follow-tags
npm publish --registry=https://registry.npmjs.org/
