ts:
	cd src && \
	tsc -t ESNext index.ts
build:
	make ts && \
	cd src && \
	rollup index.js -o ../bundle.mjs -e net,fs,os,process,http,https -f es

test:
	make build && \
	cd src && \
	rollup test.mjs -o test.js -e net,fs,os,process,http,https,crypto -f umd