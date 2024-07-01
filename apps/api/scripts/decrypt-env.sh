#!/usr/bin/env bash
envFile="$1"
value=$(bun dotenvx get -f $envFile)

echo $value | jq -r 'to_entries[] | .key + "=" + (.value|tostring) + ""' >> $envFile.decrypted
